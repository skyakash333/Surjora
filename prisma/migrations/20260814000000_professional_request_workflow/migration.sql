ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";

CREATE TYPE "OrderStatus" AS ENUM (
  'NEW',
  'REVIEWING',
  'QUOTED',
  'AWAITING_PAYMENT',
  'PAID',
  'FULFILLING',
  'COMPLETED',
  'CANCELLED',
  'SPAM'
);

ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order"
  ALTER COLUMN "status" TYPE "OrderStatus"
  USING (
    CASE "status"::text
      WHEN 'CONTACTED' THEN 'REVIEWING'
      WHEN 'WON' THEN 'COMPLETED'
      WHEN 'LOST' THEN 'CANCELLED'
      ELSE "status"::text
    END
  )::"OrderStatus";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'NEW';

DROP TYPE "OrderStatus_old";

ALTER TABLE "Order"
  ADD COLUMN "productTitle" TEXT,
  ADD COLUMN "quantity" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "contactPreference" TEXT NOT NULL DEFAULT 'email',
  ADD COLUMN "quotedPrice" DOUBLE PRECISION,
  ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'USD',
  ADD COLUMN "internalNotes" TEXT,
  ADD COLUMN "acceptedTermsAt" TIMESTAMP(3);
