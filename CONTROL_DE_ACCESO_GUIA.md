# Guía de Control de Acceso por Cargo - Frontend

## Descripción General

El sistema implementa control de acceso basado en **cargo** del usuario autenticado. Todos los módulos y funcionalidades se filtran según el `cargo` del usuario logueado.

## Estructura de Cargos

Existen 4 cargos en el sistema:

### 1. **Administrador** (`administrador`)
- **Módulos Visibles**: Todos (inicio, personal, áreas, condecoraciones, incentivos, claustros, solicitudes, distribuciones)
- **Permisos**: 
  - Ver y editar usuarios de todos los cargos
  - Acceso completo a todas las funcionalidades
  - Puede crear, editar y eliminar cualquier recurso

### 2. **Jefe de Área** (`jefe_area`)
- **Módulos Visibles**: inicio, personal, áreas, condecoraciones, incentivos, solicitudes, distribuciones
- **Módulos NO Visibles**: claustros
- **Permisos**:
  - Ver y editar solo empleados de su área
  - Acceso limitado a recursos específicos
  - No puede ver datos de claustro

### 3. **Especialista RRHH** (`especialista_rrhh`)
- **Módulos Visibles**: inicio, personal, áreas, condecoraciones, incentivos, claustros, distribuciones
- **Módulos NO Visibles**: solicitudes
- **Permisos**:
  - Ver y editar empleados
  - Acceso a datos de claustro
  - No puede ver solicitudes

### 4. **Empleado** (`empleado`)
- **Módulos Visibles**: Ninguno (solo puede ver página de inicio)
- **Permisos**: Mínimos, solo visualización de perfil

## Arquitectura Implementada

### 1. Hook Principal: `useAccessControl.js`

**Ubicación**: `src/shared/hooks/useAccessControl.js`

**Propósito**: Centralizar toda la lógica de control de acceso

**Métodos principales**:

```javascript
const {
  cargo,                    // Cargo del usuario actual
  getVisibleRoles,         // Obtiene cargos que puede ver/editar
  canViewRole,             // Verifica si puede ver un cargo específico
  getVisibleAreas,         // Obtiene áreas visibles
  canViewArea,             // Verifica si puede ver un área
  getAccessMessage         // Mensaje descriptivo de permisos
} = useAccessControl()
```

**Ejemplo de uso**:

```javascript
import { useAccessControl } from '../../shared/hooks/useAccessControl'

export default function MyComponent() {
  const { getVisibleRoles, canViewRole, getAccessMessage } = useAccessControl()
  
  // Ver cargos disponibles para el usuario actual
  const visibleRoles = getVisibleRoles()
  // Si es administrador: ['administrador', 'jefe_area', 'especialista_rrhh', 'empleado']
  // Si es jefe_area: ['empleado']
  
  // Verificar si puede ver un cargo específico
  if (canViewRole('empleado')) {
    // Mostrar empleados
  }
  
  // Mostrar mensaje de acceso
  console.log(getAccessMessage())
  // Ejemplo: "Solo puedes ver elementos de tu área (Ingeniería)."
}
```

### 2. Contexto: `UserContext.jsx`

**Ubicación**: `src/shared/context/UserContext.jsx`

**Proporciona**:
- `user`: Datos del usuario autenticado, incluyendo `cargo`
- `setUser`: Para actualizar datos del usuario

**Uso**:

```javascript
import { UserContext } from '../../shared/context/UserContext'

const { user } = useContext(UserContext)
console.log(user.cargo) // 'administrador', 'jefe_area', 'especialista_rrhh', o 'empleado'
```

### 3. Hook de Módulos: `useModuleAccess.js`

**Ubicación**: `src/shared/hooks/useModuleAccess.js`

**Propósito**: Controlar qué módulos son visibles según el cargo

**Ejemplo**:

```javascript
import { useModuleAccess } from '../../shared/hooks/useModuleAccess'

export default function Navbar() {
  const { hasAccess, cargo, allowedModules } = useModuleAccess()
  
  // Verificar si el usuario puede acceder a un módulo
  if (hasAccess('personal')) {
    // Mostrar enlace a módulo personal
  }
  
  // Ver todos los módulos permitidos
  console.log(allowedModules)
}
```

## Patrones de Implementación

### Patrón 1: Filtrado de Listas

**Ubicación**: Componentes tipo `*List.jsx` (UsuariosList, AreasList, etc.)

**Implementación**:

```javascript
import { useAccessControl } from '../../shared/hooks/useAccessControl'

export default function UsuariosList() {
  const { getVisibleRoles, getAccessMessage } = useAccessControl()
  
  useEffect(() => {
    // Obtener todos los datos del backend
    const response = await api.get('/usuarios/')
    
    // Filtrar según los cargos que el usuario puede ver
    const visibleRoles = getVisibleRoles()
    const filtered = response.data.filter(u => visibleRoles.includes(u.cargo))
    setUsuarios(filtered)
  }, [])
  
  return (
    <>
      <Alert severity="info">{getAccessMessage()}</Alert>
      {/* Tabla con usuarios filtrados */}
    </>
  )
}
```

### Patrón 2: Control de Formularios

**Ubicación**: Componentes tipo `*Form.jsx` (UsuarioForm, AreaForm, etc.)

**Implementación**:

```javascript
import { useAccessControl } from '../../shared/hooks/useAccessControl'

export default function UsuarioForm() {
  const { canViewRole, getVisibleRoles } = useAccessControl()
  const [existingUserCargo, setExistingUserCargo] = useState(null)
  
  // Verificar permisos para editar
  const canEditUser = () => {
    if (!id) return true // Crear nuevo
    if (existingUserCargo && !canViewRole(existingUserCargo)) {
      return false // No puede editar usuarios de otros cargos
    }
    return true
  }
  
  // Obtener opciones disponibles
  const getAvailableCargos = () => {
    const visibleRoles = getVisibleRoles()
    return [
      { value: 'administrador', label: 'Administrador' },
      // ... solo incluir si está en visibleRoles
    ].filter(c => visibleRoles.includes(c.value))
  }
  
  if (!canEditUser()) {
    return <Alert severity="error">No tienes permisos para editar este usuario.</Alert>
  }
  
  return (
    <Select>
      {getAvailableCargos().map(c => <MenuItem value={c.value}>{c.label}</MenuItem>)}
    </Select>
  )
}
```

### Patrón 3: Visibilidad de Módulos

**Ubicación**: `Navbar.jsx`, `Home.jsx`

**Implementación**:

```javascript
import { useModuleAccess } from '../../shared/hooks/useModuleAccess'

export default function Navbar() {
  const { hasAccess, allowedModules } = useModuleAccess()
  
  return (
    <nav>
      {hasAccess('personal') && <Link to="/usuarios">Personal</Link>}
      {hasAccess('areas') && <Link to="/areas">Áreas</Link>}
      {hasAccess('claustros') && <Link to="/claustros">Claustros</Link>}
      {/* ... más módulos */}
    </nav>
  )
}
```

## Reglas de Mapeo de Permisos

### Matriz de Acceso

```
                    | Administrador | Jefe Área | Especialista | Empleado
--------------------+---------------+-----------+--------------+----------
Ver Usuarios        | Todos         | Empleados | Empleados    | Ninguno
Ver Áreas           | Todas         | Su área   | Todas        | Ninguno
Ver Claustros       | Sí            | No        | Sí           | No
Ver Solicitudes     | Sí            | Sí        | No           | No
Ver Distribuciones  | Sí            | Sí        | Sí           | No
--------------------+---------------+-----------+--------------+----------
Crear Usuario       | Todos         | Empleados | Empleados    | No
Editar Usuario      | Todos         | Empleados | Empleados    | No
Crear Área          | Sí            | Sí        | Sí           | No
```

## Implementación en Nuevos Módulos

Cuando agregues un nuevo módulo, sigue estos pasos:

### 1. Actualizar `useModuleAccess.js`

```javascript
const moduleAccessMap = {
  administrador: ['inicio', 'personal', 'areas', 'condecoraciones', 'incentivos', 'claustros', 'solicitudes', 'distribuciones', 'tu_nuevo_modulo'],
  jefe_area: ['inicio', 'personal', 'areas', 'condecoraciones', 'incentivos', 'solicitudes', 'distribuciones', 'tu_nuevo_modulo'],
  // ...
}
```

### 2. En el Componente Lista

```javascript
import { useAccessControl } from '../../shared/hooks/useAccessControl'

export default function NuevoModuloList() {
  const { getAccessMessage } = useAccessControl()
  
  return (
    <>
      <Alert severity="info">{getAccessMessage()}</Alert>
      {/* Resto del componente */}
    </>
  )
}
```

### 3. En el Componente Formulario

```javascript
import { useAccessControl } from '../../shared/hooks/useAccessControl'

export default function NuevoModuloForm() {
  const { canViewRole } = useAccessControl()
  
  // Implementar verificación de permisos según sea necesario
}
```

## Consideraciones Importantes

1. **Backend es la Autoridad**: El frontend filtra para UX, pero el backend valida permisos reales
2. **No es Seguridad**: Este control es para UX, no es seguridad. El backend debe validar todos los accesos
3. **Cargo es Inmutable**: El cargo se obtiene del JWT después del login y se almacena en UserContext
4. **Filtrado Early**: Se filtra en componentes lista antes de renderizar
5. **Mensajes Claros**: Siempre mostrar mensajes de acceso denegado en lugar de componentes vacíos

## Testing

Para probar el control de acceso:

1. Login como **administrador**: Verás todos los módulos
2. Login como **jefe_area**: No verás claustros en navbar
3. Login como **especialista_rrhh**: No verás solicitudes en navbar
4. Login como **empleado**: Solo verás home

## Troubleshooting

**Problema**: Un módulo sigue visible para un cargo que no debería verlo
- **Solución**: Revisar `useModuleAccess.js` y `moduleAccessMap`

**Problema**: Se puede editar un usuario de otro cargo
- **Solución**: Verificar `canViewRole()` y `getVisibleRoles()` en el formulario

**Problema**: El cargo del usuario no se refleja
- **Solución**: Verificar que el JWT y UserContext se actualizan después del login

