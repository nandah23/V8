# Guía de Acceso - Sistema RRHH

## 📝 Información de Autenticación

El sistema utiliza autenticación basada en **nombre de usuario y contraseña** con JWT (JSON Web Tokens).

### ¿Dónde se guardan los datos?

- ✅ **Base de Datos SQLite**: `rrhh_backend/db.sqlite3`
- ✅ **Persistencia**: Todos los datos se guardan automáticamente en la BD
- ✅ **Verificación**: Script `verify_login.py` disponible para validar

## 👥 Usuarios de Prueba

Se han creado 3 usuarios de prueba con diferentes roles:

### 1. Administrador
```
Usuario: admin_test
Contraseña: Password123
Cargo: Administrador
Acceso: Todos los módulos (8)
```
**Permisos**: 
- Ver y gestionar todos los usuarios de cualquier cargo
- Acceso a todas las funcionalidades
- Puede crear/editar/eliminar cualquier recurso

### 2. Jefe de Área
```
Usuario: jefe_test
Contraseña: Password123
Cargo: Jefe de Área
Acceso: 7 módulos (sin Claustros)
```
**Permisos**:
- Ver y gestionar solo empleados de su área
- No puede ver datos de Claustros
- Acceso limitado a recursos específicos

### 3. Especialista RRHH
```
Usuario: especialista_test
Contraseña: Password123
Cargo: Especialista RRHH
Acceso: 7 módulos (sin Solicitudes)
```
**Permisos**:
- Ver y gestionar todos los empleados
- Puede ver datos de Claustros
- No puede ver Solicitudes

## 🔐 Proceso de Login

1. **Accede a**: http://localhost:5173/login
2. **Ingresa**: 
   - Nombre de usuario (ej: `jefe_test`)
   - Contraseña (ej: `Password123`)
3. **Opciones**:
   - ☑️ "Recordarme": Guarda sesión en el navegador
4. **Resultado**: 
   - ✅ Login exitoso → Acceso al sistema
   - ❌ Login fallido → Mensaje de error

## 🔄 Cómo Funciona la Autenticación

```
1. Frontend envía (username, password) → Backend
2. Backend valida credentials con Django Auth
3. Si es válido, genera JWT tokens:
   - access_token (válido 60 minutos)
   - refresh_token (válido 7 días)
4. Frontend almacena tokens en localStorage/sessionStorage
5. Cada request incluye access_token en header Authorization
```

## 📊 Datos en la Base de Datos

**Total de usuarios en la BD**: 17

### Usuarios Existentes:
- `user1` a `user4` - Empleados (para testing)
- `admin1` a `admin3` - Empleados (para testing)
- `admin` - Empleado (para testing)
- `lulu` - Empleado (para testing)
- `profesor0` a `profesor4` - Empleados docentes (para testing)
- `admin_test` - **Administrador** (recién creado)
- `jefe_test` - **Jefe de Área** (recién creado)
- `especialista_test` - **Especialista RRHH** (recién creado)

## ✅ Verificación de Persistencia

Para verificar que los datos se guardan correctamente:

```bash
cd rrhh_backend
python verify_login.py
```

Este script:
1. Verifica conexión a BD
2. Crea usuarios de prueba
3. Valida que existan en BD
4. Prueba login con cada usuario

## 📋 Control de Acceso por Rol

| Funcionalidad | Admin | Jefe | Especialista | Empleado |
|---|---|---|---|---|
| Ver Usuarios | ✅ Todos | ✅ Empleados | ✅ Empleados | ❌ |
| Crear Usuarios | ✅ Todos | ❌ | ❌ | ❌ |
| Ver Áreas | ✅ Todas | ✅ Su área | ✅ Todas | ❌ |
| Ver Claustros | ✅ | ❌ | ✅ | ❌ |
| Ver Solicitudes | ✅ | ✅ | ❌ | ❌ |
| Ver Incentivos | ✅ | ✅ | ✅ | ❌ |

## 🔧 Crear Nuevos Usuarios

### Desde Django Admin:
```
URL: http://localhost:8000/admin/
Usuario: admin (o cualquier superuser)
```

### Desde API (requiere auth):
```bash
POST /api/auth/register/
Headers: Authorization: Bearer {access_token}
Body: {
  "username": "nuevo_user",
  "password": "password123",
  "first_name": "Nombre",
  "last_name": "Apellido",
  "correo": "email@test.com",
  "cargo": "empleado",
  "proceso": "produccion"
}
```

## 🐛 Troubleshooting

### "Login fallido"
- ❌ Verifica que el nombre de usuario es correcto
- ❌ Verifica que la contraseña es correcta
- ❌ Verifica que el usuario tiene un cargo válido (no puede ser "empleado")

### "No puedo crear usuarios"
- ✅ Solo administradores pueden crear usuarios
- ✅ Login con `admin_test` primero
- ✅ Intenta crear desde el panel Personal

### "Los datos no se guardan"
- ✅ Verifica que la BD (db.sqlite3) existe
- ✅ Ejecuta: `python manage.py migrate`
- ✅ Ejecuta: `python verify_login.py` para validar

## 📞 Próximos Pasos

1. **Testing**: Intenta con cada usuario de prueba
2. **Crear datos**: Usa el usuario `admin_test` para crear áreas, empleados, etc.
3. **Verificar persistencia**: Los datos deberían aparecer en próximas sesiones
4. **Implementar**: Código personalizado según requisitos

