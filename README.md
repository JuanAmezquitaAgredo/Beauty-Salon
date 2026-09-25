# Beauty Salon

Panel de administración de un salón de belleza (servicios, clientes, empleados y citas) hecho con Next.js 14.
Frontend y backend viven en el mismo proyecto: la API está en `src/app/api` y usa PostgreSQL mediante Prisma.

## Stack

- Next.js 14 (App Router) + styled-components
- next-auth (credenciales, sesión JWT) con contraseñas en bcrypt
- Prisma + PostgreSQL
- react-hook-form + yup (validación en cliente y servidor)

## Estructura del backend

| Ruta | Qué contiene |
| --- | --- |
| `prisma/schema.prisma` | Modelos: `User`, `Service`, `Client`, `Employee`, `Appointment` |
| `prisma/migrations/` | Migraciones SQL (se aplican con `prisma migrate deploy`) |
| `prisma/seed.mjs` | Usuario administrador + datos de ejemplo |
| `src/app/infrastucture/services/` | Lógica de negocio y acceso a datos |
| `src/app/infrastucture/validation/` | Validación de los cuerpos de las peticiones |
| `src/app/api/` | Endpoints REST |
| `src/middleware.ts` | Protege `/dashboard` y la API (401 sin sesión) |

### Endpoints

Todos, excepto el registro y los de auth, requieren sesión.

| Recurso | Crear (POST) | Obtener (GET) | Editar (PUT) | Eliminar (DELETE) |
| --- | --- | --- | --- | --- |
| Servicios | `/api/services/create` | `/api/services/getservice/:id` | `/api/services/edit/:id` | `/api/services/delete/:id` |
| Clientes | `/api/clients/create` | `/api/clients/getclients/:id` | `/api/clients/edit/:id` | `/api/clients/delete/:id` |
| Empleados | `/api/employees/create` | `/api/employees/getemployee/:id` | `/api/employees/edit/:id` | `/api/employees/delete/:id` |
| Citas | `/api/appointments/create` | `/api/appointments/getappointment/:id` | `/api/appointments/edit/:id` | `/api/appointments/delete/:id` |

- `GET /api/appointments/options`: clientes, servicios y empleados para los selects del formulario de citas.
- `POST /api/users/register` (público): registro de usuarios del panel.
- `/api/auth/*`: next-auth.

Los listados paginados se cargan directamente en las páginas del dashboard (componentes de servidor).
Los errores responden con el formato `{ status, code, errors: [{ message }] | [{ field, error }] }`.

## Desarrollo local

1. Crea una base de datos PostgreSQL. Puede ser gratis en [Neon](https://neon.tech) o un Postgres local.
2. Copia `.env.example` a `.env` y completa `DATABASE_URL`, `DATABASE_URL_UNPOOLED` y `NEXTAUTH_SECRET`.
3. Instala dependencias, aplica las migraciones y carga los datos:

```bash
npm install
npm run db:deploy
ADMIN_PASSWORD="TuClaveSegura" npm run db:seed   # PowerShell: $env:ADMIN_PASSWORD="TuClaveSegura"; npm run db:seed
npm run dev
```

Abre http://localhost:3000 e inicia sesión con `ADMIN_EMAIL` / `ADMIN_PASSWORD`, o crea una cuenta en `/register`.

Si cambias `prisma/schema.prisma`, crea una migración nueva con `npm run db:migrate -- --name descripcion`.

## Despliegue en Vercel + Neon

1. Importa el repositorio en [Vercel](https://vercel.com/new).
2. En el proyecto de Vercel ve a **Storage → Create Database → Neon (Postgres)** y conéctala al proyecto.
   Esto crea automáticamente `DATABASE_URL` y `DATABASE_URL_UNPOOLED`.
   Si creas la base directamente en Neon, agrega esas dos variables a mano: la URL con `-pooler` en la primera y la directa en la segunda.
3. En **Settings → Environment Variables** agrega `NEXTAUTH_SECRET` con un valor nuevo (`openssl rand -hex 32`).
   `NEXTAUTH_URL` no es necesaria en Vercel.
4. Despliega. El script `vercel-build` ejecuta `prisma migrate deploy` antes de `next build`, así que las tablas se crean solas.
5. Carga el usuario administrador y los datos de ejemplo una sola vez desde tu PC, apuntando `.env` a la misma base de Neon:

```bash
ADMIN_PASSWORD="TuClaveSegura" npm run db:seed
```

El seed es idempotente: si lo vuelves a ejecutar actualiza la contraseña del administrador y no duplica los datos de ejemplo.
