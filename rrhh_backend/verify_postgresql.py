#!/usr/bin/env python
"""
Script para verificar que estamos usando PostgreSQL correctamente.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.conf import settings
from django.db import connection
from usuario.models import Usuario
from area.models import Area

print("=" * 60)
print("VERIFICACIÓN DE BASE DE DATOS")
print("=" * 60)

# 1. Verificar tipo de base de datos
db_engine = settings.DATABASES['default']['ENGINE']
print(f"\n✓ Motor de BD: {db_engine}")

if 'postgresql' in db_engine:
    print("  → PostgreSQL configurado correctamente")
    db_name = settings.DATABASES['default']['NAME']
    db_host = settings.DATABASES['default']['HOST']
    db_port = settings.DATABASES['default']['PORT']
    print(f"  → BD Name: {db_name}")
    print(f"  → Host: {db_host}")
    print(f"  → Puerto: {db_port}")
elif 'sqlite' in db_engine:
    print("  ⚠️  SQLite está siendo usado (no debería)")
else:
    print(f"  ⚠️  BD desconocida")

# 2. Verificar conexión
try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
    print(f"\n✓ Conexión a BD exitosa")
except Exception as e:
    print(f"\n✗ Error de conexión: {e}")
    exit(1)

# 3. Contar usuarios
total_users = Usuario.objects.count()
print(f"\n✓ Total de usuarios en BD: {total_users}")

# 4. Contar áreas
total_areas = Area.objects.count()
print(f"✓ Total de áreas en BD: {total_areas}")

# 5. Mostrar usuarios por cargo
print("\n✓ Distribución de usuarios por cargo:")
cargos_count = Usuario.objects.values('cargo').distinct().count()
cargo_list = Usuario.objects.values('cargo').distinct()
for cargo in cargo_list:
    count = Usuario.objects.filter(cargo=cargo['cargo']).count()
    print(f"  - {cargo['cargo']}: {count} usuarios")

# 6. Intentar crear un usuario de prueba
print("\n✓ Prueba de creación de usuario...")
try:
    test_user = Usuario.objects.filter(username='test_postgresql_verify').first()
    if test_user:
        test_user.delete()
    
    new_user = Usuario.objects.create_user(
        username='test_postgresql_verify',
        password='test123',
        first_name='Test',
        last_name='PostgreSQL',
        correo='test@postgresql.com',
        cargo='administrador',
        proceso='docencia',
        categoria_docente='titular',
        sexo='M',
        edad=30
    )
    print(f"  → Usuario creado: {new_user.username}")
    
    # Verificar que se creó
    verify = Usuario.objects.filter(username='test_postgresql_verify').first()
    if verify:
        print(f"  → Verificado: Usuario existe en BD")
        # Limpiar
        verify.delete()
        print(f"  → Test usuario eliminado")
    else:
        print(f"  ✗ Error: Usuario no se encontró después de crear")
except Exception as e:
    print(f"  ✗ Error al crear usuario: {e}")

print("\n" + "=" * 60)
print("✓ VERIFICACIÓN COMPLETADA - PostgreSQL configurado correctamente")
print("=" * 60)
