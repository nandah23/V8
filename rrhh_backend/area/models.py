from django.db import models
from django.core.exceptions import ValidationError


class Area(models.Model):
	nombre = models.CharField(max_length=200, unique=True)
	cantidad_trabajadores = models.IntegerField(default=0)

	def clean(self):
		"""Validaciones a nivel de modelo."""
		if self.cantidad_trabajadores < 0:
			raise ValidationError({'cantidad_trabajadores': 'Dato inválido.'})
		# Validar unicidad del nombre (excepto si es la misma instancia siendo actualizada)
		if Area.objects.filter(nombre=self.nombre).exclude(pk=self.pk).exists():
			raise ValidationError({'nombre': 'Dato inválido.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def __str__(self):
		return self.nombre
