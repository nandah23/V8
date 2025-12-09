from rest_framework import serializers
from .models import Incentivo
from django.core.exceptions import ValidationError as DjangoValidationError


class IncentivoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Incentivo
		fields = ['id', 'nombre', 'descripcion', 'cantidad', 'precio']

	def validate_cantidad(self, value):
		"""Validar que cantidad sea >= 0."""
		if value < 0:
			raise serializers.ValidationError('La cantidad no puede ser negativa.')
		return value

	def validate_precio(self, value):
		"""Validar que precio sea >= 0."""
		if value < 0:
			raise serializers.ValidationError('El precio no puede ser negativo.')
		return value

	def validate_nombre(self, value):
		"""Validar que el nombre sea único."""
		queryset = Incentivo.objects.filter(nombre=value)
		if self.instance:
			queryset = queryset.exclude(pk=self.instance.pk)
		if queryset.exists():
			raise serializers.ValidationError('Ya existe un incentivo con este nombre.')
		return value

	def create(self, validated_data):
		"""Crear incentivo ejecutando validaciones del modelo."""
		try:
			incentivo = Incentivo(**validated_data)
			incentivo.full_clean()
			incentivo.save()
			return incentivo
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))

	def update(self, instance, validated_data):
		"""Actualizar incentivo ejecutando validaciones del modelo."""
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		try:
			instance.full_clean()
			instance.save()
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))
		return instance
