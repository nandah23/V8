#!/usr/bin/env python
"""
Script para crear datos de prueba en PostgreSQL.
Crea usuarios con diferentes cargos y áreas para testing.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from usuario.models import Usuario
from area.models import Area
from django.db import IntegrityError

print("=" * 70)
print("CREACIÓN DE DATOS DE PRUEBA EN PostgreSQL")
print("=" * 70)

# Limpiar datos anteriores
print("\n1. Limpiando datos anteriores...")
Usuario.objects.filter(username__startswith='test_').delete()
Area.objects.all().delete()
print("   ✓ Datos anteriores eliminados")

# Crear áreas
print("\n2. Creando áreas...")
areas_data = [
    'Recursos Humanos',
    'Finanzas',
    'Operaciones',
    'IT',
    'Administración',
]

areas = {}
for area_name in areas_data:
    area, created = Area.objects.get_or_create(nombre=area_name)
    areas[area_name] = area
    status = "✓ Creada" if created else "→ Existe"
    print(f"   {status}: {area_name}")

# Crear usuarios de prueba
print("\n3. Creando usuarios de prueba...")

usuarios_data = [
    # Administrador
    {
        'username': 'test_admin',
        'password': 'admin123',
        'first_name': 'Admin',
        'last_name': 'Sistema',
        'correo': 'admin@sistema.com',
        'cargo': 'administrador',
        'proceso': 'docencia',
        'area': areas['Recursos Humanos'],
        'categoria_docente': 'titular',
        'sexo': 'M',
        'edad': 45,
    },
    # Jefe de Área
    {
        'username': 'test_jefe_area',
        'password': 'jefe123',
        'first_name': 'Juan',
        'last_name': 'Jefe',
        'correo': 'jefe@sistema.com',
        'cargo': 'jefe_area',
        'proceso': 'produccion',
        'area': areas['Finanzas'],
        'sexo': 'M',
        'edad': 40,
    },
    # Especialista RRHH
    {
        'username': 'test_especialista',
        'password': 'especialista123',
        'first_name': 'María',
        'last_name': 'Especialista',
        'correo': 'especialista@sistema.com',
        'cargo': 'especialista_rrhh',
        'proceso': 'servicio',
        'area': areas['Recursos Humanos'],
        'sexo': 'F',
        'edad': 35,
    },
    # Empleado (no puede hacer login en sistema)
    {
        'username': 'test_empleado',
        'password': 'empleado123',
        'first_name': 'Carlos',
        'last_name': 'Empleado',
        'correo': 'empleado@sistema.com',
        'cargo': 'empleado',
        'proceso': 'docencia',
        'area': areas['Operaciones'],
        'categoria_docente': 'auxiliar',
        'sexo': 'M',
        'edad': 28,
    },
    # Más usuarios para testing
    {
        'username': 'test_jefe_finanzas',
        'password': 'jefe123',
        'first_name': 'Pedro',
        'last_name': 'Finanzas',
        'correo': 'pedro@sistema.com',
        'cargo': 'jefe_area',
        'proceso': 'produccion',
        'area': areas['Finanzas'],
        'sexo': 'M',
        'edad': 42,
    },
    {
        'username': 'test_jefe_it',
        'password': 'jefe123',
        'first_name': 'Laura',
        'last_name': 'IT',
        'correo': 'laura@sistema.com',
        'cargo': 'jefe_area',
        'proceso': 'docencia',
        'area': areas['IT'],
        'categoria_docente': 'asistente',
        'sexo': 'F',
        'edad': 32,
    },
]

created_count = 0
for user_data in usuarios_data:
    try:
        user = Usuario.objects.create_user(
            username=user_data['username'],
            password=user_data['password'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            correo=user_data['correo'],
            cargo=user_data['cargo'],
            proceso=user_data['proceso'],
            area=user_data.get('area'),
            categoria_docente=user_data.get('categoria_docente'),
            sexo=user_data.get('sexo'),
            edad=user_data.get('edad'),
        )
        print(f"   ✓ {user_data['username']:20} ({user_data['cargo']})")
        created_count += 1
    except IntegrityError as e:
        print(f"   → {user_data['username']:20} ya existe")
    except Exception as e:
        print(f"   ✗ Error en {user_data['username']}: {str(e)[:50]}")

# Verificación final
print("\n4. Verificación final...")
total_users = Usuario.objects.count()
total_areas = Area.objects.count()
print(f"   Total de usuarios en PostgreSQL: {total_users}")
print(f"   Total de áreas en PostgreSQL: {total_areas}")

# Mostrar usuarios por cargo
print("\n5. Distribución de usuarios:")
for cargo in ['administrador', 'jefe_area', 'especialista_rrhh', 'empleado']:
    count = Usuario.objects.filter(cargo=cargo).count()
    if count > 0:
        print(f"   - {cargo}: {count}")

print("\n" + "=" * 70)
print("✓ DATOS DE PRUEBA CREADOS EXITOSAMENTE EN PostgreSQL")
print("=" * 70)
print("\nCuentas de prueba disponibles:")
print("  Administrador:    test_admin        / admin123")
print("  Jefe Área 1:      test_jefe_area    / jefe123")
print("  Jefe Área 2:      test_jefe_finanzas / jefe123")
print("  Jefe Área 3:      test_jefe_it      / jefe123")
print("  Especialista:     test_especialista / especialista123")
print("  Empleado:         test_empleado     / empleado123 (no puede hacer login)")
print("=" * 70)
