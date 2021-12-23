-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DEFAULT', 'BLACK');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('EXPENSES', 'INCOMES');

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_parent_category" INTEGER,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "id_icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "bank_account" (
    "id_bank_account" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "id_icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id_bank_account")
);

-- CreateTable
CREATE TABLE "currency" (
    "id_currency" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id_currency")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id_transaction" SERIAL NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_bank_account" INTEGER NOT NULL,
    "id_currency" INTEGER NOT NULL,
    "comment" TEXT,
    "money" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id_transaction")
);

-- CreateTable
CREATE TABLE "language" (
    "id_language" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id_language")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id_user_settings" INTEGER NOT NULL,
    "theme" "Theme" NOT NULL DEFAULT E'DEFAULT',
    "id_language" INTEGER NOT NULL,
    "id_currency" INTEGER NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id_user_settings")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_request" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_compound_id_key" ON "account"("compound_id");

-- CreateIndex
CREATE INDEX "providerAccountId" ON "account"("provider_account_id");

-- CreateIndex
CREATE INDEX "providerId" ON "account"("provider_id");

-- CreateIndex
CREATE INDEX "userId" ON "account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "session_access_token_key" ON "session"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_request_token_key" ON "verification_request"("token");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_id_parent_category_fkey" FOREIGN KEY ("id_parent_category") REFERENCES "category"("id_category") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_bank_account_fkey" FOREIGN KEY ("id_bank_account") REFERENCES "bank_account"("id_bank_account") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_currency_fkey" FOREIGN KEY ("id_currency") REFERENCES "currency"("id_currency") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_id_user_settings_fkey" FOREIGN KEY ("id_user_settings") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "language"("id_language") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_id_currency_fkey" FOREIGN KEY ("id_currency") REFERENCES "currency"("id_currency") ON DELETE RESTRICT ON UPDATE CASCADE;
