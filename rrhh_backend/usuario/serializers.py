from rest_framework import serializers
from .models import Usuario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Extiende el serializer por defecto para permitir login solo a usuarios con cargos permitidos."""
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        allowed = {Usuario.CARGO_ADMIN, Usuario.CARGO_JEFE_AREA, Usuario.CARGO_ESPECIALISTA_RRHH}
        if getattr(user, 'cargo', None) not in allowed:
            raise serializers.ValidationError('Acceso denegado: usuario no tiene un cargo permitido para acceder al sistema.')
        return data


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'password', 'first_name', 'last_name', 'correo', 'proceso',
            'area', 'cargo', 'fecha_contratacion', 'sexo', 'edad', 'categoria_docente'
        ]

    def validate(self, data):
        """Validar que categoria_docente solo se use con proceso=docencia."""
        proceso = data.get('proceso')
        categoria_docente = data.get('categoria_docente')

        if categoria_docente and proceso != Usuario.PROCESO_DOCENCIA:
            raise serializers.ValidationError({'categoria_docente': 'La categoría docente solo es válida para usuarios con proceso de Docencia.'})

        if proceso == Usuario.PROCESO_DOCENCIA and not categoria_docente:
            raise serializers.ValidationError({'categoria_docente': 'La categoría docente es requerida para usuarios con proceso de Docencia.'})

        return data

    def create(self, validated_data):
        request = self.context.get('request')
        # Solo administradores pueden asignar cargo al crear
        if 'cargo' in validated_data:
            if not request or not hasattr(request, 'user') or getattr(request.user, 'cargo', None) != Usuario.CARGO_ADMIN:
                raise serializers.ValidationError({'cargo': 'Solo administradores pueden asignar el cargo.'})

        password = validated_data.pop('password', None)
        user = Usuario(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        request = self.context.get('request')
        # Evitar que no-admins cambien el cargo
        if 'cargo' in validated_data:
            if not request or not hasattr(request, 'user') or getattr(request.user, 'cargo', None) != Usuario.CARGO_ADMIN:
                raise serializers.ValidationError({'cargo': 'Solo administradores pueden modificar el cargo.'})

        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
