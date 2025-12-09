from rest_framework.permissions import BasePermission


class IsAdminOrReadOnlyRRHH(BasePermission):
	"""
	Permite acceso total a administradores.
	Especialistas RRHH pueden listar y buscar (lectura).
	Otros roles (empleados, jefes de área) no tienen acceso.
	"""

	def has_permission(self, request, view):
		user = request.user
		if not user or not user.is_authenticated:
			return False

		cargo = getattr(user, 'cargo', None)

		# Administrador tiene acceso total
		if cargo == 'administrador':
			return True

		# Especialista RRHH puede listar y buscar (GET, HEAD, OPTIONS)
		if cargo == 'especialista_rrhh':
			return request.method in ('GET', 'HEAD', 'OPTIONS')

		# Otros roles (empleado, jefe_area) no tienen acceso
		return False
