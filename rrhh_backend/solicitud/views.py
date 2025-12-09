from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError as DRFValidationError
from .models import Solicitud
from .serializers import SolicitudSerializer
from .permissions import JefeAreaSolicitud


class SolicitudViewSet(viewsets.ModelViewSet):
	queryset = Solicitud.objects.all().order_by('-fecha_creada')
	serializer_class = SolicitudSerializer
	permission_classes = [IsAuthenticated, JefeAreaSolicitud]

	def get_queryset(self):
		"""Filtrar solicitudes según cargo del usuario."""
		user = self.request.user
		cargo = getattr(user, 'cargo', None)

		# Jefe de área: ve todas las solicitudes de su área
		if cargo == 'jefe_area':
			return Solicitud.objects.filter(area=user.area).order_by('-fecha_creada')

		# Administrador: ve solo solicitudes en estado "enviada"
		if cargo == 'administrador':
			return Solicitud.objects.filter(estado=Solicitud.ESTADO_ENVIADA).order_by('-fecha_creada')

		# Otros no tienen acceso
		return Solicitud.objects.none()

	def create(self, request, *args, **kwargs):
		"""Crear solicitud (solo jefe de área)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'jefe_area':
			raise PermissionDenied('Solo jefes de área pueden crear solicitudes.')

		return super().create(request, *args, **kwargs)

	def update(self, request, *args, **kwargs):
		"""Actualizar solicitud (solo si está pendiente y el usuario es jefe de área)."""
		solicitud = self.get_object()
		cargo = getattr(request.user, 'cargo', None)

		if cargo != 'jefe_area':
			raise PermissionDenied('Solo jefes de área pueden modificar solicitudes.')

		if not solicitud.puede_modificarse():
			raise PermissionDenied('No se puede modificar una solicitud que no está en estado pendiente.')

		return super().update(request, *args, **kwargs)

	def destroy(self, request, *args, **kwargs):
		"""Eliminar solicitud (solo si está pendiente y el usuario es jefe de área)."""
		solicitud = self.get_object()
		cargo = getattr(request.user, 'cargo', None)

		if cargo != 'jefe_area':
			raise PermissionDenied('Solo jefes de área pueden eliminar solicitudes.')

		if not solicitud.puede_eliminarse():
			raise PermissionDenied('No se puede eliminar una solicitud que no está en estado pendiente.')

		return super().destroy(request, *args, **kwargs)

	@action(detail=True, methods=['post'])
	def enviar(self, request, pk=None):
		"""Enviar solicitud (cambiar estado de pendiente a enviada)."""
		solicitud = self.get_object()
		cargo = getattr(request.user, 'cargo', None)

		if cargo != 'jefe_area':
			raise PermissionDenied('Solo jefes de área pueden enviar solicitudes.')

		if not solicitud.puede_enviarse():
			raise PermissionDenied('Solo se pueden enviar solicitudes en estado pendiente.')

		# Validar que hay suficiente cantidad de incentivo disponible
		if solicitud.cantidad > solicitud.incentivo.cantidad:
			raise DRFValidationError('Existe una cantidad insuficiente de este incentivo para abastecer su solicitud.')

		solicitud.estado = Solicitud.ESTADO_ENVIADA
		solicitud.save()

		return Response({
			'detail': 'Solicitud enviada exitosamente.',
			'solicitud': SolicitudSerializer(solicitud).data
		}, status=status.HTTP_200_OK)

	@action(detail=True, methods=['post'])
	def cancelar(self, request, pk=None):
		"""Cancelar solicitud (cambiar estado de enviada a cancelada)."""
		solicitud = self.get_object()
		cargo = getattr(request.user, 'cargo', None)

		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden cancelar solicitudes.')

		if not solicitud.puede_cancelarse():
			raise PermissionDenied('Solo se pueden cancelar solicitudes en estado enviada.')

		solicitud.estado = Solicitud.ESTADO_CANCELADA
		solicitud.save()

		return Response({
			'detail': 'Solicitud cancelada exitosamente.',
			'solicitud': SolicitudSerializer(solicitud).data
		}, status=status.HTTP_200_OK)
