from rest_framework.permissions import BasePermission


class IsAdminDistribucion(BasePermission):
	"""
	Administrador: acceso total (CRUD).
	Jefe de área: solo lectura.
	Especialista RRHH: solo lectura.
	Otros: sin acceso.
	"""

	def has_permission(self, request, view):
		user = request.user
		if not user or not user.is_authenticated:
			return False

		cargo = getattr(user, 'cargo', None)

		# Administrador tiene acceso total
		if cargo == 'administrador':
			return True

		# Jefe de área y especialista RRHH pueden listar y buscar (lectura)
		if cargo in ('jefe_area', 'especialista_rrhh'):
			return request.method in ('GET', 'HEAD', 'OPTIONS')

		# Otros roles (empleado) no tienen acceso
		return False
