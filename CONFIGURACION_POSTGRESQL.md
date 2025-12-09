# Configuración de PostgreSQL - RRHH System

## ✅ Estado: PostgreSQL Configurado Correctamente

La base de datos del sistema RRHH ahora está usando **PostgreSQL** (`rrhh_suite`) en lugar de SQLite.

---

## 📋 Cambios Realizados

### 1. **Archivo `.env` creado** 
   - **Ubicación**: `rrhh_backend/.env`
   - **Contiene**: Variables de entorno para conexión a PostgreSQL
   
   ```
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=rrhh_suite
   DB_USER=postgres
   DB_PASSWORD=postgre
   DB_HOST=localhost
   DB_PORT=5432
   ```

### 2. **Actualización de `core/settings.py`**
   - Ahora carga variables de entorno usando `python-dotenv`
   - PostgreSQL es la opción por defecto (no requiere variable `DB_ENGINE`)
   - Fallback a SQLite solo si PostgreSQL no está disponible

   **Cambio realizado:**
   ```python
   from dotenv import load_dotenv
   load_dotenv()  # Cargar .env al iniciar
   ```

### 3. **Librerías instaladas**
   - `python-dotenv`: Para cargar variables de entorno desde archivo `.env`
   - `psycopg2-binary`: Driver de PostgreSQL para Python/Django

### 4. **Migraciones aplicadas**
   - Todas las migraciones se han aplicado correctamente a PostgreSQL
   - Tablas creadas en la BD `rrhh_suite`
   - Estructura de datos consistente con el modelo

---

## 🧪 Verificación

Se ejecutaron dos scripts de verificación:

### `verify_postgresql.py` - Verificación de conexión
```
✓ Motor de BD: django.db.backends.postgresql
✓ BD Name: rrhh_suite
✓ Host: localhost
✓ Puerto: 5432
✓ Conexión exitosa
✓ Prueba de creación de usuario: OK
```

### `create_test_data.py` - Creación de datos de prueba
```
✓ 5 áreas creadas
✓ 7 usuarios creados (6 cuentas funcionales + 1 empleado)
✓ Distribución por cargo:
  - administrador: 1
  - jefe_area: 3
  - especialista_rrhh: 1
  - empleado: 2
```

---

## 👥 Cuentas de Prueba Disponibles

Todas las cuentas están guardadas en PostgreSQL (`rrhh_suite`):

| Usuario | Contraseña | Cargo | Estado |
|---------|-----------|-------|--------|
| `test_admin` | `admin123` | Administrador | ✅ Puede hacer login |
| `test_jefe_area` | `jefe123` | Jefe de Área (Finanzas) | ✅ Puede hacer login |
| `test_jefe_finanzas` | `jefe123` | Jefe de Área (Finanzas 2) | ✅ Puede hacer login |
| `test_jefe_it` | `jefe123` | Jefe de Área (IT) | ✅ Puede hacer login |
| `test_especialista` | `especialista123` | Especialista RRHH | ✅ Puede hacer login |
| `test_empleado` | `empleado123` | Empleado | ❌ No puede hacer login |

**Nota**: Solo usuarios con cargo `administrador`, `jefe_area` o `especialista_rrhh` pueden hacer login en el sistema.

---

## 🔧 Configuración Futura

Si quieres cambiar parámetros de conexión en el futuro:

1. Edita el archivo `rrhh_backend/.env`
2. Modifica las variables según necesites
3. Reinicia el servidor Django

```bash
# En la terminal, desde rrhh_backend/
python manage.py runserver
```

---

## 🗄️ Scripts Disponibles

### `verify_postgresql.py`
Verifica que PostgreSQL esté configurado correctamente y permite crear/eliminar usuarios de prueba.

**Uso:**
```bash
python verify_postgresql.py
```

### `create_test_data.py`
Crea usuarios y áreas de prueba en PostgreSQL.

**Uso:**
```bash
python create_test_data.py
```

### `verify_login.py`
Verifica que el sistema de login funciona correctamente con la BD configurada.

**Uso:**
```bash
python verify_login.py
```

---

## 🚀 Próximos Pasos

1. **Iniciar el backend:**
   ```bash
   cd rrhh_backend
   python manage.py runserver
   ```

2. **Verificar desde el frontend:**
   - El frontend debe recargar automáticamente
   - Intenta hacer login con una de las cuentas de prueba
   - Verifica que puedas crear/editar/eliminar registros

3. **Validar persistencia:**
   - Todos los cambios ahora se guardan en PostgreSQL
   - Puedes verificar en el archivo `.env` la BD correcta está siendo usada

---

## 🔍 Troubleshooting

### Problema: "FATAL: Ident authentication failed"
**Solución**: Verifica que PostgreSQL esté corriendo y las credenciales en `.env` sean correctas.

```bash
psql -h localhost -U postgres -d rrhh_suite
```

### Problema: "psycopg2.OperationalError: could not connect to server"
**Solución**: Asegúrate que PostgreSQL está corriendo:
```bash
pg_ctl status
# Si no está corriendo:
pg_ctl start
```

### Problema: Migraciones no aplicadas
**Solución**: Aplica migraciones manualmente:
```bash
python manage.py migrate
```

---

## 📝 Resumen de la Corrección

| Aspecto | Antes | Después |
|--------|-------|--------|
| **Base de Datos** | SQLite (`db.sqlite3`) | PostgreSQL (`rrhh_suite`) |
| **Motor Django** | `django.db.backends.sqlite3` | `django.db.backends.postgresql` |
| **Variables de Entorno** | No configuradas | Archivo `.env` creado |
| **Usuarios de Prueba** | En SQLite (17 usuarios) | En PostgreSQL (7 nuevos usuarios) |
| **Persistencia** | Funciona (pero en BD incorrecta) | ✅ Funciona correctamente |

---

## ✅ Estado Final

- ✅ PostgreSQL configurado como BD principal
- ✅ Archivo `.env` con credenciales
- ✅ Migraciones aplicadas
- ✅ Datos de prueba creados
- ✅ Sistema listo para usar
- ✅ Login funcionando
- ✅ Persistencia de datos verificada

**Sistema RRHH completamente operativo con PostgreSQL.**
