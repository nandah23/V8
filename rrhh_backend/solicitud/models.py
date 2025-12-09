from django.db import models
from django.core.exceptions import ValidationError


class Solicitud(models.Model):
	ESTADO_PENDIENTE = 'pendiente'
	ESTADO_ENVIADA = 'enviada'
	ESTADO_CANCELADA = 'cancelada'
	ESTADO_ACEPTADA = 'aceptada'

	ESTADO_CHOICES = [
		(ESTADO_PENDIENTE, 'Pendiente'),
		(ESTADO_ENVIADA, 'Enviada'),
		(ESTADO_CANCELADA, 'Cancelada'),
		(ESTADO_ACEPTADA, 'Aceptada'),
	]

	incentivo = models.ForeignKey('incentivo.Incentivo', on_delete=models.CASCADE, related_name='solicitudes')
	area = models.ForeignKey('area.Area', on_delete=models.CASCADE, related_name='solicitudes')
	cantidad = models.IntegerField()
	fecha_creada = models.DateTimeField(auto_now_add=True)
	estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default=ESTADO_PENDIENTE)

	def clean(self):
		"""Validaciones a nivel de modelo."""
		if self.cantidad < 0:
			raise ValidationError({'cantidad': 'La cantidad no puede ser negativa.'})

	def save(self, *args, **kwargs):
		"""Ejecutar validaciones antes de guardar."""
		self.full_clean()
		super().save(*args, **kwargs)

	def puede_modificarse(self):
		"""Retorna True si la solicitud puede modificarse (estado pendiente)."""
		return self.estado == self.ESTADO_PENDIENTE

	def puede_eliminarse(self):
		"""Retorna True si la solicitud puede eliminarse (estado pendiente)."""
		return self.estado == self.ESTADO_PENDIENTE

	def puede_enviarse(self):
		"""Retorna True si la solicitud puede enviarse (estado pendiente)."""
		return self.estado == self.ESTADO_PENDIENTE

	def puede_cancelarse(self):
		"""Retorna True si la solicitud puede cancelarse (estado enviada)."""
		return self.estado == self.ESTADO_ENVIADA

	def __str__(self):
		return f"Solicitud {self.id} - {self.incentivo} ({self.estado})"
