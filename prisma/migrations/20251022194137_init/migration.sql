-- CreateTable
CREATE TABLE "Catagory" (
    "catagory_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Catagory_pkey" PRIMARY KEY ("catagory_id")
);
