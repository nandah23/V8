from rest_framework.permissions import BasePermission


class IsSystemRole(BasePermission):
    """Permite acceso solo a usuarios con cargo administrador, jefe de área o especialista RRHH."""
    allowed = {
        'administrador',
        'jefe_area',
        'especialista_rrhh',
    }

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and getattr(user, 'cargo', None) in self.allowed)


class IsAdminOnly(BasePermission):
    """Permite solo a administradores."""

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and getattr(user, 'cargo', None) == 'administrador')
