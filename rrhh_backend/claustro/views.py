from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from datetime import date
from decimal import Decimal
from django.db.models import Count, Q
from .models import Claustro
from .serializers import ClaustroSerializer
from .permissions import IsAdminClaustro
from usuario.models import Usuario


class ClaustroViewSet(viewsets.ModelViewSet):
	queryset = Claustro.objects.all().order_by('-fecha', 'categoria_docente')
	serializer_class = ClaustroSerializer
	permission_classes = [IsAuthenticated, IsAdminClaustro]

	def get_queryset(self):
		"""Retornar todos los registros de claustro para admin y especialista RRHH."""
		return Claustro.objects.all().order_by('-fecha', 'categoria_docente')

	def create(self, request, *args, **kwargs):
		"""Crear registro (solo administrador)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden crear registros de claustro.')

		return super().create(request, *args, **kwargs)

	def update(self, request, *args, **kwargs):
		"""Actualizar registro (solo administrador)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden modificar registros de claustro.')

		return super().update(request, *args, **kwargs)

	def destroy(self, request, *args, **kwargs):
		"""Eliminar registro (solo administrador)."""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden eliminar registros de claustro.')

		return super().destroy(request, *args, **kwargs)

	@action(detail=False, methods=['post'])
	def regenerar_desde_usuarios(self, request):
		"""
		Regenerar datos de claustro basándose en los usuarios actuales con proceso=docencia.
		Calcula cantidad y porcentaje de profesores activos (no jubilados) por categoría docente.
		Solo administradores pueden hacer esto.
		"""
		cargo = getattr(request.user, 'cargo', None)
		if cargo != 'administrador':
			raise PermissionDenied('Solo administradores pueden regenerar datos de claustro.')

		try:
			# Obtener profesores activos (no jubilados) con proceso=docencia
			profesores_activos = Usuario.objects.filter(
				proceso=Usuario.PROCESO_DOCENCIA,
				categoria_docente__isnull=False
			).exclude(
				# Excluir jubilados: mujeres >= 60, hombres >= 65
				Q(sexo=Usuario.SEXO_FEMENINO, edad__gte=60) |
				Q(sexo=Usuario.SEXO_MASCULINO, edad__gte=65)
			)

			# Contar total de profesores activos
			total_profesores = profesores_activos.count()

			if total_profesores == 0:
				return Response(
					{'detail': 'No hay profesores activos con proceso de docencia.'},
					status=status.HTTP_400_BAD_REQUEST
				)

			# Agrupar por categoría docente y contar
			categorias_data = profesores_activos.values('categoria_docente').annotate(
				cantidad=Count('id')
			)

			# Obtener fecha actual
			fecha_actual = date.today()

			# Crear/actualizar registros de claustro
			registros_creados = 0
			for cat_data in categorias_data:
				categoria = cat_data['categoria_docente']
				cantidad = cat_data['cantidad']
				
				# Calcular porciento usando Decimal
				porciento = Decimal(str(cantidad)) / Decimal(str(total_profesores))
				porciento = Decimal(str(round(float(porciento), 4)))

				claustro, created = Claustro.objects.update_or_create(
					categoria_docente=categoria,
					fecha=fecha_actual,
					defaults={'cantidad': cantidad, 'porciento': porciento}
				)

				if created:
					registros_creados += 1

			return Response(
				{
					'detail': f'Datos de claustro regenerados exitosamente. {registros_creados} nuevos registros creados.',
					'fecha': fecha_actual,
					'total_profesores_activos': total_profesores,
					'registros': ClaustroSerializer(
						Claustro.objects.filter(fecha=fecha_actual),
						many=True
					).data
				},
				status=status.HTTP_200_OK
			)
		except Exception as e:
			return Response(
				{'detail': f'Error al regenerar datos de claustro: {str(e)}'},
				status=status.HTTP_400_BAD_REQUEST
			)
