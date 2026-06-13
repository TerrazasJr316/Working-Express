# � Working Express - Backend Autenticación (Fase 2)

> **Documentación del Servicio de Autenticación (Auth)** para Working Express, un marketplace de servicios locales tipo "Uber de Oficios"

[![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=flat-square)](https://github.com)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=flat-square)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square)](https://www.mongodb.com/cloud/atlas)

---

## 📋 Contenido de este Documento

Esta documentación cubre **exclusivamente** el servicio de autenticación del backend de Working Express. Incluye:
- Instalación y configuración
- Endpoints disponibles con ejemplos
- Proceso de testing con Postman
- Notas importantes para el equipo de desarrollo
- Troubleshooting de errores comunes

---

## 🎯 ¿Qué es el Servicio de Autenticación?

El servicio de autenticación es la **puerta de entrada** a toda la aplicación. Gestiona:

✅ **Registro de usuarios** - Clientes, Técnicos y Administradores  
✅ **Validación de identidad** - Verificación por correo o SMS  
✅ **Login seguro** - Generación de tokens JWT  
✅ **Recuperación de contraseña** - Restablecimiento seguro  
✅ **Sesiones seguras** - Tokens con expiración de 30 días  

**Nota importante**: Sin esta fase, ningún otro endpoint funcionará.

---

## 📦 Requisitos Previos

### Software Obligatorio

```bash
✓ Node.js 18.0 o superior
✓ npm 9.0 o superior
✓ Git (para control de versiones)
✓ Postman (para testing - https://www.postman.com/)
✓ Un cliente SSH o terminal (Git Bash, WSL, Terminal nativa)
```

### Cuentas Externas Requeridas

Estas cuentas son esenciales para que el servicio de autenticación funcione:

| Servicio | Propósito | Link |
|----------|-----------|------|
| **MongoDB Atlas** | Base de datos en la nube | https://www.mongodb.com/cloud/atlas |
| **Gmail (OAuth2)** | Envío de correos de verificación | https://myaccount.google.com/apppasswords |
| **Twilio** | Envío de SMS de validación | https://www.twilio.com |

### Verificar Instalación

```bash
# Verificar versión de Node.js
node --version    # Debe ser v18.0.0 o superior

# Verificar npm
npm --version     # Debe ser 9.0.0 o superior
```

---

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
cd tu-carpeta-de-proyectos
git clone https://github.com/TerrazasJr316/Working-Express.git
cd Working-Express
```

### Paso 2: Configurar el Backend

```bash
# Navegar a la carpeta del backend
cd BackEnd-Working-Express

# Instalar todas las dependencias
npm install
```

### Paso 3: Configurar Variables de Entorno (.env)

En la raíz de la carpeta `BackEnd-Working-Express/`, crea un archivo llamado `.env` con el siguiente contenido:

```env
# ⚙️ CONFIGURACIÓN DEL SERVIDOR
PORT=3000
NODE_ENV=development

# 🗄️ BASE DE DATOS (MongoDB Atlas)
MONGO_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/working_express?appName=WorkingExpress

# 🔑 AUTENTICACIÓN (JWT)
JWT_SECRET=tu_secreto_super_seguro_y_largo_de_minimo_32_caracteres_aleatorios

# 📧 GMAIL (OAuth2 - Para envio de correos)
GMAIL_USER=tu_correo@gmail.com
GMAIL_CLIENT_ID=tu_client_id_de_google
GMAIL_CLIENT_SECRET=tu_client_secret_de_google
GMAIL_REFRESH_TOKEN=tu_refresh_token_de_google

# 📱 TWILIO (Para envio de SMS)
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_VERIFY_SID=tu_verify_service_id
```

**⚠️ SEGURIDAD CRÍTICA**: 
- **NUNCA** subas el archivo `.env` a GitHub
- Asegúrate de que `.env` esté en tu `.gitignore`
- Comparte estas credenciales solo a través de canales seguros (Slack privado, Telegram, etc.)

### Paso 4: Crear el Archivo `.env.example`

Para que otros desarrolladores sepan qué variables necesitan, crea `.env.example` en la raíz del backend:

```env
# ⚙️ CONFIGURACIÓN DEL SERVIDOR
PORT=3000
NODE_ENV=development

# 🗄️ BASE DE DATOS
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/working_express?appName=WorkingExpress

# 🔑 AUTENTICACIÓN
JWT_SECRET=tu_secreto_muy_largo_y_seguro

# 📧 GMAIL
GMAIL_USER=correo@gmail.com
GMAIL_CLIENT_ID=xxx.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=tu_secret
GMAIL_REFRESH_TOKEN=1//xxx

# 📱 TWILIO
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_VERIFY_SID=VAxxx
```

### Paso 5: Obtener las Credenciales (Tutorial Rápido)

#### 🔗 MongoDB Atlas

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. En "Database Access", crea un usuario
4. En "Network Access", permite `0.0.0.0/0` (para desarrollo)
5. Copia la cadena de conexión y reemplázala en `.env`

#### 📧 Gmail OAuth2

1. Ve a https://myaccount.google.com/apppasswords
2. Genera una contraseña de aplicación
3. En la consola de Google Cloud, obtén Client ID y Secret
4. Copia todos los valores en `.env`

**Nota**: Si no ves la opción de "Contraseñas de aplicación", activa la verificación en dos pasos primero.

#### 📱 Twilio

1. Ve a https://www.twilio.com/console
2. Copia `Account SID` y `Auth Token`
3. Crea un Verify Service para obtener `VERIFY_SID`
4. Copia todos los valores en `.env`

---

## ▶️ Ejecución del Servidor

```bash
# Inicia el servidor en modo desarrollo (con auto-reload)
npm run dev

# Deberías ver en la consola:
# =========================================
# 🚀 Servidor HTTP corriendo en puerto: 3000
# 🌍 Entorno actual: development
# =========================================
```

✅ **Si ves este mensaje**: El servidor está funcionando correctamente.

---

## 🔌 Endpoints de Autenticación

### 1️⃣ Registro de Usuario

**Endpoint**: `POST /api/auth/register`

Crea una nueva cuenta de usuario (Cliente o Técnico) y envía un código de verificación.

**Body (JSON)**:
```json
{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+527731472526",
    "password": "PasswordSeguro123!",
    "role": "CLIENTE",
    "validationMethod": "email"
}
```

**Parámetros**:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | String | Sí | Nombre completo del usuario |
| `email` | String | Sí | Email único (debe ser válido) |
| `phone` | String | Sí | Teléfono único con código de país (+52 para México) |
| `password` | String | Sí | Mínimo 6 caracteres |
| `role` | String | Sí | `CLIENTE`, `TRABAJADOR` o `ADMIN` |
| `validationMethod` | String | Sí | `email` o `sms` (por dónde enviar el código) |

**Respuesta Exitosa (201 Created)**:
```json
{
    "success": true,
    "message": "Usuario registrado. Código de verificación enviado."
}
```

**Errores Posibles**:

| Código | Mensaje |
|--------|---------|
| 400 | El correo o teléfono ya están registrados |
| 500 | Error al enviar el SMS/correo |

---

### 2️⃣ Verificar Cuenta

**Endpoint**: `POST /api/auth/verify-account`

Valida el código que el usuario recibió por correo o SMS. Sin esto, no puede hacer login.

**Body (JSON)**:
```json
{
    "identifier": "juan@example.com",
    "code": "123456",
    "validationMethod": "email"
}
```

**Parámetros**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `identifier` | String | El email o teléfono del usuario |
| `code` | String | El código de 6 dígitos recibido |
| `validationMethod` | String | `email` o `sms` (el mismo método usado en registro) |

**Respuesta Exitosa (200 OK)**:
```json
{
    "success": true,
    "message": "Cuenta verificada correctamente"
}
```

**Errores Posibles**:

| Código | Mensaje |
|--------|---------|
| 400 | Código inválido o expirado |
| 404 | Usuario no encontrado |

---

### 3️⃣ Login

**Endpoint**: `POST /api/auth/login`

Inicia sesión con email o teléfono. Devuelve un JWT token.

**Body (JSON)**:
```json
{
    "identifier": "juan@example.com",
    "password": "PasswordSeguro123!"
}
```

**Parámetros**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `identifier` | String | Email o teléfono (el backend detecta automáticamente cuál es) |
| `password` | String | La contraseña en texto plano |

**Respuesta Exitosa (200 OK)**:
```json
{
    "success": true,
    "data": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Juan Pérez",
        "role": "CLIENTE",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

**Errores Posibles**:

| Código | Mensaje |
|--------|---------|
| 401 | Credenciales inválidas |
| 403 | Por favor, verifica tu cuenta antes de iniciar sesión |
| 404 | Usuario no encontrado |

---

### 4️⃣ Olvidé mi Contraseña

**Endpoint**: `POST /api/auth/forgot-password`

Envía un código de recuperación al correo o al SMS del usuario.

**Body (JSON)**:
```json
{
    "identifier": "juan@example.com",
    "validationMethod": "sms"
}
```

**Parámetros**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `identifier` | String | Email o teléfono registrado |
| `validationMethod` | String | `email` o `sms` |

**Respuesta Exitosa (200 OK)**:
```json
{
    "success": true,
    "message": "Código de recuperación enviado"
}
```

---

### 5️⃣ Restablecer Contraseña

**Endpoint**: `POST /api/auth/reset-password`

Cambia la contraseña usando el código de recuperación.

**Body (JSON)**:
```json
{
    "identifier": "juan@example.com",
    "code": "123456",
    "newPassword": "NuevaPasswordSegura456!",
    "validationMethod": "email"
}
```

**Parámetros**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `identifier` | String | Email o teléfono |
| `code` | String | Código de 6 dígitos recibido |
| `newPassword` | String | La nueva contraseña |
| `validationMethod` | String | El método usado en `forgot-password` |

**Respuesta Exitosa (200 OK)**:
```json
{
    "success": true,
    "message": "Contraseña actualizada exitosamente"
}
```

---

## 🧪 Testing Completo en Postman

### Preparación

1. **Descarga Postman**: https://www.postman.com/downloads/
2. **Importa la colección** (si tu equipo compartió una) o sigue estos pasos manualmente
3. **Asegúrate de que el servidor está corriendo**: `npm run dev`

### Flujo de Prueba Completo

#### Test 1: Registro (Crear Usuario Nuevo)

1. Abre Postman
2. Crea una nueva petición `POST`
3. URL: `http://localhost:3000/api/auth/register`
4. Tab **Body** → **raw** → **JSON**
5. Copia y pega:

```json
{
    "name": "Josue Terrazas",
    "email": "terrazasjosue0@gmail.com",
    "phone": "+527731472526",
    "password": "Password123!",
    "role": "TRABAJADOR",
    "validationMethod": "email"
}
```

6. Click **Send**
7. ✅ Espera recibir `Status 201` y revisa tu bandeja de correos (o SPAM)

---

#### Test 2: Verificar Cuenta

1. **Revisa tu correo** y copia el código de 6 dígitos
2. Crea una nueva petición `POST`
3. URL: `http://localhost:3000/api/auth/verify-account`
4. Body:

```json
{
    "identifier": "terrazasjosue0@gmail.com",
    "code": "CÓDIGO_QUE_RECIBISTE",
    "validationMethod": "email"
}
```

5. Click **Send**
6. ✅ Deberías recibir `Status 200` con "Cuenta verificada correctamente"

---

#### Test 3: Login

1. Crea una nueva petición `POST`
2. URL: `http://localhost:3000/api/auth/login`
3. Body:

```json
{
    "identifier": "terrazasjosue0@gmail.com",
    "password": "Password123!"
}
```

4. Click **Send**
5. ✅ Copia el `token` que recibas (lo necesitarás para próximas peticiones autenticadas)

---

#### Test 4: Recuperación por SMS

1. Crea una nueva petición `POST`
2. URL: `http://localhost:3000/api/auth/forgot-password`
3. Body:

```json
{
    "identifier": "terrazasjosue0@gmail.com",
    "validationMethod": "sms"
}
```

4. Click **Send**
5. ✅ Espera 5-10 segundos a recibir un SMS en tu celular

---

#### Test 5: Restablecer Contraseña

1. **Revisa el SMS** que recibiste y copia el código
2. Crea una nueva petición `POST`
3. URL: `http://localhost:3000/api/auth/reset-password`
4. Body:

```json
{
    "identifier": "terrazasjosue0@gmail.com",
    "code": "CÓDIGO_DEL_SMS",
    "newPassword": "NuevaPassword2026!",
    "validationMethod": "sms"
}
```

5. Click **Send**
6. ✅ Deberías recibir `Status 200`

---

#### Test 6: Verificar Nueva Contraseña

Para confirmar que la contraseña cambió, intenta hacer login con la nueva:

1. Crea una nueva petición `POST`
2. URL: `http://localhost:3000/api/auth/login`
3. Body:

```json
{
    "identifier": "terrazasjosue0@gmail.com",
    "password": "NuevaPassword2026!"
}
```

4. Click **Send**
5. ✅ Deberías recibir un `token` nuevo

---

## 📝 Notas Importantes para el Equipo

### 1. Manejo Seguro de Credenciales

🔴 **NUNCA HAGAS ESTO**:
- No subas `.env` a GitHub
- No compartas credenciales en Slack público
- No pegues tokens en mensajes de texto

✅ **SIEMPRE HAZ ESTO**:
- Comparte credenciales por: DMs privados, Telegram, Bitwarden
- Usa `.env.example` como plantilla
- Regenera credenciales si alguien las ve accidentalmente

### 2. Códigos de Verificación

**⏰ Tiempo de vida**: Los códigos expiran en **15 minutos**

- Si tardas más de 15 min en ingresarlo, pide uno nuevo
- Los códigos son de un solo uso
- Después de usarlos, se eliminan automáticamente de la BD

### 3. Tokens JWT

**🔐 Propiedades del Token**:
- **Expiración**: 30 días
- **Uso**: Incluye en header `Authorization: Bearer TU_TOKEN`
- **No compartas**: El token tiene toda tu identidad

**Ejemplo en próximas peticiones autenticadas**:
```
Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Roles de Usuario

Existen 3 roles diferenciados:

| Rol | Permisos | Uso |
|-----|----------|-----|
| `CLIENTE` | Crear solicitudes de servicio | Persona que solicita ayuda |
| `TRABAJADOR` | Aceptar trabajos, actualizar ubicación | Técnico/Profesional |
| `ADMIN` | Acceso total al sistema | Administrador |

**Importante**: El rol se asigna en el registro y actualmente no se puede cambiar por API. Contáctame si necesitas cambiar un rol.

### 5. Validación por Email vs SMS

**📧 Email (Gmail)**:
- Más confiable
- Velocidad: 1-2 segundos
- Riesgo: El código puede verse en la bandeja
- Usado para: Registro y recuperación

**📱 SMS (Twilio)**:
- Muy seguro
- Velocidad: 5-10 segundos (a veces lento)
- Ventaja: Solo ves el código en el móvil
- Limitación: Necesita saldo en Twilio (cuesta dinero)

**Recomendación**: Usa email para testing rápido, SMS para producción.

### 6. Errores Comunes en Testing

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot POST /api/auth/register` | Ruta no encontrada | Verifica que el servidor esté corriendo |
| `Código inválido o expirado` | Pasaron más de 15 min | Pide un código nuevo |
| `El correo ya está registrado` | El usuario ya existe | Usa otro email |
| `Fallo al enviar el SMS` | Cuenta Twilio sin saldo | Recarga saldo o usa email |
| `TypeError: checkSMSCode is not defined` | Falta importar función | Revisa que imports estén correctos |

### 7. Estructura del Código (Arquitectura N-Tier)

Para que mantengas el orden y otros compañeros entiendan el código:

```
src/
├── routes/
│   └── auth.routes.js          # Define URLs (POST /register, etc)
├── controllers/
│   └── auth.controller.js       # Recibe peticiones y responde
├── services/
│   └── auth.service.js          # Lógica de negocio (encriptación, validación)
├── models/
│   └── User.model.js            # Esquema MongoDB
├── middlewares/
│   └── errorHandler.js          # Manejo global de errores
├── utils/
│   ├── email.helper.js          # Función para enviar correos
│   └── sms.helper.js            # Función para enviar SMS
├── config/
│   ├── db.js                    # Conexión a MongoDB
│   └── socket.js                # Configuración de WebSockets
└── app.js                        # Setup principal de Express
```

**Regla de Oro**: Cada carpeta tiene una responsabilidad clara. No mezcles lógica de negocio con enrutamiento.

### 8. Trabajo en Equipo (Git)

Cuando trabajes en esta rama:

```bash
# Asegúrate de estar en la rama correcta
git branch          # Verifica que estés en feature/auth

# Antes de hacer cambios
git pull origin feature/auth

# Después de cambios
git add .
git commit -m "feat: [descripción clara de tu cambio]"
git push origin feature/auth

# Abre un Pull Request en GitHub para que alguien lo revise
```

---

## 🆘 Troubleshooting (Solución de Problemas)

### Problema: "Cannot find module 'bcryptjs'"

**Causa**: Falta instalar dependencias

**Solución**:
```bash
npm install
```

---

### Problema: `MONGO_URI undefined`

**Causa**: El archivo `.env` no está siendo leído

**Solución**:
1. Verifica que el archivo se llama exactamente `.env` (no .env.txt)
2. Colócalo en la raíz de la carpeta `BackEnd-Working-Express`
3. Reinicia el servidor: `npm run dev`

---

### Problema: "Error: Invalid URI"

**Causa**: La cadena de conexión de MongoDB está mal formada

**Solución**:
- Verifica que en tu `.env` el `MONGO_URI` tenga este formato:
```
mongodb+srv://usuario:password@cluster.mongodb.net/database?appName=WorkingExpress
```
- Especialmente: Los dos puntos `:` entre usuario y password, el `@` y no espacios

---

### Problema: SMS no llega a mi celular

**Causa Más Probable**: Cuenta Twilio sin saldo o sin verificar números

**Soluciones**:
1. Verifica que tu cuenta Twilio tenga saldo (si es de prueba, es gratis pero limitado)
2. En Twilio Console, agrega tu número de celular a "Verified Caller IDs"
3. En el archivo `src/utils/sms.helper.js`, asegúrate de que `from` tenga tu número Twilio

---

### Problema: Correos no llegan

**Causa**: Gmail rechazando la conexión

**Soluciones**:
1. Activa verificación en dos pasos en tu cuenta Google
2. Genera una contraseña de aplicación (no uses tu contraseña normal)
3. En `GMAIL_REFRESH_TOKEN`, usa el token generado
4. Revisa la carpeta de SPAM

---

### Problema: Token expira muy rápido

**Verificación**:
Los tokens expiran en **30 días** por diseño. Si necesitas cambiar esto:

En `src/controllers/auth.controller.js`, línea del `jwt.sign()`:
```javascript
{ expiresIn: '30d' }  // Cambia '30d' a lo que necesites
```

---

## 📞 ¿Preguntas o Problemas?

Si tienes dudas o encuentras un error:

1. **Revisa primero esta documentación** - Muchas respuestas están aquí
2. **Revisa los logs del servidor** - Verás mensajes de error útiles
3. **Contacta al administrador** (Josue Terrazas) por Slack/Telegram
4. **Abre un Issue en GitHub** con: qué intentaste, qué error recibiste, y qué esperas

---

## 📚 Recursos Adicionales

- [Documentación de Express.js](https://expressjs.com/)
- [Mongoose Official Docs](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/)
- [MongoDB Atlas Setup](https://docs.mongodb.com/atlas/getting-started/)
- [Twilio SMS Docs](https://www.twilio.com/docs/sms)
- [Gmail OAuth2 Flow](https://developers.google.com/identity/protocols/oauth2)

---

## 📄 Licencia

Proyecto bajo licencia ISC. Usa libremente pero respeta los términos.

---

**Última actualización**: Junio 2026  
**Versión**: 1.0.0 - Backend Auth (Fase 2)  
**Rama**: `feature/auth`  
**Mantenedor**: Josue Terrazas (@TerrazasJr316)



# Copiar archivo de ejemplo
cp .env.example .env

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar en desarrollo (con hot reload)
npm run dev
```

**Backend disponible en**: `http://localhost:5000`

#### 4. Configurar Frontend Web

```bash
cd ../frontend-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

**Frontend Web disponible en**: `http://localhost:3000`

#### 5. Configurar Frontend Móvil

```bash
cd ../frontend-mobile

# Instalar dependencias
npm install

# Iniciar Expo (escanea el código QR con la app Expo Go)
npm start

# O simular en emulador Android/iOS
npm run android    # Android
npm run ios        # iOS (solo en macOS)
```

### ✅ Verificar que Todo Funciona

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend Web
cd frontend-web && npm start

# Terminal 3: Frontend Móvil
cd frontend-mobile && npm start
```

Deberías ver:
- 🟢 Backend ejecutándose en `http://localhost:5000`
- 🟢 Web ejecutándose en `http://localhost:3000`
- 🟢 Aplicación móvil en Expo

---

## 📚 Documentación

### Guías Detalladas

- [**CONTRIBUTING.md**](./CONTRIBUTING.md) - Guía completa de contribución, estructura de código y buenas prácticas
- [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) - Diseño arquitectónico del sistema
- [**API.md**](./docs/API.md) - Documentación completa de endpoints
- [**SETUP.md**](./docs/SETUP.md) - Guía detallada de configuración local

### Convenciones en Este Proyecto

#### 🌳 Ramas Git

Seguimos una estrategia de ramas clara y organizada:

- **`main`**: Rama de producción (código 100% estable)
- **`develop`**: Rama de integración (donde se fusionan features)
- **`feature/*`**: Nuevas funcionalidades (`feature/nombre-descriptivo`)
- **`fix/*`**: Correcciones de bugs (`fix/nombre-descriptivo`)

**Ver**: [Estrategia de Ramas](./CONTRIBUTING.md#-estrategia-de-ramas-git-flow-simplificado)

#### 📝 Commits

Usamos **Conventional Commits** para mensajes claros y semánticos:

```bash
git commit -m "feat(backend): agregar autenticación JWT"
git commit -m "fix(mobile): corregir crash en notificaciones"
```

**Ver**: [Commits Convencionales](./CONTRIBUTING.md#3️⃣-hacer-commits-frecuentes)

#### 🏗️ Estructura de Carpetas

Cada módulo (backend, web, mobile) tiene una estructura clara y consistente:

**Backend**:
```
backend/src/
├── models/      # Esquemas Mongoose
├── controllers/ # Lógica de rutas
├── routes/      # Definición de endpoints
├── middleware/  # Middleware personalizado
├── services/    # Lógica de negocio
└── utils/       # Funciones utilitarias
```

**Frontend**:
```
frontend-{web,mobile}/src/
├── components/  # Componentes reutilizables
├── pages/       # Páginas principales
├── hooks/       # Custom hooks
├── services/    # Llamadas a API
├── context/     # Estado global
└── types/       # Tipos TypeScript
```

**Ver**: [Estructura Completa](./CONTRIBUTING.md#-estructura-del-monorepositorio)

## 🛠️ Comandos Útiles

### Backend

```bash
cd backend

# Desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run build

# Validar tipos sin compilar
npm run type-check

# Ejecutar tests
npm test

# Ejecutar con coverage
npm run test:coverage

# Linter
npm run lint

# Iniciar en producción
npm start
```

### Frontend Web

```bash
cd frontend-web

# Desarrollo
npm start

# Build para producción
npm run build

# Eject (no recomendado)
npm run eject

# Linter
npm run lint
```

### Frontend Móvil

```bash
cd frontend-mobile

# Inicio con Expo
npm start

# Emulador Android
npm run android

# Emulador iOS (macOS)
npm run ios

# Build para producción
npm run build
```

### Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Eliminar todo incluyendo volúmenes
docker-compose down -v
```

---

## 📖 API Endpoints (Vista Rápida)

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token

### Trabajos/Tickets
- `GET /api/jobs` - Listar trabajos
- `GET /api/jobs/nearby` - Trabajos cercanos (para técnicos)
- `POST /api/jobs` - Crear nuevo trabajo
- `PUT /api/jobs/:id/status` - Actualizar estado

### Usuarios
- `GET /api/users/:id` - Obtener perfil
- `PUT /api/users/me/location` - Actualizar ubicación GPS
- `GET /api/users/me/ratings` - Ver calificaciones

**Ver documentación completa**: [API.md](./docs/API.md)

---

## 🤝 Contribuir al Proyecto

### Proceso de Contribución

1. **Crea una rama** desde `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nombre-descriptivo
   ```

2. **Hace tus cambios** y commitea con mensajes claros:
   ```bash
   git commit -m "feat(backend): agregar nuevo endpoint"
   ```

3. **Push y abre un Pull Request**:
   ```bash
   git push origin feature/nombre-descriptivo
   ```

4. **Espera revisión** y solicita cambios si es necesario

5. **Merge a `develop`** una vez aprobado

### Estándares de Código

- ✅ TypeScript con `strict: true`
- ✅ Nombres descriptivos y claros
- ✅ Funciones pequeñas (<30 líneas)
- ✅ Props tipadas en React
- ✅ Comentarios en lógica compleja
- ✅ Sin `any` en TypeScript (a menos que sea absolutamente necesario)
- ✅ Tests para funcionalidad crítica

**Guía completa**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📋 Variables de Entorno

### Backend (.env)

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/fixithub
NODE_ENV=development

# JWT
JWT_SECRET=tu-clave-secreta-super-segura-aqui
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Server
PORT=5000
HOST=localhost

# Socket.io
SOCKET_IO_CORS=http://localhost:3000
```

### Frontend Web (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Frontend Móvil (.env)

```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

## 🐛 Solución de Problemas

### MongoDB no se conecta

```bash
# Verifica que Docker está corriendo
docker ps

# Si no está, levántalo
docker-compose up -d

# Verifica los logs
docker-compose logs mongodb
```

### Puerto ya en uso

```bash
# Backend (5000)
lsof -i :5000
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>
```

## 📞 Contacto y Soporte

- 👨‍💻 **Tech Lead**: [Nombre del Lead]
- 📧 **Email**: [email del proyecto]
- 💬 **Chat del Equipo**: Discord/Slack
- 📝 **Tablero de Tareas**: GitHub Projects

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver [LICENSE](./LICENSE) para más detalles.

<div align="center">

### Hecho con ❤️ por el equipo de FixitHub

</div>
