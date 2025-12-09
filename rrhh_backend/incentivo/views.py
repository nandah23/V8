from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Incentivo
from .serializers import IncentivoSerializer
from .permissions import IsAdminOrReadOnlyIncentivo
from distribucion.models import Distribucion
from solicitud.models import Solicitud
from core.exceptions import DependencyError


class IncentivoViewSet(viewsets.ModelViewSet):
	queryset = Incentivo.objects.all().order_by('id')
	serializer_class = IncentivoSerializer
	permission_classes = [IsAuthenticated, IsAdminOrReadOnlyIncentivo]

	def get_queryset(self):
		"""Retornar todos los incentivos para admins, especialistas RRHH y jefes de área."""
		return Incentivo.objects.all().order_by('id')

	def destroy(self, request, *args, **kwargs):
		# Solo administradores pueden eliminar (la permission ya lo asegura)
		incentivo = self.get_object()
		# Verificar si hay distribuciones o solicitudes que usan este incentivo
		if Distribucion.objects.filter(incentivo=incentivo).exists():
			raise DependencyError(
				detail="No se puede eliminar el incentivo: hay distribuciones que lo utilizan. "
				"Elimine las distribuciones primero."
			)
		if Solicitud.objects.filter(incentivo=incentivo).exists():
			raise DependencyError(
				detail="No se puede eliminar el incentivo: hay solicitudes que lo utilizan. "
				"Elimine las solicitudes primero."
			)
		return super().destroy(request, *args, **kwargs)
