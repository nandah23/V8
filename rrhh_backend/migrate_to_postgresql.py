#!/usr/bin/env python
"""
Script para exportar datos desde SQLite e importarlos a PostgreSQL.
Este script usa dumpdata/loaddata para migrar los datos.
"""
import os
import json
import subprocess
from pathlib import Path

# Cambiar a directorio de rrhh_backend
os.chdir(Path(__file__).parent)

print("=" * 70)
print("MIGRACIÓN DE DATOS: SQLite → PostgreSQL")
print("=" * 70)

# 1. Exportar datos desde SQLite a JSON
print("\n1. Exportando datos desde SQLite...")
try:
    result = subprocess.run(
        ['python', 'manage.py', 'dumpdata', '--database=sqlite', '-o', 'sqlite_backup.json'],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        print(f"   Nota: dumpdata específica de base de datos puede no funcionar, intentando sin --database...")
        # Cambiar a SQLite temporalmente para hacer backup
        result = subprocess.run(
            ['python', '-c', """
import os
os.environ['USE_SQLITE'] = 'true'
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.core.management import call_command
call_command('dumpdata', indent=2, stdout=open('sqlite_backup.json', 'w'))
"""],
            capture_output=True,
            text=True
        )
    
    if Path('sqlite_backup.json').exists():
        size = Path('sqlite_backup.json').stat().st_size
        print(f"   ✓ Backup creado: sqlite_backup.json ({size} bytes)")
except Exception as e:
    print(f"   ⚠️  Error en backup: {e}")
    print(f"   Continuando sin migración de datos...")

# 2. Confirmación
print("\n2. Seleccionar opción:")
print("   a) Importar datos de sqlite_backup.json (si existe)")
print("   b) Comenzar fresco sin datos previos")
print("   c) Cancelar")

choice = input("\nOpción (a/b/c): ").lower().strip()

if choice == 'a':
    if Path('sqlite_backup.json').exists():
        print("\n3. Importando datos a PostgreSQL...")
        try:
            # Primero, vaciar PostgreSQL (opcional - comentado para seguridad)
            # result = subprocess.run(['python', 'manage.py', 'flush', '--no-input'], capture_output=True)
            
            result = subprocess.run(
                ['python', 'manage.py', 'loaddata', 'sqlite_backup.json'],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                print(f"   ✓ Datos importados correctamente a PostgreSQL")
                print(f"\n   Salida: {result.stdout[:200]}")
            else:
                print(f"   ✗ Error en importación:")
                print(f"   {result.stderr}")
        except Exception as e:
            print(f"   ✗ Error: {e}")
    else:
        print("   ✗ No se encontró sqlite_backup.json")
        
elif choice == 'b':
    print("\n   ✓ Comenzando con PostgreSQL vacío")
    print("   Puedes crear nuevos datos directamente en la aplicación")
    
elif choice == 'c':
    print("\n   Cancelado")
else:
    print(f"\n   Opción inválida: {choice}")

print("\n" + "=" * 70)
print("✓ Proceso completado")
print("=" * 70)
