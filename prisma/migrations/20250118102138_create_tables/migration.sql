-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sample_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loop" (
    "id" SERIAL NOT NULL,
    "sample_id" INTEGER NOT NULL,
    "loop_number" INTEGER NOT NULL,
    "ias_loop_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "loop_id" INTEGER NOT NULL,
    "time_speed" INTEGER NOT NULL,
    "ias_time_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spatial" (
    "id" SERIAL NOT NULL,
    "time_id" INTEGER NOT NULL,
    "spatial_preset" INTEGER NOT NULL,
    "ias_spatial_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spatial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stem" (
    "id" SERIAL NOT NULL,
    "spatial_id" INTEGER NOT NULL,
    "stem_instrument" INTEGER NOT NULL,
    "ias_stem_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stem_pkey" PRIMARY KEY ("id")
);
