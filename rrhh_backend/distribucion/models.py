from django.db import models
from django.core.exceptions import ValidationError


class Distribucion(models.Model):
	ESTADO_PENDIENTE = 'pendiente'
	ESTADO_ENTREGADA = 'entregada'

	ESTADO_CHOICES = [
		(ESTADO_PENDIENTE, 'Pendiente'),
		(ESTADO_ENTREGADA, 'Entregada'),
	]

	area = models.ForeignKey('area.Area', on_delete=models.CASCADE, related_name='distribuciones')
	incentivo = models.ForeignKey('incentivo.Incentivo', on_delete=models.CASCADE, related_name='distribuciones')
	cantidad = models.IntegerField()
	estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default=ESTADO_PENDIENTE)
	usuario_solicita = models.ForeignKey('usuario.Usuario', on_delete=models.SET_NULL, null=True, blank=True, related_name='solicitudes_realizadas')
	usuario_distribuye = models.ForeignKey('usuario.Usuario', on_delete=models.SET_NULL, null=True, blank=True, related_name='distribuciones_realizadas')
	fecha_creada = models.DateTimeField(auto_now_add=True)

	def clean(self):
		"""Validaciones a nivel de modelo."""
		if self.cantidad < 0:
			raise ValidationError({'cantidad': 'La cantidad no puede ser negativa.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def __str__(self):
		return f"Distribución {self.id} - {self.incentivo} -> {self.area} ({self.estado})"
