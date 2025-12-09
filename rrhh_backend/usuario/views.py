from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

from .models import Usuario
from .serializers import UsuarioSerializer
from .permissions import IsSystemRole, IsAdminOnly
from distribucion.models import Distribucion
from solicitud.models import Solicitud
from core.exceptions import DependencyError


class UsuarioViewSet(viewsets.ModelViewSet):
    """CRUD de usuarios. Acceso limitado según el rol del usuario."""
    queryset = Usuario.objects.all().order_by('id')
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsSystemRole]

    def get_queryset(self):
        """Filtrar usuarios según el rol del usuario autenticado."""
        user = self.request.user
        if getattr(user, 'cargo', None) == Usuario.CARGO_ADMIN:
            return Usuario.objects.all().order_by('id')
        elif getattr(user, 'cargo', None) == Usuario.CARGO_JEFE_AREA:
            return Usuario.objects.filter(area=user.area).order_by('id')
        elif getattr(user, 'cargo', None) == Usuario.CARGO_ESPECIALISTA_RRHH:
            return Usuario.objects.all().order_by('id')
        else:
            # Los demás no deberían tener acceso al sistema (la permission IsSystemRole evita esto),
            # pero como defensa adicional devolvemos queryset vacío.
            return Usuario.objects.none()

    def destroy(self, request, *args, **kwargs):
        # Solo administradores pueden eliminar usuarios
        if getattr(request.user, 'cargo', None) != Usuario.CARGO_ADMIN:
            raise PermissionDenied(detail='Permiso denegado: solo administradores pueden eliminar usuarios.')

        usuario = self.get_object()

        # Verificar si el usuario tiene solicitudes o distribuciones asociadas
        if Distribucion.objects.filter(usuario_solicita=usuario).exists():
            raise DependencyError(
                detail="No se puede eliminar el usuario: tiene distribuciones donde aparece como solicitante. "
                "Elimine las distribuciones primero."
            )
        if Distribucion.objects.filter(usuario_distribuye=usuario).exists():
            raise DependencyError(
                detail="No se puede eliminar el usuario: tiene distribuciones donde aparece como distribuidor. "
                "Elimine las distribuciones primero."
            )
        if Solicitud.objects.filter(usuario=usuario).exists():
            raise DependencyError(
                detail="No se puede eliminar el usuario: tiene solicitudes asociadas. "
                "Elimine las solicitudes primero."
            )
        return super().destroy(request, *args, **kwargs)


class RegisterView(APIView):
    """Registro de nuevos usuarios (public)."""
    # Solo administradores pueden crear usuarios en el sistema
    permission_classes = [IsAuthenticated, IsAdminOnly]

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UsuarioSerializer(user, context={'request': request}).data
        return Response(data, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    """Cerrar sesión: blacklist del refresh token."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'detail': 'Refresh token required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({'detail': 'Token inválido o ya procesado.'}, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated, IsSystemRole]

    def get(self, request):
        serializer = UsuarioSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class CustomTokenObtainPairView(TokenObtainPairView):
    """Emite tokens solo si el usuario tiene un cargo permitido (admin, jefe_area, especialista_rrhh)."""
    serializer_class = CustomTokenObtainPairSerializer
