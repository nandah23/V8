from rest_framework import serializers
from .models import Condecoracion, CondecoracionUsuario
from django.core.exceptions import ValidationError as DjangoValidationError


class CondecoracionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Condecoracion
		fields = ['id', 'nombre', 'descripcion', 'anos_experiencia']

	def validate_anos_experiencia(self, value):
		"""Validar que anos_experiencia sea >= 0."""
		if value < 0:
			raise serializers.ValidationError('Los años de experiencia no pueden ser negativos.')
		return value

	def validate_nombre(self, value):
		"""Validar que el nombre sea único."""
		queryset = Condecoracion.objects.filter(nombre=value)
		if self.instance:
			queryset = queryset.exclude(pk=self.instance.pk)
		if queryset.exists():
			raise serializers.ValidationError('Ya existe una condecoración con este nombre.')
		return value

	def create(self, validated_data):
		"""Crear condecoración ejecutando validaciones del modelo."""
		try:
			condecoracion = Condecoracion(**validated_data)
			condecoracion.full_clean()
			condecoracion.save()
			return condecoracion
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))

	def update(self, instance, validated_data):
		"""Actualizar condecoración ejecutando validaciones del modelo."""
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		try:
			instance.full_clean()
			instance.save()
		except DjangoValidationError as e:
			raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))
		return instance


class CondecoracionUsuarioSerializer(serializers.ModelSerializer):
	condecoracion_nombre = serializers.CharField(source='condecoracion.nombre', read_only=True)
	usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)

	class Meta:
		model = CondecoracionUsuario
		fields = ['id', 'usuario', 'usuario_nombre', 'condecoracion', 'condecoracion_nombre', 'fecha_asignacion']
		read_only_fields = ['fecha_asignacion']
