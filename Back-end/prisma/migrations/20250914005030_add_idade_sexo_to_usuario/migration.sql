-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "idade" INTEGER,
ADD COLUMN     "sexo" TEXT,
ALTER COLUMN "tipo_usuario" SET DEFAULT 'comum';
