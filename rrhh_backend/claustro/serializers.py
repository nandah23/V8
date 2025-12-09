from rest_framework import serializers
from .models import Claustro
from django.core.exceptions import ValidationError as DjangoValidationError


class ClaustroSerializer(serializers.ModelSerializer):
	class Meta:
		model = Claustro
		fields = ['id', 'categoria_docente', 'fecha', 'cantidad', 'porciento']

	def validate_cantidad(self, value):
		"""Validar que cantidad sea >= 0."""
		if value < 0:
			raise serializers.ValidationError('La cantidad no puede ser negativa.')
		return value

	def validate_porciento(self, value):
		"""Validar que porciento esté entre 0 y 1."""
		if value < 0 or value > 1:
			raise serializers.ValidationError('El porcentaje debe estar entre 0 y 1.')
		return value

	def create(self, validated_data):
		"""Crear registro de claustro ejecutando validaciones del modelo."""
		try:
			claustro = Claustro(**validated_data)
			claustro.full_clean()
			claustro.save()
			return claustro
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))

	def update(self, instance, validated_data):
		"""Actualizar registro de claustro ejecutando validaciones del modelo."""
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		try:
			instance.full_clean()
			instance.save()
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))
		return instance
