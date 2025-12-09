"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from usuario.views import UsuarioViewSet
from usuario.views import RegisterView, LogoutView, CurrentUserView, CustomTokenObtainPairView
from area.views import AreaViewSet
from claustro.views import ClaustroViewSet
from incentivo.views import IncentivoViewSet
from condecoracion.views import CondecoracionViewSet
from distribucion.views import DistribucionViewSet
from solicitud.views import SolicitudViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'areas', AreaViewSet)
router.register(r'claustro', ClaustroViewSet)
router.register(r'incentivos', IncentivoViewSet)
router.register(r'condecoraciones', CondecoracionViewSet)
router.register(r'distribuciones', DistribucionViewSet)
router.register(r'solicitudes', SolicitudViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # Auth / JWT endpoints
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('api/auth/me/', CurrentUserView.as_view(), name='auth_me'),
]
