from rest_framework.permissions import BasePermission
from .models import Solicitud


class JefeAreaSolicitud(BasePermission):
	"""
	Jefe de área: acceso completo a solicitudes de su área.
	Administrador: solo lectura de solicitudes en estado "enviada".
	Otros: sin acceso.
	"""

	def has_permission(self, request, view):
		user = request.user
		if not user or not user.is_authenticated:
			return False

		cargo = getattr(user, 'cargo', None)

		# Jefe de área y administrador tienen acceso
		if cargo in ('jefe_area', 'administrador'):
			return True

		# Otros roles no tienen acceso
		return False

	def has_object_permission(self, request, view, obj):
		"""Verificar permisos a nivel de objeto."""
		user = request.user
		cargo = getattr(user, 'cargo', None)

		# Jefe de área: acceso a solicitudes de su área
		if cargo == 'jefe_area':
			return obj.area == user.area

		# Administrador: lectura de solicitudes "enviada"
		if cargo == 'administrador':
			if request.method in ('GET', 'HEAD', 'OPTIONS'):
				return obj.estado == Solicitud.ESTADO_ENVIADA
			# Para POST (crear distribucion) y otras acciones, permitir si está "enviada"
			return obj.estado == Solicitud.ESTADO_ENVIADA

		return False
