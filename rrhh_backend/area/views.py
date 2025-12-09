from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Area
from .serializers import AreaSerializer
from .permissions import IsAdminOrReadOnlyRRHH
from usuario.models import Usuario
from core.exceptions import DependencyError


class AreaViewSet(viewsets.ModelViewSet):
	queryset = Area.objects.all().order_by('id')
	serializer_class = AreaSerializer
	permission_classes = [IsAuthenticated, IsAdminOrReadOnlyRRHH]

	def get_queryset(self):
		"""Retornar todas las áreas para admins y especialistas RRHH."""
		# La permission IsAdminOrReadOnlyRRHH ya asegura que solo admins y especialistas RRHH lleguen aquí
		return Area.objects.all().order_by('id')

	def destroy(self, request, *args, **kwargs):
		# La permission IsAdminOrReadOnlyRRHH asegura que solo administradores pueden hacer DELETE
		area = self.get_object()
		# Verificar si hay usuarios asignados
		if Usuario.objects.filter(area=area).exists():
			raise DependencyError(
				detail="No se puede eliminar el área: hay usuarios asignados. "
				"Reasigne o elimine los usuarios primero."
			)
		return super().destroy(request, *args, **kwargs)
