from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError as DRFValidationError
from .models import Distribucion
from .serializers import (
	DistribucionSerializer,
	DistribucionJefeAreaSerializer,
	DistribucionEspecialistaRRHHSerializer
)
from .permissions import IsAdminDistribucion
from solicitud.models import Solicitud


class DistribucionViewSet(viewsets.ModelViewSet):
	queryset = Distribucion.objects.all().order_by('-fecha_creada')
	permission_classes = [IsAuthenticated, IsAdminDistribucion]

	def get_serializer_class(self):
		"""Retornar serializer dinámico según el cargo del usuario."""
		cargo = getattr(self.request.user, 'cargo', None)

		if cargo == 'administrador':
			return DistribucionSerializer
		elif cargo == 'jefe_area':
			return DistribucionJefeAreaSerializer
		elif cargo == 'especialista_rrhh':
			return DistribucionEspecialistaRRHHSerializer
		else:
			return DistribucionSerializer

	def get_queryset(self):
		"""Filtrar distribuciones según cargo del usuario."""
		cargo = getattr(self.request.user, 'cargo', None)

		# Administrador: ve todas las distribuciones
		if cargo == 'administrador':
			return Distribucion.objects.all().order_by('-fecha_creada')

		# Jefe de área: ve distribuciones de su área
		if cargo == 'jefe_area':
			return Distribucion.objects.filter(area=self.request.user.area).order_by('-fecha_creada')

		# Especialista RRHH: ve todas las distribuciones
		if cargo == 'especialista_rrhh':
			return Distribucion.objects.all().order_by('-fecha_creada')

		# Otros no tienen acceso
		return Distribucion.objects.none()

	def create(self, request, *args, **kwargs):
		"""Crear distribución (solo administrador)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden crear distribuciones.')

		return super().create(request, *args, **kwargs)

	def update(self, request, *args, **kwargs):
		"""Actualizar distribución (solo administrador puede cambiar estado)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden modificar distribuciones.')

		return super().update(request, *args, **kwargs)

	def destroy(self, request, *args, **kwargs):
		"""Eliminar distribución (solo administrador)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden eliminar distribuciones.')

		return super().destroy(request, *args, **kwargs)

	@action(detail=True, methods=['post'])
	def crear_desde_solicitud(self, request, pk=None):
		"""
		Crear distribución automáticamente desde una solicitud aceptada.
		Solo administradores pueden hacer esto.
		"""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden crear distribuciones desde solicitudes.')

		try:
			solicitud = Solicitud.objects.get(pk=pk)
		except Solicitud.DoesNotExist:
			return Response(
				{'detail': 'Solicitud no encontrada.'},
				status=status.HTTP_404_NOT_FOUND
			)

		# Verificar que la solicitud esté en estado "enviada"
		if solicitud.estado != Solicitud.ESTADO_ENVIADA:
			return Response(
				{'detail': 'Solo se pueden crear distribuciones desde solicitudes en estado "enviada".'},
				status=status.HTTP_400_BAD_REQUEST
			)

		# Verificar que hay suficiente cantidad disponible del incentivo
		if solicitud.cantidad > solicitud.incentivo.cantidad:
			return Response(
				{'detail': 'Existe una cantidad insuficiente de este incentivo para abastecer la solicitud.'},
				status=status.HTTP_400_BAD_REQUEST
			)

		# Crear distribución
		try:
			distribucion = Distribucion.objects.create(
				area=solicitud.area,
				incentivo=solicitud.incentivo,
				cantidad=solicitud.cantidad,
				usuario_solicita=solicitud.usuario if hasattr(solicitud, 'usuario') else None,
				usuario_distribuye=request.user,
				estado=Distribucion.ESTADO_PENDIENTE
			)

			# Restar la cantidad del incentivo disponible
			solicitud.incentivo.cantidad -= solicitud.cantidad
			solicitud.incentivo.save()

			# Cambiar estado de solicitud a "aceptada"
			solicitud.estado = Solicitud.ESTADO_ACEPTADA
			solicitud.save()

			return Response(
				{
					'detail': 'Distribución creada exitosamente desde la solicitud.',
					'distribucion': DistribucionSerializer(distribucion).data
				},
				status=status.HTTP_201_CREATED
			)
		except Exception as e:
			return Response(
				{'detail': f'Error al crear la distribución: {str(e)}'},
				status=status.HTTP_400_BAD_REQUEST
			)
