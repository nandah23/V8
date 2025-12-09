from rest_framework import serializers
from .models import Area
from django.core.exceptions import ValidationError as DjangoValidationError


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'nombre', 'cantidad_trabajadores']

    def validate_cantidad_trabajadores(self, value):
        """Validar que cantidad_trabajadores sea >= 0."""
        if value < 0:
            raise serializers.ValidationError('Dato inválido.')
        return value

    def validate_nombre(self, value):
        """Validar que el nombre sea único."""
        # Si es una actualización (self.instance existe), excluir la instancia actual
        queryset = Area.objects.filter(nombre=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError('Dato inválido.')
        return value

    def create(self, validated_data):
        """Crear área ejecutando validaciones del modelo."""
        try:
            area = Area(**validated_data)
            area.full_clean()
            area.save()
            return area
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))

    def update(self, instance, validated_data):
        """Actualizar área ejecutando validaciones del modelo."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        try:
            instance.full_clean()
            instance.save()
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.message_dict if hasattr(e, 'message_dict') else str(e))
        return instance
