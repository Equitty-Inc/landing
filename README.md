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

## Migraciones Prisma

Si tu base ya existe y fue creada antes de usar Prisma Migrate en este proyecto, primero debes hacer baseline de las migraciones antiguas y luego aplicar las nuevas.

### Baseline inicial para una base existente

Ejecuta estos comandos una sola vez sobre la base que ya contiene la tabla `waitlist_signups`:

```bash
pnpm.cmd exec prisma migrate resolve --applied 20260113002438_init
pnpm.cmd exec prisma migrate resolve --applied 20260122104423_add_nationality
pnpm.cmd exec prisma migrate deploy
```

Eso marca las migraciones historicas como ya aplicadas y despues ejecuta solo las nuevas, por ejemplo la de referidos.

## Referidos

El sistema de referidos agrega:

- `referral_code` unico por usuario
- `referred_by_id` para guardar quien refirio al nuevo registro
- correo al nuevo usuario con su codigo
- correo al usuario dueño del codigo cuando alguien se registra con su referido

## Backfill de referral codes para usuarios existentes

Si ya tienes usuarios registrados sin `referral_code`, no debes recrearlos ni borrar data. Usa el script de backfill, que solo procesa usuarios cuyo `referral_code` aun es `null`.

### 1. Probar sin tocar datos

```bash
pnpm.cmd referrals:backfill -- --dry-run
```

Esto solo muestra que usuarios serian actualizados y que codigo se les asignaria.

### 2. Ejecutar el backfill sin enviar correos

```bash
pnpm.cmd referrals:backfill -- --skip-email
```

Esto actualiza la base y genera el `referral_code`, pero no manda emails.

### 3. Ejecutar el backfill con correos

```bash
pnpm.cmd referrals:backfill
```

Esto:

- busca usuarios existentes sin `referral_code`
- genera un codigo unico para cada uno
- actualiza su registro
- envia un correo con una plantilla HTML basada en la actual indicando su codigo de referido

### Recomendacion de ejecucion

Para una base local o productiva, el orden recomendado es:

1. `pnpm.cmd referrals:backfill -- --dry-run`
2. revisar cuantos usuarios impacta
3. `pnpm.cmd referrals:backfill -- --skip-email` si quieres validar primero la data
4. `pnpm.cmd referrals:backfill` cuando quieras enviar correos reales

## Verificacion manual en SQL

Despues de correr la migracion o el backfill, puedes validar el estado directamente en PostgreSQL.

### Ver cuandos usuarios aun no tienen referral code

```sql
SELECT COUNT(*) AS users_without_referral_code
FROM waitlist_signups
WHERE referral_code IS NULL;
```

### Ver algunos usuarios con su referral code

```sql
SELECT id, email, referral_code, referred_by_id, created_at
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

## Rollback operativo

No hay un rollback automatico del backfill de correos, porque si ya se enviaron emails esos envios no pueden deshacerse. Si necesitas revertir solo la data en una base local o en una validacion controlada, hazlo manualmente y con mucho cuidado.

### Revertir referral codes generados sin borrar usuarios

```sql
UPDATE waitlist_signups
SET referral_code = NULL
WHERE referred_by_id IS NULL
  AND referral_code IS NOT NULL;
```

No uses ese query a ciegas en produccion si ya tienes usuarios nuevos registrados con el sistema de referidos activo, porque tambien podrias borrar codigos validos creados despues.

### Revertir una tanda especifica de usuarios

La forma segura es hacerlo por lista de correos o ids:

```sql
UPDATE waitlist_signups
SET referral_code = NULL
WHERE email IN (
  'user1@example.com',
  'user2@example.com'
);
```

### Recomendacion

- Antes de cualquier rollback, saca un backup de la tabla.
- Si ya mandaste correos, trata el rollback como una correccion puntual y no masiva.
- En produccion, revisa primero con `SELECT` y despues ejecuta el `UPDATE`.

## Notas

- El script de backfill es idempotente para este caso porque solo toma registros sin `referral_code`.
- Si `EMAIL_FROM` no esta configurado, el backfill con envio de correo fallara.
- Si solo quieres validar codigo y estructura del proyecto, usa `pnpm.cmd qa`.
