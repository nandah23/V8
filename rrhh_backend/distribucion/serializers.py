from rest_framework import serializers
from .models import Distribucion
from django.core.exceptions import ValidationError as DjangoValidationError


class DistribucionSerializer(serializers.ModelSerializer):
	"""Serializer completo para administrador."""
	usuario_solicita_nombre = serializers.CharField(source='usuario_solicita.get_full_name', read_only=True)
	usuario_distribuye_nombre = serializers.CharField(source='usuario_distribuye.username', read_only=True)
	area_nombre = serializers.CharField(source='area.nombre', read_only=True)
	incentivo_nombre = serializers.CharField(source='incentivo.nombre', read_only=True)

	class Meta:
		model = Distribucion
		fields = ['id', 'area', 'area_nombre', 'incentivo', 'incentivo_nombre', 'cantidad', 'estado',
				  'usuario_solicita', 'usuario_solicita_nombre', 'usuario_distribuye', 'usuario_distribuye_nombre',
				  'fecha_creada']
		read_only_fields = ['usuario_solicita', 'usuario_distribuye', 'fecha_creada']

	def validate_cantidad(self, value):
		"""Validar que cantidad sea >= 0."""
		if value < 0:
			raise serializers.ValidationError('La cantidad no puede ser negativa.')
		return value

	def create(self, validated_data):
		"""Crear distribución ejecutando validaciones del modelo."""
		try:
			distribucion = Distribucion(**validated_data)
			distribucion.full_clean()
			distribucion.save()
			return distribucion
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))

	def update(self, instance, validated_data):
		"""Actualizar distribución ejecutando validaciones del modelo."""
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		try:
			instance.full_clean()
			instance.save()
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))
		return instance


class DistribucionJefeAreaSerializer(serializers.ModelSerializer):
	"""Serializer filtrado para jefe de área (solo incentivo y cantidad)."""
	incentivo_nombre = serializers.CharField(source='incentivo.nombre', read_only=True)

	class Meta:
		model = Distribucion
		fields = ['id', 'incentivo', 'incentivo_nombre', 'cantidad', 'fecha_creada']
		read_only_fields = ['fecha_creada']


class DistribucionEspecialistaRRHHSerializer(serializers.ModelSerializer):
	"""Serializer para especialista RRHH (solo lectura con campos básicos)."""
	usuario_solicita_nombre = serializers.CharField(source='usuario_solicita.get_full_name', read_only=True)
	area_nombre = serializers.CharField(source='area.nombre', read_only=True)
	incentivo_nombre = serializers.CharField(source='incentivo.nombre', read_only=True)

	class Meta:
		model = Distribucion
		fields = ['id', 'area', 'area_nombre', 'incentivo', 'incentivo_nombre', 'cantidad', 'estado',
				  'usuario_solicita_nombre', 'fecha_creada']
		read_only_fields = fields
