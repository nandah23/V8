from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(DjangoUserAdmin):
    model = Usuario
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Datos RRHH', {'fields': ('carga', 'proceso', 'area', 'cargo', 'fecha_contratacion', 'correo', 'sexo', 'edad', 'categoria_docente')}),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'cargo', 'proceso', 'sexo', 'edad', 'area')
    list_filter = ('cargo', 'proceso', 'sexo', 'is_staff')

