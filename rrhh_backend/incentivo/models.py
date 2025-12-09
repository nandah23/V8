from django.db import models
from django.core.exceptions import ValidationError


class Incentivo(models.Model):
	nombre = models.CharField(max_length=200, unique=True)
	descripcion = models.TextField(blank=True)
	cantidad = models.IntegerField(default=0)
	precio = models.DecimalField(max_digits=12, decimal_places=2)

	def clean(self):
		"""Validaciones a nivel de modelo."""
		if self.cantidad < 0:
			raise ValidationError({'cantidad': 'La cantidad no puede ser negativa.'})
		if self.precio < 0:
			raise ValidationError({'precio': 'El precio no puede ser negativo.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def __str__(self):
		return self.nombre
