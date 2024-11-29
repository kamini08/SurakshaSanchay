-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COMMUNICATION_DEVICES', 'COMPUTER_AND_IT_EQUIPMENT', 'NETWORKING_EQUIPMENT', 'SURVEILLANCE_AND_TRACKING', 'VEHICLE_AND_ACCESSORIES', 'PROTECTIVE_GEAR', 'FIREARMS', 'FORENSIC', 'MEDICAL_FIRST_AID', 'OFFICE_SUPPLIES');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'INCHARGE', 'USER');

-- CreateEnum
CREATE TYPE "IssuanceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MaintenanceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'DISCARDED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "govId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" TEXT,
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "phone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "location" TEXT,
    "condition" TEXT NOT NULL DEFAULT 'new',
    "acquisitionDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "price" DOUBLE PRECISION,
    "supplier" TEXT,
    "assignedTo" TEXT,
    "returnDate" TEXT,
    "lastInspectionDate" TIMESTAMP(3),
    "maintenanceSchedule" TEXT,
    "maintenanceCharge" DOUBLE PRECISION,
    "issuedTo" TEXT,
    "userId" TEXT,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuanceRequest" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "isDamaged" BOOLEAN DEFAULT false,
    "status" "IssuanceStatus" NOT NULL DEFAULT 'PENDING',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "issueDescription" TEXT NOT NULL,
    "resolutionDetails" TEXT,
    "discardReason" TEXT,

    CONSTRAINT "IssuanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "technicianId" TEXT,
    "status" "MaintenanceStatus" NOT NULL DEFAULT 'PENDING',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "issueDescription" TEXT NOT NULL,
    "resolutionDetails" TEXT,
    "discardReason" TEXT,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationDevice" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "frequencyRange" TEXT,
    "batteryType" TEXT,
    "connectivity" TEXT,

    CONSTRAINT "CommunicationDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComputerAndITEquipment" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "processor" TEXT,
    "RAM" TEXT,
    "storage" TEXT,
    "OS" TEXT,

    CONSTRAINT "ComputerAndITEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetworkingEquipment" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "bandwidth" TEXT,
    "ports" TEXT,
    "protocols" TEXT,

    CONSTRAINT "NetworkingEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveillanceAndTracking" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "cameraResolution" TEXT,
    "nightVision" BOOLEAN NOT NULL DEFAULT false,
    "GPSAccuracy" TEXT,

    CONSTRAINT "SurveillanceAndTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleAndAccessories" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "vehicleType" TEXT,
    "makeAndModel" TEXT,
    "licensePlate" TEXT,
    "engineCapacity" TEXT,
    "accessories" TEXT[],

    CONSTRAINT "VehicleAndAccessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProtectiveGear" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "protectionLevel" TEXT,
    "size" TEXT,
    "material" TEXT,

    CONSTRAINT "ProtectiveGear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Firearm" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "caliber" TEXT,
    "ammoType" TEXT,
    "serialNumber" TEXT,
    "licenseDetails" TEXT,

    CONSTRAINT "Firearm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForensicEquipment" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "usageType" TEXT,
    "sensitivity" TEXT,
    "storageRequirements" TEXT,

    CONSTRAINT "ForensicEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalFirstAid" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "dosage" TEXT,
    "storageConditions" TEXT,

    CONSTRAINT "MedicalFirstAid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeSupply" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "itemType" TEXT,
    "dimensions" TEXT,
    "material" TEXT,

    CONSTRAINT "OfficeSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inchargeId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InventoryItemToIssuanceRequest" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_govId_key" ON "User"("govId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_itemId_key" ON "InventoryItem"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunicationDevice_inventoryItemId_key" ON "CommunicationDevice"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ComputerAndITEquipment_inventoryItemId_key" ON "ComputerAndITEquipment"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "NetworkingEquipment_inventoryItemId_key" ON "NetworkingEquipment"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "SurveillanceAndTracking_inventoryItemId_key" ON "SurveillanceAndTracking"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleAndAccessories_inventoryItemId_key" ON "VehicleAndAccessories"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ProtectiveGear_inventoryItemId_key" ON "ProtectiveGear"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Firearm_inventoryItemId_key" ON "Firearm"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ForensicEquipment_inventoryItemId_key" ON "ForensicEquipment"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalFirstAid_inventoryItemId_key" ON "MedicalFirstAid"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "OfficeSupply_inventoryItemId_key" ON "OfficeSupply"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "_InventoryItemToIssuanceRequest_AB_unique" ON "_InventoryItemToIssuanceRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_InventoryItemToIssuanceRequest_B_index" ON "_InventoryItemToIssuanceRequest"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuanceRequest" ADD CONSTRAINT "IssuanceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationDevice" ADD CONSTRAINT "CommunicationDevice_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComputerAndITEquipment" ADD CONSTRAINT "ComputerAndITEquipment_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NetworkingEquipment" ADD CONSTRAINT "NetworkingEquipment_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveillanceAndTracking" ADD CONSTRAINT "SurveillanceAndTracking_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleAndAccessories" ADD CONSTRAINT "VehicleAndAccessories_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProtectiveGear" ADD CONSTRAINT "ProtectiveGear_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firearm" ADD CONSTRAINT "Firearm_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForensicEquipment" ADD CONSTRAINT "ForensicEquipment_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalFirstAid" ADD CONSTRAINT "MedicalFirstAid_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfficeSupply" ADD CONSTRAINT "OfficeSupply_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_inchargeId_fkey" FOREIGN KEY ("inchargeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryItemToIssuanceRequest" ADD CONSTRAINT "_InventoryItemToIssuanceRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryItemToIssuanceRequest" ADD CONSTRAINT "_InventoryItemToIssuanceRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "IssuanceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
