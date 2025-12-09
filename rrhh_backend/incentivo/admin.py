from django.contrib import admin
from .models import Incentivo


@admin.register(Incentivo)
class IncentivoAdmin(admin.ModelAdmin):
	list_display = ('id', 'nombre', 'cantidad', 'precio')
	search_fields = ('nombre',)

