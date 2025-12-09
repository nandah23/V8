from django.contrib import admin
from .models import Area


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
	list_display = ('id', 'nombre', 'cantidad_trabajadores')
	search_fields = ('nombre',)

