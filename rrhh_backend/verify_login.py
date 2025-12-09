#!/usr/bin/env python
"""
Script para verificar y corregir el sistema de login y persistencia de datos.
Realiza las siguientes acciones:
1. Verifica que la BD está funcional
2. Crea un usuario administrador de prueba
3. Verifica que el usuario se guarda en la BD
4. Verifica que el login funciona correctamente
"""
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import authenticate
from usuario.models import Usuario
from datetime import date

def test_database_connection():
    """Verificar conexión a BD"""
    try:
        # Contar usuarios existentes
        count = Usuario.objects.count()
        print(f"✓ Conexión a BD exitosa. Total de usuarios: {count}")
        return True
    except Exception as e:
        print(f"✗ Error al conectar a BD: {e}")
        return False

def create_test_admin():
    """Crear usuario administrador de prueba"""
    try:
        # Verificar si ya existe
        if Usuario.objects.filter(username='admin_test').exists():
            print("✓ Usuario admin_test ya existe")
            return Usuario.objects.get(username='admin_test')
        
        # Crear nuevo usuario
        user = Usuario.objects.create_user(
            username='admin_test',
            password='Password123',
            first_name='Admin',
            last_name='Test',
            correo='admin@test.com',
            cargo=Usuario.CARGO_ADMIN,
            proceso=Usuario.PROCESO_PRODUCCION,
            fecha_contratacion=date.today(),
            sexo=Usuario.SEXO_MASCULINO,
            edad=35
        )
        print(f"✓ Usuario admin_test creado: {user}")
        return user
    except Exception as e:
        print(f"✗ Error al crear usuario: {e}")
        return None

def verify_user_in_database(username):
    """Verificar que el usuario existe en la BD"""
    try:
        user = Usuario.objects.get(username=username)
        print(f"✓ Usuario encontrado en BD: {user}")
        print(f"  - ID: {user.id}")
        print(f"  - Cargo: {user.cargo}")
        print(f"  - Email: {user.correo}")
        return user
    except Usuario.DoesNotExist:
        print(f"✗ Usuario NO encontrado en BD: {username}")
        return None

def test_login(username, password):
    """Probar login con credentials"""
    try:
        user = authenticate(username=username, password=password)
        if user is not None:
            print(f"✓ Login exitoso para {username}")
            print(f"  - Usuario ID: {user.id}")
            print(f"  - Cargo: {user.cargo}")
            return True
        else:
            print(f"✗ Login fallido para {username}")
            return False
    except Exception as e:
        print(f"✗ Error al intentar login: {e}")
        return False

def create_test_jefe_area():
    """Crear usuario jefe de área de prueba"""
    try:
        # Obtener o crear un área
        from area.models import Area
        area, _ = Area.objects.get_or_create(
            nombre='Área de Prueba',
            defaults={'cantidad_trabajadores': 10}
        )
        
        # Verificar si usuario existe
        if Usuario.objects.filter(username='jefe_test').exists():
            print("✓ Usuario jefe_test ya existe")
            return Usuario.objects.get(username='jefe_test')
        
        user = Usuario.objects.create_user(
            username='jefe_test',
            password='Password123',
            first_name='Jefe',
            last_name='Area',
            correo='jefe@test.com',
            cargo=Usuario.CARGO_JEFE_AREA,
            proceso=Usuario.PROCESO_PRODUCCION,
            area=area,
            fecha_contratacion=date.today(),
            sexo=Usuario.SEXO_FEMENINO,
            edad=40
        )
        print(f"✓ Usuario jefe_test creado: {user}")
        return user
    except Exception as e:
        print(f"✗ Error al crear jefe de área: {e}")
        return None

def create_test_especialista():
    """Crear usuario especialista RRHH de prueba"""
    try:
        if Usuario.objects.filter(username='especialista_test').exists():
            print("✓ Usuario especialista_test ya existe")
            return Usuario.objects.get(username='especialista_test')
        
        user = Usuario.objects.create_user(
            username='especialista_test',
            password='Password123',
            first_name='Especialista',
            last_name='RRHH',
            correo='especialista@test.com',
            cargo=Usuario.CARGO_ESPECIALISTA_RRHH,
            proceso=Usuario.PROCESO_PRODUCCION,
            fecha_contratacion=date.today(),
            sexo=Usuario.SEXO_MASCULINO,
            edad=38
        )
        print(f"✓ Usuario especialista_test creado: {user}")
        return user
    except Exception as e:
        print(f"✗ Error al crear especialista: {e}")
        return None

def main():
    print("=" * 60)
    print("VERIFICACIÓN Y CORRECCIÓN DE SISTEMA DE LOGIN")
    print("=" * 60)
    
    # 1. Verificar conexión a BD
    print("\n1. Verificando conexión a base de datos...")
    if not test_database_connection():
        print("ABORTANDO: No se puede conectar a la BD")
        return
    
    # 2. Crear usuarios de prueba
    print("\n2. Creando usuarios de prueba...")
    admin = create_test_admin()
    jefe = create_test_jefe_area()
    especialista = create_test_especialista()
    
    # 3. Verificar persistencia en BD
    print("\n3. Verificando persistencia en base de datos...")
    verify_user_in_database('admin_test')
    verify_user_in_database('jefe_test')
    verify_user_in_database('especialista_test')
    
    # 4. Probar login
    print("\n4. Probando login con credentials...")
    test_login('admin_test', 'Password123')
    test_login('jefe_test', 'Password123')
    test_login('especialista_test', 'Password123')
    test_login('admin_test', 'WrongPassword')
    
    # 5. Listar todos los usuarios
    print("\n5. Resumen de usuarios en la base de datos:")
    users = Usuario.objects.all()
    for user in users:
        print(f"  - {user.username} ({user.get_full_name()}) - {user.cargo}")
    
    print("\n" + "=" * 60)
    print("VERIFICACIÓN COMPLETADA")
    print("=" * 60)

if __name__ == '__main__':
    main()
