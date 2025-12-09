from django.contrib import admin
from .models import Claustro


@admin.register(Claustro)
class ClaustroAdmin(admin.ModelAdmin):
    list_display = ('id', 'categoria_docente', 'fecha', 'cantidad', 'porciento')
    list_filter = ('categoria_docente',)
    ordering = ('-fecha',)

