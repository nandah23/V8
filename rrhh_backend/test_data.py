import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from usuario.models import Usuario
from claustro.models import Claustro
from datetime import date

# Crear un usuario administrador para testing
admin_user = Usuario.objects.filter(username='admin_test').first()
if not admin_user:
    admin_user = Usuario(
        username='admin_test',
        first_name='Admin',
        last_name='Test',
        email='admin@test.com',
        cargo=Usuario.CARGO_ADMIN,
        proceso=Usuario.PROCESO_DOCENCIA,
        sexo=Usuario.SEXO_MASCULINO,
        edad=50,
        categoria_docente=Usuario.CATEGORIA_TITULAR,
        is_staff=True,
        is_superuser=True,
    )
    admin_user.set_password('testpass123')
    admin_user.save()
    print("✓ Admin usuario creado")
else:
    print("✓ Admin usuario ya existe")

# Crear profesores de prueba
categorias = [Usuario.CATEGORIA_TITULAR, Usuario.CATEGORIA_AUXILIAR, Usuario.CATEGORIA_ASISTENTE]
for i in range(5):
    sexo = Usuario.SEXO_MASCULINO if i % 2 == 0 else Usuario.SEXO_FEMENINO
    edad = 40 + (i * 3)
    categoria = categorias[i % len(categorias)]
    
    user = Usuario.objects.filter(username=f'profesor{i}').first()
    if not user:
        user = Usuario(
            username=f'profesor{i}',
            first_name='Profesor',
            last_name=f'{i}',
            email=f'profesor{i}@test.com',
            cargo=Usuario.CARGO_EMPLEADO,
            proceso=Usuario.PROCESO_DOCENCIA,
            sexo=sexo,
            edad=edad,
            categoria_docente=categoria,
        )
        user.set_password('testpass123')
        user.save()
        print(f"✓ Profesor {i} creado: edad={user.edad}, sexo={user.sexo}, categoria={user.categoria_docente}")
    else:
        print(f"✓ Profesor {i} ya existe")

print("\n✓ Total usuarios con proceso=docencia:", Usuario.objects.filter(proceso=Usuario.PROCESO_DOCENCIA).count())

# Verificar jubilados
activos = Usuario.objects.filter(
    proceso=Usuario.PROCESO_DOCENCIA,
    categoria_docente__isnull=False
)
print(f"✓ Profesores activos (no jubilados): {activos.count()}")

# Mostrar todos los profesores
print("\nProfesores en el sistema:")
for u in Usuario.objects.filter(proceso=Usuario.PROCESO_DOCENCIA, categoria_docente__isnull=False):
    jubilado = u.esta_jubilado()
    print(f"  - {u.username}: edad={u.edad}, sexo={u.sexo}, categoria={u.categoria_docente}, jubilado={jubilado}")
