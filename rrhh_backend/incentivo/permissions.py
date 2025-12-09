from rest_framework.permissions import BasePermission


class IsAdminOrReadOnlyIncentivo(BasePermission):
	"""
	Permite acceso total a administradores.
	Especialistas RRHH y jefes de área pueden listar y buscar (lectura).
	Empleados no tienen acceso.
	"""

	def has_permission(self, request, view):
		user = request.user
		if not user or not user.is_authenticated:
			return False

		cargo = getattr(user, 'cargo', None)

		# Administrador tiene acceso total
		if cargo == 'administrador':
			return True

		# Especialista RRHH y jefe de área pueden listar y buscar (GET, HEAD, OPTIONS)
		if cargo in ('especialista_rrhh', 'jefe_area'):
			return request.method in ('GET', 'HEAD', 'OPTIONS')

		# Empleados no tienen acceso
		return False
