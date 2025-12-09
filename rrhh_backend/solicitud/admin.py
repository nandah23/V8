from django.contrib import admin
from .models import Solicitud


@admin.register(Solicitud)
class SolicitudAdmin(admin.ModelAdmin):
	list_display = ('id', 'incentivo', 'area', 'cantidad', 'estado', 'fecha_creada')
	list_filter = ('estado', 'area')

