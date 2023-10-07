-- CreateTable
CREATE TABLE "user" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "details" (
    "username" TEXT NOT NULL,
    "parentNo" INTEGER NOT NULL,
    "email" TEXT,

    CONSTRAINT "details_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "details_email_key" ON "details"("email");
