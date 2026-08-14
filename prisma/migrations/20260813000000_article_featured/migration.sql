ALTER TABLE "Article" ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Article_featured_idx" ON "Article"("featured");
