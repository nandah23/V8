from django.db import models
from django.core.exceptions import ValidationError


class Claustro(models.Model):
	"""
	Registro histórico (serie temporal) de profesores por categoría docente.
	Cada fila representa la cantidad de profesores activos (no jubilados) que tenían 
	una categoría_docente específica en una fecha determinada.
	"""

	CATEGORIA_TITULAR = 'titular'
	CATEGORIA_AUXILIAR = 'auxiliar'
	CATEGORIA_ASISTENTE = 'asistente'
	CATEGORIA_INSTRUCTOR = 'instructor'

	CATEGORIA_CHOICES = [
		(CATEGORIA_TITULAR, 'Profesor Titular'),
		(CATEGORIA_AUXILIAR, 'Profesor Auxiliar'),
		(CATEGORIA_ASISTENTE, 'Profesor Asistente'),
		(CATEGORIA_INSTRUCTOR, 'Profesor Instructor'),
	]

	categoria_docente = models.CharField(max_length=20, choices=CATEGORIA_CHOICES, null=True, blank=True)
	fecha = models.DateField()
	cantidad = models.IntegerField()
	porciento = models.DecimalField(max_digits=6, decimal_places=4)  # En decimal (0.1500 = 15%)

	class Meta:
		unique_together = ('categoria_docente', 'fecha')
		ordering = ['-fecha', 'categoria_docente']

	def clean(self):
		"""Validaciones a nivel de modelo."""
		if self.cantidad < 0:
			raise ValidationError({'cantidad': 'La cantidad no puede ser negativa.'})
		if self.porciento < 0 or self.porciento > 1:
			raise ValidationError({'porciento': 'El porcentaje debe estar entre 0 y 1.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def __str__(self):
		return f"{self.get_categoria_docente_display()} - {self.fecha} ({self.cantidad} profesores, {self.porciento:.2%})"
