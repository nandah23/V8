from django.contrib import admin
from .models import Distribucion


@admin.register(Distribucion)
class DistribucionAdmin(admin.ModelAdmin):
	list_display = ('id', 'incentivo', 'area', 'cantidad', 'usuario_solicita', 'usuario_distribuye', 'fecha_creada')
	list_filter = ('area', 'incentivo')

