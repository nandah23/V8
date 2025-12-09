from rest_framework.permissions import BasePermission


class IsAdminClaustro(BasePermission):
	"""
	Administrador: acceso total (CRUD) y puede regenerar datos desde usuarios.
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

		# Especialista RRHH puede listar y buscar (lectura)
		if cargo == 'especialista_rrhh':
			return request.method in ('GET', 'HEAD', 'OPTIONS')

		# Otros roles no tienen acceso
		return False
