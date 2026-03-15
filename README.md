# Equitty Landing

Landing de captura para la waitlist de Equitty, construida con Next.js, Prisma, PostgreSQL, `next-intl` y Resend.

## Configuracion

1. Copia `.env.example` a `.env` o `.env.local`.
2. Define al menos estas variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_BASE_URL`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`

## Desarrollo

Comandos principales:

```bash
pnpm.cmd dev
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test:unit
pnpm.cmd qa
```

### Dependencias

Este repo usa **solo `pnpm`** como gestor. Asegúrate de tener `pnpm` (por ejemplo activando `corepack enable pnpm`) y usa `pnpm install` para levantar el proyecto localmente; el lockfile vigente es `pnpm-lock.yaml` y ya no mantenemos `yarn.lock`. Después de instalar, puedes ejecutar los scripts anteriores (`pnpm.cmd ...`) y el entorno quedará listo para desarrollo, tests y QA.

## Migraciones Prisma

Si tu base ya existe y fue creada antes de usar Prisma Migrate en este proyecto, primero debes hacer baseline de las migraciones antiguas y luego aplicar las nuevas.

### Baseline inicial para una base existente

Ejecuta estos comandos una sola vez sobre la base que ya contiene la tabla `waitlist_signups`:

```bash
pnpm.cmd exec prisma migrate resolve --applied 20260113002438_init
pnpm.cmd exec prisma migrate resolve --applied 20260122104423_add_nationality
pnpm.cmd exec prisma migrate deploy
```

Eso marca las migraciones historicas como ya aplicadas y despues ejecuta solo las nuevas.

## Referidos

El sistema de referidos agrega:

- `referral_code` unico por usuario
- `referred_by_id` para guardar quien refirio al nuevo registro
- `referral_code_notified_at` para rastrear si ya se envio el correo con el codigo
- correo al nuevo usuario con su codigo
- correo al usuario dueño del codigo cuando alguien se registra con su referido

## Backfill de referral codes para usuarios sin codigo

Si tienes una base donde todavia hay usuarios con `referral_code = null`, usa este script.

### Simulacion

```bash
pnpm.cmd referrals:backfill -- --dry-run
```

### Ejecutar sin enviar correos

```bash
pnpm.cmd referrals:backfill -- --skip-email
```

### Ejecutar con correos

```bash
pnpm.cmd referrals:backfill
```

Este script:

- busca usuarios con `referral_code IS NULL`
- genera un codigo unico
- actualiza su registro
- si envia correo, tambien llena `referral_code_notified_at`

## Notificar usuarios existentes que ya tienen codigo

Si la migracion ya creo `referral_code` para todos los usuarios existentes pero aun no se les ha enviado email, este es el script correcto.

### Simulacion

```bash
pnpm.cmd referrals:notify-existing -- --dry-run
```

### Ejecutar envio real

```bash
pnpm.cmd referrals:notify-existing
```

Este script:

- busca usuarios con `referral_code IS NOT NULL`
- filtra solo los que tienen `referral_code_notified_at IS NULL`
- envia el correo con su codigo actual
- marca `referral_code_notified_at = now()`

## Recomendacion para produccion

Si la migracion ya lleno `referral_code` a todos los usuarios antiguos, el orden correcto es:

1. desplegar codigo
2. correr migraciones Prisma
3. verificar que existe `referral_code_notified_at`
4. correr:

```bash
pnpm.cmd referrals:notify-existing -- --dry-run
```

5. si todo se ve bien:

```bash
pnpm.cmd referrals:notify-existing
```

## Verificacion manual en SQL

### Usuarios sin referral code

```sql
SELECT COUNT(*) AS users_without_referral_code
FROM waitlist_signups
WHERE referral_code IS NULL;
```

### Usuarios pendientes de correo de referido

```sql
SELECT COUNT(*) AS users_pending_referral_notification
FROM waitlist_signups
WHERE referral_code IS NOT NULL
  AND referral_code_notified_at IS NULL;
```

### Ver algunos usuarios con su referral code

```sql
SELECT id, email, referral_code, referral_code_notified_at, referred_by_id, created_at
FROM waitlist_signups
ORDER BY created_at DESC
LIMIT 20;
```

### Ver la relacion de referidos

```sql
SELECT
  child.email AS referred_user,
  child.referral_code AS referred_user_code,
  parent.email AS referrer_user,
  parent.referral_code AS referrer_code
FROM waitlist_signups child
LEFT JOIN waitlist_signups parent
  ON parent.id = child.referred_by_id
ORDER BY child.created_at DESC
LIMIT 50;
```

## Notas

- `referrals:backfill` solo sirve para usuarios sin codigo.
- `referrals:notify-existing` sirve para usuarios con codigo pero sin correo enviado.
- Si `EMAIL_FROM` no esta configurado, los scripts con envio real fallaran.
- Si solo quieres validar codigo y estructura del proyecto, usa `pnpm.cmd qa`.
