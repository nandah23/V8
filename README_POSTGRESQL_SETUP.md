# 🎉 Sistema RRHH - PostgreSQL Completamente Configurado

## ✅ ESTADO: LISTO PARA USAR

El sistema RRHH ahora está completamente configurado para usar **PostgreSQL** en lugar de SQLite.

---

## 🚀 ¿Cómo iniciar el sistema?

### 1. Terminal 1 - Backend Django
```bash
cd rrhh_backend
python manage.py runserver
```
- Escucha en: **http://localhost:8000/**
- API disponible en: **http://localhost:8000/api/**

### 2. Terminal 2 - Frontend React
```bash
cd rrhh_frontend
npm run dev
```
- Disponible en: **http://localhost:5173/**

---

## 🔐 Cuentas de Prueba para Login

Usa cualquiera de estas cuentas en el formulario de login del sistema:

| Usuario | Contraseña | Cargo | Descripción |
|---------|-----------|-------|-------------|
| `test_admin` | `admin123` | Administrador | Acceso completo al sistema |
| `test_jefe_area` | `jefe123` | Jefe de Área | Puede ver empleados de su área |
| `test_jefe_finanzas` | `jefe123` | Jefe de Área | Área Finanzas |
| `test_jefe_it` | `jefe123` | Jefe de Área | Área IT |
| `test_especialista` | `especialista123` | Especialista RRHH | Puede ver todos los empleados |
| `test_empleado` | `empleado123` | Empleado | ❌ No puede hacer login |

---

## 📊 Qué cambió

### Antes (SQLite)
```
BASE DE DATOS: db.sqlite3 (archivo local)
PROBLEMA: Los datos se guardaban pero en la BD incorrecta
```

### Ahora (PostgreSQL)
```
BASE DE DATOS: rrhh_suite (PostgreSQL)
ARCHIVO DE CONFIGURACIÓN: rrhh_backend/.env
ESTADO: ✅ Correcto - Datos persisten en PostgreSQL
```

---

## 🔍 Archivo `.env` (Backend)

**Ubicación**: `rrhh_backend/.env`

Este archivo contiene la configuración de conexión a PostgreSQL:

```env
# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=rrhh_suite
DB_USER=postgres
DB_PASSWORD=postgre
DB_HOST=localhost
DB_PORT=5432
```

**Importante**: Este archivo ya está creado. Si necesitas cambiar credenciales, edítalo aquí.

---

## 🧪 Scripts de Verificación

### Verificar conexión a PostgreSQL
```bash
cd rrhh_backend
python verify_postgresql.py
```

### Crear nuevos datos de prueba
```bash
cd rrhh_backend
python create_test_data.py
```

### Verificar login y persistencia
```bash
cd rrhh_backend
python verify_login.py
```

---

## 📝 Datos Creados en PostgreSQL

| Tipo | Cantidad | Detalles |
|------|----------|---------|
| **Áreas** | 5 | RR.HH., Finanzas, Operaciones, IT, Administración |
| **Usuarios** | 7 | 1 admin, 3 jefes, 1 especialista, 2 empleados |
| **Cargos** | 4 | administrador, jefe_area, especialista_rrhh, empleado |

---

## 🎯 Funcionalidad Verificada

- ✅ **Base de Datos**: PostgreSQL (`rrhh_suite`) configurado
- ✅ **Migraciones**: Todas aplicadas correctamente
- ✅ **Datos de Prueba**: 7 usuarios y 5 áreas creadas
- ✅ **Backend**: Django corriendo en puerto 8000
- ✅ **Frontend**: React corriendo en puerto 5173
- ✅ **Login**: Sistema de autenticación funcionando
- ✅ **Persistencia**: Los datos se guardan en PostgreSQL
- ✅ **Control de Acceso**: Sistema de permisos por cargo funcionando

---

## 🔧 Si necesitas...

### Agregar una nueva área
1. Usa el frontend o crea manualmente una cuenta de administrador
2. En admin panel: **Admin → Areas → Add Area**
3. Los datos se guardarán automáticamente en PostgreSQL

### Crear un nuevo usuario
1. Login como administrador o especialista RRHH
2. Ve a **Usuarios → Agregar Usuario**
3. Completa el formulario
4. El usuario se guardará en PostgreSQL

### Cambiar credenciales de PostgreSQL
1. Edita `rrhh_backend/.env`
2. Modifica `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
3. Reinicia el servidor Django

### Ver todos los usuarios en BD
```bash
cd rrhh_backend
python manage.py shell
>>> from usuario.models import Usuario
>>> Usuario.objects.all().count()
7
>>> for u in Usuario.objects.all():
>>>     print(f"{u.username} - {u.cargo}")
```

---

## ⚠️ Troubleshooting

### Error: "could not connect to server"
PostgreSQL no está corriendo. Inicia PostgreSQL:
```bash
# En PowerShell (Windows)
pg_ctl start

# O en Windows Services
# Busca "PostgreSQL" en Services y inicia
```

### Error: "Ident authentication failed for user"
Verifica las credenciales en `.env`:
```bash
# Prueba conexión manual
psql -h localhost -U postgres -d rrhh_suite
# Debería pedirte la contraseña: postgre
```

### Error: "No such table: usuario_usuario"
Las migraciones no se aplicaron. Ejecuta:
```bash
cd rrhh_backend
python manage.py migrate
```

### Frontend en blanco
1. Abre la consola del navegador (F12)
2. Verifica si hay errores
3. Recarga la página (Ctrl + R)
4. Si persiste, reinicia el servidor frontend

---

## 📋 Checklist Final

- [ ] PostgreSQL está corriendo (`pg_ctl status`)
- [ ] Backend Django iniciado (`python manage.py runserver`)
- [ ] Frontend React iniciado (`npm run dev`)
- [ ] Puedes acceder a http://localhost:5173/
- [ ] El login responde a `test_admin` / `admin123`
- [ ] Puedes crear/editar/eliminar registros
- [ ] Los datos persisten al recargar

Si todo está ✅, **¡el sistema está listo para usar!**

---

## 📞 Resumen de Cambios Realizados

1. ✅ Creado archivo `.env` con credenciales de PostgreSQL
2. ✅ Actualizado `core/settings.py` para cargar `.env` con `python-dotenv`
3. ✅ Instaladas librerías: `python-dotenv` y `psycopg2-binary`
4. ✅ Aplicadas todas las migraciones a PostgreSQL
5. ✅ Creados 7 usuarios de prueba en PostgreSQL
6. ✅ Creadas 5 áreas de prueba
7. ✅ Verificada conexión, persistencia y login
8. ✅ Backend y Frontend corriendo exitosamente

**Sistema completamente operativo con PostgreSQL. 🎉**
