import os
import django
from datetime import date
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from usuario.models import Usuario
from claustro.models import Claustro
from django.db.models import Q

print("=== Prueba de Regeneración de Claustro ===\n")

# Limpiar datos previos
Claustro.objects.all().delete()
print("✓ Claustro limpiado\n")

# Obtener profesores activos
profesores_activos = Usuario.objects.filter(
    proceso=Usuario.PROCESO_DOCENCIA,
    categoria_docente__isnull=False
).exclude(
    Q(sexo=Usuario.SEXO_FEMENINO, edad__gte=60) |
    Q(sexo=Usuario.SEXO_MASCULINO, edad__gte=65)
)

print(f"Profesores activos encontrados: {profesores_activos.count()}\n")

# Contar por categoría
from django.db.models import Count
conteos = profesores_activos.values('categoria_docente').annotate(cantidad=Count('id'))

for conteo in conteos:
    print(f"  - {conteo['categoria_docente']}: {conteo['cantidad']} profesores")

total_profesores = profesores_activos.count()
print(f"\nTotal de profesores activos: {total_profesores}\n")

# Crear o actualizar registros de Claustro
fecha_actual = date.today()
created_records = []

for conteo in conteos:
    categoria = conteo['categoria_docente']
    cantidad = conteo['cantidad']
    
    if total_profesores > 0:
        porciento = Decimal(str(cantidad)) / Decimal(str(total_profesores))
        porciento = Decimal(str(round(float(porciento), 4)))
    else:
        porciento = Decimal('0.0000')
    
    claustro, created = Claustro.objects.update_or_create(
        categoria_docente=categoria,
        fecha=fecha_actual,
        defaults={
            'cantidad': cantidad,
            'porciento': porciento,
        }
    )
    
    if created:
        action = "CREADO"
    else:
        action = "ACTUALIZADO"
    
    print(f"✓ {action}: {categoria} - cantidad={cantidad}, porciento={porciento}")
    created_records.append(claustro)

print(f"\n✓ Regeneración completada: {len(created_records)} registros")
print(f"✓ Fecha: {fecha_actual}")
print(f"✓ Total de profesores activos: {total_profesores}")

# Mostrar todos los registros creados
print("\nRegistros en Claustro:")
for registro in Claustro.objects.all().order_by('-fecha', 'categoria_docente'):
    print(f"  - {registro.categoria_docente}: cantidad={registro.cantidad}, porciento={registro.porciento} ({registro.fecha})")
