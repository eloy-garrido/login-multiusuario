# Sistema de Login Multi-Usuario

Sistema de autenticación con dos roles de usuario (Administrador y Estudiante) desarrollado con Angular 20 y Node.js/Express, utilizando MongoDB como base de datos.

## 📋 Descripción General

Aplicación web que implementa un sistema de login con roles diferenciados, donde los usuarios pueden acceder a interfaces específicas según su tipo de cuenta. El sistema utiliza autenticación basada en sesiones con persistencia local.

**Usuarios de prueba:**
- Administrador: `admin` / `admin123`
- Estudiante: `student` / `student123`

## 🏗️ Arquitectura

```
├── backend/          # API REST (Node.js + Express + MongoDB)
└── frontend/         # SPA (Angular 20 + TypeScript)
```

### Backend
- **Servidor:** Express.js con CORS configurado
- **Base de datos:** MongoDB con Mongoose ODM
- **Autenticación:** Validación simple de credenciales
- **API:** Endpoints REST para login y health check

### Frontend
- **Framework:** Angular 20 con componentes standalone
- **Estado:** Angular Signals para gestión reactiva
- **Rutas:** Protección basada en roles
- **Persistencia:** localStorage para sesiones

## 🌐 Servicios de Despliegue

### Vercel (Frontend)
**Descripción:** Plataforma de despliegue para aplicaciones frontend con integración Git automática.

**Configuración:**
- Archivo: `frontend/vercel.json`
- Build automático desde repositorio
- Detección automática de Angular
- CDN global integrado

**Uso:**
```json
{
  "buildCommand": "ng build --configuration production",
  "outputDirectory": "dist/frontend/browser",
  "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
}
```

**Variables de entorno:** Configuradas en `environment.prod.ts`

### Render (Backend)
**Descripción:** Plataforma cloud para APIs y servicios backend con despliegue automático desde Git.

**Configuración:**
- Detección automática de Node.js
- Variables de entorno en dashboard
- SSL automático
- Logs en tiempo real

**Variables requeridas:**
- `MONGODB_URI`: Conexión a MongoDB Atlas
- `PORT`: Configurado automáticamente por Render

### MongoDB Atlas
**Descripción:** Base de datos MongoDB como servicio en la nube con clusters distribuidos globalmente.

**Configuración:**
- Cluster gratuito disponible
- Whitelist de IPs automática
- Conexión via URI string
- Backups automáticos

**Esquema de datos:**
```javascript
// Colección: users
{
  username: String,  // Identificador único
  password: String,  // Credencial (sin hash en demo)
  role: String,      // "admin" | "student"
  name: String       // Nombre completo
}
```

## 🔧 Configuración de Entornos

### Desarrollo
```typescript
// frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Producción
```typescript
// frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.onrender.com/api'
};
```

### Variables Backend
```env
# backend/.env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=3000
```

## 📡 API Endpoints

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/api/health` | Estado del servidor | `{status: 'ok'}` |
| POST | `/api/login` | Autenticación | `{success: boolean, user?: User}` |

## 🚀 Despliegue

### Opción 1: Monorepo (Actual)
- Un solo repositorio con ambas aplicaciones
- Configuración manual requerida
- Posibles conflictos de detección automática

### Opción 2: Repositorios Separados (Recomendado)
- **Frontend:** Repositorio independiente para Vercel
- **Backend:** Repositorio independiente para Render
- Detección automática de frameworks
- Builds más eficientes
- Configuración simplificada

## 🔒 Consideraciones de Seguridad

- **CORS:** Configurado para orígenes específicos
- **Validación:** Campos requeridos en frontend y backend
- **Sesiones:** Persistencia local con limpieza en logout
- **Producción:** Implementar hash de contraseñas y JWT

## 📦 Dependencias Principales

### Backend
- `express`: Framework web
- `mongoose`: ODM para MongoDB
- `cors`: Políticas de origen cruzado
- `dotenv`: Variables de entorno

### Frontend
- `@angular/core`: Framework principal
- `@angular/common`: Módulos comunes
- `@angular/forms`: Formularios reactivos
- `rxjs`: Programación reactiva

---

**Stack:** Angular 20 + Node.js + MongoDB | **Deploy:** Vercel + Render + Atlas