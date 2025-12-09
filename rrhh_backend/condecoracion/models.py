from django.db import models
from django.core.exceptions import ValidationError
from datetime import date


class Condecoracion(models.Model):
	nombre = models.CharField(max_length=200, unique=True)
	descripcion = models.TextField(blank=True)
	anos_experiencia = models.IntegerField()

	def clean(self):
		"""Validaciones a nivel de modelo."""
		if self.anos_experiencia < 0:
			raise ValidationError({'anos_experiencia': 'Los años de experiencia no pueden ser negativos.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def __str__(self):
		return self.nombre


class CondecoracionUsuario(models.Model):
	"""Registro de asignaciones de condecoraciones a usuarios."""
	usuario = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE, related_name='condecoraciones')
	condecoracion = models.ForeignKey(Condecoracion, on_delete=models.CASCADE, related_name='usuarios')
	fecha_asignacion = models.DateField(auto_now_add=True)

	class Meta:
		unique_together = ('usuario', 'condecoracion')

	def __str__(self):
		return f"{self.usuario.username} - {self.condecoracion.nombre}"
