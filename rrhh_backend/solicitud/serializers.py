from rest_framework import serializers
from .models import Solicitud
from django.core.exceptions import ValidationError as DjangoValidationError


class SolicitudSerializer(serializers.ModelSerializer):
	class Meta:
		model = Solicitud
		fields = ['id', 'incentivo', 'area', 'cantidad', 'fecha_creada', 'estado']
		read_only_fields = ['fecha_creada', 'estado']

	def validate_cantidad(self, value):
		"""Validar que cantidad sea >= 0."""
		if value < 0:
			raise serializers.ValidationError('La cantidad no puede ser negativa.')
		return value

	def create(self, validated_data):
		"""Crear solicitud con estado pendiente por defecto."""
		try:
			solicitud = Solicitud(**validated_data)
			solicitud.full_clean()
			solicitud.save()
			return solicitud
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))

	def update(self, instance, validated_data):
		"""Actualizar solicitud (solo si está en estado pendiente)."""
		if not instance.puede_modificarse():
			raise serializers.ValidationError('No se puede modificar una solicitud que no está en estado pendiente.')

		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		try:
			instance.full_clean()
			instance.save()
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))
		return instance
