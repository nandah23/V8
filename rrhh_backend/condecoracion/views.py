from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Condecoracion, CondecoracionUsuario
from .serializers import CondecoracionSerializer, CondecoracionUsuarioSerializer
from .permissions import IsAdminCondecoracion
from usuario.models import Usuario
from datetime import date


class CondecoracionViewSet(viewsets.ModelViewSet):
	queryset = Condecoracion.objects.all().order_by('id')
	serializer_class = CondecoracionSerializer
	permission_classes = [IsAuthenticated, IsAdminCondecoracion]

	def get_queryset(self):
		"""Retornar todas las condecoraciones para admins y especialistas RRHH."""
		return Condecoracion.objects.all().order_by('id')

	@action(detail=False, methods=['post'])
	def asignar_automaticas(self, request):
		"""
		Asigna automáticamente condecoraciones a usuarios que cumplen con los años de experiencia.
		Solo administradores pueden ejecutar esta acción.
		"""
		if getattr(request.user, 'cargo', None) != 'administrador':
			return Response({'detail': 'Permiso denegado.'}, status=403)

		asignaciones_nuevas = 0
		condecoraciones = Condecoracion.objects.all()

		for condecoracion in condecoraciones:
			usuarios = Usuario.objects.all()
			for usuario in usuarios:
				# Calcular años de experiencia desde fecha_contratacion hasta hoy
				if usuario.fecha_contratacion:
					hoy = date.today()
					anos_trabajados = (hoy.year - usuario.fecha_contratacion.year) - \
						(1 if (hoy.month, hoy.day) < (usuario.fecha_contratacion.month, usuario.fecha_contratacion.day) else 0)

					# Si coinciden los años, asignar la condecoración
					if anos_trabajados == condecoracion.anos_experiencia:
						# Verificar que no esté ya asignada
						if not CondecoracionUsuario.objects.filter(
							usuario=usuario,
							condecoracion=condecoracion
						).exists():
							CondecoracionUsuario.objects.create(
								usuario=usuario,
								condecoracion=condecoracion
							)
							asignaciones_nuevas += 1

		return Response({
			'detail': f'Se asignaron {asignaciones_nuevas} condecoraciones automáticamente.'
		})

	@action(detail=True, methods=['get'])
	def usuarios_asignados(self, request, pk=None):
		"""Obtener lista de usuarios que tienen esta condecoración."""
		condecoracion = self.get_object()
		asignaciones = CondecoracionUsuario.objects.filter(condecoracion=condecoracion)
		serializer = CondecoracionUsuarioSerializer(asignaciones, many=True)
		return Response(serializer.data)

