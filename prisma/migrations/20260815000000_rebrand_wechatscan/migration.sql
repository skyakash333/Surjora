ALTER TABLE "Article"
ALTER COLUMN "author" SET DEFAULT 'Wechatscan Team';

UPDATE "Article"
SET "author" = 'Wechatscan Team'
WHERE "author" = 'Surjora Team';

ALTER TABLE "Settings"
ALTER COLUMN "siteName" SET DEFAULT 'Wechatscan';

UPDATE "Settings"
SET "siteName" = 'Wechatscan'
WHERE "siteName" = 'Surjora';
