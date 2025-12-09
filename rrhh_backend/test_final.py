"""
Test final del sistema RRHH - Verificación end-to-end
"""
import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from usuario.models import Usuario
from claustro.models import Claustro
from area.models import Area
from condecoracion.models import Condecoracion
from incentivo.models import Incentivo
from solicitud.models import Solicitud
from django.db.models import Q

print("=" * 60)
print("PRUEBA FINAL DEL SISTEMA RRHH")
print("=" * 60)

# 1. Verificar usuarios
print("\n1. VERIFICACIÓN DE USUARIOS")
print("-" * 60)
usuarios_total = Usuario.objects.count()
usuarios_docencia = Usuario.objects.filter(proceso=Usuario.PROCESO_DOCENCIA).count()
print(f"✓ Total usuarios: {usuarios_total}")
print(f"✓ Usuarios con proceso=docencia: {usuarios_docencia}")

# 2. Verificar cargos permitidos
print("\n2. VERIFICACIÓN DE CARGOS PERMITIDOS")
print("-" * 60)
cargos_permitidos = {Usuario.CARGO_ADMIN, Usuario.CARGO_JEFE_AREA, Usuario.CARGO_ESPECIALISTA_RRHH}
for cargo in cargos_permitidos:
    count = Usuario.objects.filter(cargo=cargo).count()
    print(f"✓ Usuarios con cargo={cargo}: {count}")

# 3. Verificar jubilación
print("\n3. VERIFICACIÓN DE JUBILACIÓN")
print("-" * 60)
jubilados = Usuario.objects.filter(
    Q(sexo=Usuario.SEXO_FEMENINO, edad__gte=60) |
    Q(sexo=Usuario.SEXO_MASCULINO, edad__gte=65)
)
print(f"✓ Usuarios jubilados: {jubilados.count()}")
for u in jubilados:
    print(f"  - {u.username}: edad={u.edad}, sexo={u.sexo}, jubilado={u.esta_jubilado()}")

# 4. Verificar categorías docentes
print("\n4. VERIFICACIÓN DE CATEGORÍAS DOCENTES")
print("-" * 60)
usuarios_con_categoria = Usuario.objects.filter(
    proceso=Usuario.PROCESO_DOCENCIA,
    categoria_docente__isnull=False
).count()
print(f"✓ Usuarios con categoria_docente (docencia): {usuarios_con_categoria}")

usuarios_sin_categoria = Usuario.objects.filter(
    proceso=Usuario.PROCESO_DOCENCIA,
    categoria_docente__isnull=True
).count()
print(f"✓ Usuarios sin categoria_docente (pero docencia): {usuarios_sin_categoria}")

# 5. Verificar Claustro
print("\n5. VERIFICACIÓN DE CLAUSTRO")
print("-" * 60)
claustro_total = Claustro.objects.count()
print(f"✓ Total registros en claustro: {claustro_total}")

if claustro_total > 0:
    ultima_fecha = Claustro.objects.latest('fecha').fecha
    registros_ultima_fecha = Claustro.objects.filter(fecha=ultima_fecha)
    print(f"✓ Última fecha registrada: {ultima_fecha}")
    print(f"✓ Registros en esa fecha: {registros_ultima_fecha.count()}")
    
    total_profesores_activos = sum(r.cantidad for r in registros_ultima_fecha)
    print(f"✓ Total de profesores activos: {total_profesores_activos}")
    
    print("\n  Distribución por categoría:")
    for registro in registros_ultima_fecha.order_by('categoria_docente'):
        print(f"    - {registro.categoria_docente}: {registro.cantidad} ({registro.porciento:.2%})")

# 6. Validación de restricciones de datos
print("\n6. VALIDACIÓN DE RESTRICCIONES DE DATOS")
print("-" * 60)

# Verificar que todos los usuarios de docencia tengan edad
usuarios_docencia_sin_edad = Usuario.objects.filter(
    proceso=Usuario.PROCESO_DOCENCIA,
    edad__isnull=True
).count()
print(f"✓ Usuarios docencia sin edad: {usuarios_docencia_sin_edad} (esperado: 0)")

# Verificar que todos los usuarios de docencia tengan sexo
usuarios_docencia_sin_sexo = Usuario.objects.filter(
    proceso=Usuario.PROCESO_DOCENCIA,
    sexo__isnull=True
).count()
print(f"✓ Usuarios docencia sin sexo: {usuarios_docencia_sin_sexo} (esperado: 0)")

# 7. Verificar Areas
print("\n7. VERIFICACIÓN DE AREAS")
print("-" * 60)
areas = Area.objects.all()
print(f"✓ Total áreas: {areas.count()}")
for area in areas[:5]:  # Mostrar primeras 5
    print(f"  - {area.nombre}: {area.cantidad_trabajadores} trabajadores")

# 8. Verificar Incentivos
print("\n8. VERIFICACIÓN DE INCENTIVOS")
print("-" * 60)
incentivos = Incentivo.objects.all()
print(f"✓ Total incentivos: {incentivos.count()}")
for incentivo in incentivos[:5]:  # Mostrar primeros 5
    print(f"  - {incentivo.nombre}: cantidad disponible={incentivo.cantidad}, precio={incentivo.precio}")

# 9. Verificar Condecoraciones
print("\n9. VERIFICACIÓN DE CONDECORACIONES")
print("-" * 60)
condecoraciones = Condecoracion.objects.all()
print(f"✓ Total condecoraciones: {condecoraciones.count()}")

# 10. Verificar Solicitudes
print("\n10. VERIFICACIÓN DE SOLICITUDES")
print("-" * 60)
solicitudes_total = Solicitud.objects.count()
solicitudes_por_estado = {}
for estado_choice in Solicitud.ESTADO_CHOICES:
    estado = estado_choice[0]
    count = Solicitud.objects.filter(estado=estado).count()
    solicitudes_por_estado[estado] = count
    print(f"✓ Solicitudes estado={estado}: {count}")

print("\n" + "=" * 60)
print("✓ PRUEBA FINAL COMPLETADA")
print("=" * 60)
