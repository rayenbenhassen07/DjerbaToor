-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100),
    "reservation_date" TIMESTAMP(0) NOT NULL,
    "remarque" TEXT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "options" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
