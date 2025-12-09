# 🚀 Proyecto RRHH - Estructura de Repositorio Único

## 📋 Configuración Completada

He adaptado el sistema para que **frontend** y **backend** sean parte de un único proyecto llamado **`rrhh`** en tu repositorio `nandah23`.

---

## 🏗️ Estructura del Proyecto

```
rrhh/ (Repositorio único en GitHub)
├── rrhh_frontend/        # Frontend React
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .gitignore
│
├── rrhh_backend/         # Backend Django
│   ├── core/             # Configuración Django
│   ├── usuario/          # App Usuario
│   ├── area/             # App Área
│   ├── manage.py
│   ├── requirements.txt  # (recomendado crear)
│   └── .gitignore
│
├── README.md             # Documentación general
├── GUIA_GIT_GITHUB.md    # Guía para subir a GitHub
└── .gitignore            # Gitignore raíz (opcional)
```

---

## ✅ Cambios Realizados

### 1. **URL del Repositorio Remoto**
Ambos repositorios ahora apuntan a:
```
https://github.com/nandah23/rrhh.git
```

### 2. **Archivo `.gitignore` en Backend**
✅ Creado con exclusiones para Django:
- `__pycache__/`
- `.env` (credenciales)
- `db.sqlite3` (database)
- `.venv/` (virtual env)
- Y más...

### 3. **Configuración de Git**
```
Frontend:  nandah23/rrhh
Backend:   nandah23/rrhh
Usuario:   nandah23
Email:     tu_email@example.com (cambia si es necesario)
```

---

## 🔧 Pasos para Subir a GitHub

### Paso 1: Crear Repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: **`rrhh`** (exactamente)
3. Descripción: "Sistema de Gestión RRHH con Django y React"
4. **No inicialices con README, .gitignore ni License**
5. Haz clic en "Create repository"

### Paso 2: Subir el Código

**Opción A - Desde la raíz del proyecto:**

```bash
# Navega a la raíz del proyecto
cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8"

# Inicializa git en la raíz
git init
git config user.email "tu_email@example.com"
git config user.name "nandah23"
git remote add origin https://github.com/nandah23/rrhh.git

# Agrega todos los archivos respetando .gitignore
git add .

# Crea el primer commit
git commit -m "Initial commit: Sistema RRHH con Django Backend y React Frontend"

# Sube al repositorio
git push -u origin master
```

**Opción B - Desde frontend (si prefieres mantener reposrios separados):**

```bash
# Frontend
cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8\rrhh_frontend"
git add .
git commit -m "Initial commit: RRHH Frontend"
git push -u origin master

# Backend
cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8\rrhh_backend"
git add .
git commit -m "Initial commit: RRHH Backend"
git push -u origin master
```

---

## 📝 Archivos de Configuración Git

### Frontend (`.git/config`)
```
[remote "origin"]
	url = https://github.com/nandah23/rrhh.git
[user]
	name = nandah23
	email = tu_email@example.com
```

### Backend (`.git/config`)
```
[remote "origin"]
	url = https://github.com/nandah23/rrhh.git
[user]
	name = nandah23
	email = tu_email@example.com
```

---

## 🚀 Comandos Útiles

```bash
# Ver estado de cambios
cd rrhh_frontend && git status
cd ../rrhh_backend && git status

# Ver configuración
git config --list

# Cambiar email (si es necesario)
git config user.email "tu_email@gmail.com"

# Cambiar remoto (si es necesario)
git remote set-url origin https://github.com/nandah23/rrhh.git

# Ver logs
git log --oneline

# Ver rama actual
git branch -a
```

---

## 📦 Estructura Recomendada para .gitignore Raíz

Si quieres un `.gitignore` a nivel de proyecto raíz:

```gitignore
# Virtual Environments
.venv/
venv/
env/
ENV/

# Node modules
node_modules/
npm-debug.log
yarn-error.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local

# Logs
*.log

# Build outputs
dist/
build/
*.egg-info/
__pycache__/

# Database
*.sqlite
*.sqlite3
```

---

## 🔄 Flujo de Trabajo Recomendado

### Para Desarrollar:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/nandah23/rrhh.git
   cd rrhh
   ```

2. **Instalar dependencias:**
   ```bash
   # Frontend
   cd rrhh_frontend
   npm install
   
   # Backend
   cd ../rrhh_backend
   pip install -r requirements.txt
   ```

3. **Hacer cambios:**
   ```bash
   # Crear rama para tu feature
   git checkout -b feature/nueva-funcionalidad
   
   # Hacer cambios en frontend y/o backend
   # ...
   
   # Confirmar cambios
   git add .
   git commit -m "Add: nueva funcionalidad"
   
   # Subir a GitHub
   git push origin feature/nueva-funcionalidad
   ```

4. **Pull Request:**
   - Ve a GitHub
   - Haz Pull Request a `master`
   - Revisa los cambios
   - Merge cuando esté listo

---

## 📋 Checklist Final

- [ ] Creaste repositorio `rrhh` en GitHub (https://github.com/nandah23/rrhh)
- [ ] Las URLs remotas apuntan a `https://github.com/nandah23/rrhh.git`
- [ ] Usuario configurado como `nandah23`
- [ ] `.gitignore` configurado correctamente
- [ ] Hiciste `git add .` para agregar todos los archivos
- [ ] Creaste el primer commit
- [ ] Ejecutaste `git push -u origin master`
- [ ] Verificaste en GitHub que el código está subido

---

## ⚠️ Notas Importantes

### Archivo `.env`
Está excluido de git por seguridad. Para que otros desarrolladores lo usen:

1. Crea `.env.example` en `rrhh_backend/`:
   ```
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=rrhh_suite
   DB_USER=postgres
   DB_PASSWORD=<your_password>
   DB_HOST=localhost
   DB_PORT=5432
   ```

2. Documenta en `rrhh_backend/README.md` cómo crear el `.env` real

### Credenciales de GitHub

**HTTPS:**
- Usa Personal Access Token (Settings → Developer settings → Tokens)
- Usuario: `nandah23`
- Contraseña: (pega el token)

**SSH (Recomendado):**
```bash
# Generar clave
ssh-keygen -t ed25519 -C "tu_email@example.com"

# Agregar a GitHub (Settings → SSH and GPG keys)

# Actualizar remoto
git remote set-url origin git@github.com:nandah23/rrhh.git
```

---

## 🎯 Próximos Pasos

1. ✅ Crear repositorio `rrhh` en GitHub
2. ✅ Subir el código con `git push`
3. ✅ Verificar que todo está en GitHub
4. Configurar protección de rama `master` (opcional)
5. Agregar colaboradores (si es necesario)
6. Configurar CI/CD (GitHub Actions, optional)

---

## 📞 Soporte

Si tienes problemas con git:

```bash
# Verificar remoto
git remote -v

# Cambiar remoto si es necesario
git remote remove origin
git remote add origin https://github.com/nandah23/rrhh.git

# Resetear si todo falla
git reset --hard origin/master
```

**¡Tu proyecto RRHH está listo para GitHub!** 🚀
