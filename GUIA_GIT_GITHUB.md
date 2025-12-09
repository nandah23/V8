# 🚀 Instrucciones para Subir Código a GitHub

## ✅ Configuración Completada

He adaptado todos los archivos de git para usar tu usuario `nandah23` en lugar de `leonardocolas`.

---

## 📋 Cambios Realizados

### 1. **Frontend**
- ✅ Actualizado `.git/config` en `rrhh_frontend/`
- URL anterior: `https://github.com/leonardocolas/frontend.git`
- URL nueva: `https://github.com/nandah23/frontend.git`
- Usuario configurado: `nandah23`

### 2. **Backend**
- ✅ Inicializado repositorio git en `rrhh_backend/`
- ✅ Creado archivo `.gitignore` específico para Django
- ✅ Configurado usuario: `nandah23`
- URL remota: `https://github.com/nandah23/backend.git`

---

## 🔧 Pasos para Subir el Código

### Paso 1: Crear Repositorios en GitHub

1. Ve a https://github.com/new
2. Crea repositorio **`frontend`** (público o privado)
3. Crea repositorio **`backend`** (público o privado)

**No inicialices los repositorios con README, .gitignore ni licencia** (ya tenemos nuestros archivos)

---

### Paso 2: Subir el Frontend

```bash
# Navega al directorio del frontend
cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8\rrhh_frontend"

# Verifica el estado
git status

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit: RRHH Frontend con React, Router y Material-UI"

# Sube al repositorio remoto
git push -u origin master
```

---

### Paso 3: Subir el Backend

```bash
# Navega al directorio del backend
cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8\rrhh_backend"

# Verifica el estado
git status

# Agrega todos los archivos (respeta .gitignore)
git add .

# Crea el primer commit
git commit -m "Initial commit: RRHH Backend con Django, DRF y PostgreSQL"

# Sube al repositorio remoto
git push -u origin master
```

---

## ⚠️ Nota Importante sobre .env

El archivo `.env` contiene credenciales. Dos opciones:

### Opción A: No subir credenciales (RECOMENDADO para producción)
```bash
# En rrhh_backend/.gitignore ya está incluido:
# .env

# Crear un archivo de ejemplo sin credenciales
# .env.example
DB_ENGINE=django.db.backends.postgresql
DB_NAME=rrhh_suite
DB_USER=postgres
DB_PASSWORD=<your_password_here>
DB_HOST=localhost
DB_PORT=5432
```

### Opción B: Subir .env (Para desarrollo local)
Si quieres subir el `.env` actual:
```bash
# En rrhh_backend/.gitignore, comenta la línea .env
# # .env
```

**Se recomienda Opción A para seguridad.**

---

## 🔑 Autenticación en GitHub

### Si usas HTTPS (requiere token personal)

1. Ve a https://github.com/settings/tokens
2. Crea un "Personal Access Token" con permisos `repo`
3. Guarda el token en un lugar seguro
4. Al hacer `git push`, usa:
   - Usuario: `nandah23`
   - Contraseña: (pega el token)

### Si usas SSH (recomendado)

1. Genera clave SSH:
```bash
ssh-keygen -t ed25519 -C "tu_email@example.com"
```

2. Agrega la clave pública a GitHub:
   - Copia: `type %userprofile%\.ssh\id_ed25519.pub`
   - Ve a https://github.com/settings/keys
   - Agrega la clave

3. Configura git para usar SSH:
```bash
cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8\rrhh_frontend"
git remote set-url origin git@github.com:nandah23/frontend.git

cd "d:\Universidad\4to Año\Tesis\Versiones Sist\V8\rrhh_backend"
git remote set-url origin git@github.com:nandah23/backend.git
```

---

## 📊 Estado de Configuración

### Frontend
```
Repositorio: rrhh_frontend
URL remota: https://github.com/nandah23/frontend.git
Usuario: nandah23
Estado: Listo para subir
```

### Backend
```
Repositorio: rrhh_backend
URL remota: https://github.com/nandah23/backend.git
Usuario: nandah23
Estado: Listo para subir
```

---

## 🐛 Troubleshooting

### Error: "fatal: remote origin already exists"
```bash
# Elimina el remote anterior
git remote remove origin

# Agrega el nuevo
git remote add origin https://github.com/nandah23/frontend.git
```

### Error: "remote: Repository not found"
- Verifica que los repositorios existan en GitHub
- Comprueba que la URL sea correcta
- Verifica tu autenticación

### Error: "fatal: not a git repository"
```bash
# Reinicializa el repositorio
git init
git remote add origin <URL>
```

### Git no reconoce archivos después de agregar .gitignore
```bash
# Limpia el cache de git
git rm -r --cached .
git add .
git commit -m "Update gitignore"
```

---

## ✅ Checklist Antes de Subir

- [ ] Creaste repositorios `frontend` y `backend` en GitHub
- [ ] Verificaste que `.git/config` tiene las URLs correctas
- [ ] Revisaste los archivos a subir con `git status`
- [ ] Excluiste `.env` o creaste `.env.example`
- [ ] Hiciste el commit inicial
- [ ] Configuraste autenticación (HTTPS token o SSH)
- [ ] Ejecutaste `git push -u origin master`

---

## 📞 Comandos Rápidos

```bash
# Ver estado del repositorio
git status

# Ver archivos a subir
git add -A && git status

# Hacer commit
git commit -m "Mensaje descriptivo"

# Subir cambios
git push origin master

# Ver histórico
git log --oneline

# Ver configuración
git config --list
```

---

## 🎯 Próximos Pasos

1. ✅ Subir código a GitHub
2. Actualizar URLs en cualquier documentación
3. Proteger ramas importantes (requiere merge reviews)
4. Configurar webhooks si usas CI/CD
5. Agregar colaboradores si es necesario

**¡Tu código está listo para subirse a GitHub!** 🚀
