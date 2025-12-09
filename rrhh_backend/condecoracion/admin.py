from django.contrib import admin
from .models import Condecoracion, CondecoracionUsuario


@admin.register(Condecoracion)
class CondecoracionAdmin(admin.ModelAdmin):
	list_display = ('id', 'nombre', 'anos_experiencia')
	search_fields = ('nombre',)


@admin.register(CondecoracionUsuario)
class CondecoracionUsuarioAdmin(admin.ModelAdmin):
	list_display = ('usuario', 'condecoracion', 'fecha_asignacion')
	search_fields = ('usuario__username', 'condecoracion__nombre')
	readonly_fields = ('fecha_asignacion',)

