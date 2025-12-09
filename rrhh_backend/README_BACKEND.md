# Sistema de RRHH - Backend (V8)

## Estado del Proyecto

### ✅ Completado

#### Módulo Usuario
- ✅ CRUD completo con autenticación JWT
- ✅ Campos: `sexo` (M/F), `edad` (IntegerField), `categoria_docente` (solo para docencia)
- ✅ Validación: `categoria_docente` solo permitido cuando `proceso=docencia`
- ✅ Método: `esta_jubilado()` - Mujeres >= 60 años, Hombres >= 65 años
- ✅ Permisos: Solo cargos permitidos (admin, jefe_area, especialista_rrhh) pueden acceder
- ✅ Admin mejorado con nuevos campos

#### Módulo Claustro
- ✅ Modelo temporal con campos: `categoria_docente`, `fecha`, `cantidad`, `porciento`
- ✅ Campos decimales: `porciento` con 4 lugares decimales (0-1)
- ✅ Validación: `cantidad >= 0`, `0 <= porciento <= 1`
- ✅ Constraint: unique_together en (categoria_docente, fecha)
- ✅ Acción: `regenerar_desde_usuarios` - Regenera datos desde Usuario
  - Filtra: proceso=docencia, categoria_docente not null
  - Excluye: jubilados (Q objects)
  - Calcula: cantidad y porciento por categoría
  - Usa: update_or_create para idempotencia
- ✅ Permisos: Admin CRUD, especialista_rrhh read-only
- ✅ Serializer: Validación completa de campos

#### Otros Módulos
- ✅ Area: CRUD con validaciones (cantidad_trabajadores >= 0, nombre único)
- ✅ Condecoracion: CRUD con asignación automática (M2M)
- ✅ Incentivo: CRUD con gestión de cantidades (cantidad >= 0, precio >= 0)
- ✅ Solicitud: State machine (pendiente → enviada → cancelada/aceptada)
  - Validación de inventario al enviar
- ✅ Distribucion: Deducción automática de inventario, serializers dinámicos por rol

### 📊 Base de Datos

**Migraciones Aplicadas:**
```
✓ usuario.0005_usuario_categoria_docente_usuario_edad_usuario_sexo
✓ claustro.0001_initial
✓ claustro.0002_alter_claustro_options_and_more
```

**Estado:**
- SQLite funcional con todos los módulos
- Validaciones duales (modelo + serializer)
- Datos de prueba cargados

## Pruebas

### Ejecutar Pruebas
```bash
# Crear datos de prueba
python test_data.py

# Probar regeneración de Claustro
python test_claustro.py

# Prueba final completa
python test_final.py

# Verificar sistema
python manage.py check
```

### Resultados
- 8 usuarios con proceso=docencia
- 6 profesores activos (no jubilados)
- 3 registros de Claustro (titular: 50%, auxiliar: 33.33%, asistente: 16.67%)

## Endpoints Implementados

### Usuario
```
GET    /api/usuario/                    # Listar usuarios
POST   /api/usuario/                    # Crear usuario (solo admin)
GET    /api/usuario/{id}/               # Obtener usuario
PUT    /api/usuario/{id}/               # Actualizar usuario
DELETE /api/usuario/{id}/               # Eliminar usuario (solo admin)
POST   /api/token/                      # Obtener token JWT
POST   /api/token/refresh/              # Refrescar token
```

### Claustro
```
GET    /api/claustro/                   # Listar registros
POST   /api/claustro/                   # Crear registro (solo admin)
GET    /api/claustro/{id}/              # Obtener registro
PUT    /api/claustro/{id}/              # Actualizar registro (solo admin)
DELETE /api/claustro/{id}/              # Eliminar registro (solo admin)
POST   /api/claustro/regenerar_desde_usuarios/  # Regenerar desde usuarios (solo admin)
```

### Otros Endpoints
- Area: `/api/area/` (CRUD completo)
- Condecoracion: `/api/condecoracion/` (CRUD completo)
- Incentivo: `/api/incentivo/` (CRUD completo)
- Solicitud: `/api/solicitud/` (CRUD + acciones: enviar, cancelar)
- Distribucion: `/api/distribucion/` (CRUD + acción: crear_desde_solicitud)

## Configuración

### Cargos Permitidos
- `administrador`: Acceso completo
- `jefe_area`: Gestión de su área
- `especialista_rrhh`: Lectura especializada

### Proceso
- `docencia`: Requiere campo `categoria_docente`
- `produccion`: No requiere categoría
- `servicio`: No requiere categoría

### Categorías Docentes (solo docencia)
- `titular`: Profesor Titular
- `auxiliar`: Profesor Auxiliar
- `asistente`: Profesor Asistente
- `instructor`: Profesor Instructor

### Sexo
- `M`: Masculino
- `F`: Femenino

## Próximos Pasos

### 1. Frontend
- [ ] Implementar formulario de Usuario con campo condicional `categoria_docente`
- [ ] Crear dashboard de Solicitudes con state machine UI
- [ ] Gráfica temporal de Claustro (Chart.js/D3.js)
- [ ] Autenticación JWT en Angular/Vue/React

### 2. Testing
- [ ] Tests unitarios para modelos
- [ ] Tests de integración para endpoints
- [ ] Tests de validaciones
- [ ] Tests de permisos

### 3. Documentación
- [ ] API Documentation (Swagger/OpenAPI)
- [ ] Diagramas ER
- [ ] Guía de flujo de solicitudes

### 4. Características Futuras
- [ ] Predicción automática usando series temporales de Claustro
- [ ] Reportes en PDF
- [ ] Auditoría de cambios
- [ ] Notificaciones por email

## Comandos Útiles

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Verificar errores
python manage.py check

# Crear superusuario
python manage.py createsuperuser

# Acceder a admin
# URL: http://localhost:8000/admin

# Shell de Django
python manage.py shell

# Ejecutar servidor
python manage.py runserver
```

## Notas Importantes

1. **Validación de Inventario**: 
   - Se valida al enviar solicitud (no puede exceder disponible)
   - Se deduce al crear distribución

2. **Jubilación**: 
   - Mujeres: >= 60 años
   - Hombres: >= 65 años
   - Se usa en regeneración de Claustro para excluir

3. **Permisos Duales**:
   - Modelo: Validaciones en `clean()` + `save()`
   - Serializer: Validadores adicionales
   - Vista: Permission classes

4. **Claustro**:
   - Registros históricos de profesores por categoría
   - Se regenera con `regenerar_desde_usuarios` (POST)
   - Solo toma profesores activos y no jubilados
   - Fecha automática al regenerar (hoy)

## Estado Final

✅ **Backend completamente funcional**
✅ **Migraciones aplicadas**
✅ **Datos de prueba cargados**
✅ **Validaciones implementadas**
✅ **Permisos configurados**
✅ **Endpoint de Claustro con regeneración**

**Listo para:**
- Frontend integration
- API consumption
- End-to-end testing
