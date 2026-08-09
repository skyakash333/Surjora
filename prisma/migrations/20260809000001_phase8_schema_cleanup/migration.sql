-- AlterEnum
BEGIN;
CREATE TYPE "ArticleFormat_new" AS ENUM ('BLOCKS');
ALTER TABLE "Article" ALTER COLUMN "contentFormat" DROP DEFAULT;
ALTER TABLE "Article" ALTER COLUMN "contentFormat" TYPE "ArticleFormat_new" USING ("contentFormat"::text::"ArticleFormat_new");
ALTER TYPE "ArticleFormat" RENAME TO "ArticleFormat_old";
ALTER TYPE "ArticleFormat_new" RENAME TO "ArticleFormat";
DROP TYPE "ArticleFormat_old";
ALTER TABLE "Article" ALTER COLUMN "contentFormat" SET DEFAULT 'BLOCKS';
COMMIT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "coverImageId" TEXT;
