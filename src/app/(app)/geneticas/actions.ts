"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { ensureVarietyQr } from "@/lib/qr";

export async function generateGeneticQrAction(formData: FormData) {
  const varietyId = formData.get("varietyId");

  if (typeof varietyId !== "string" || !varietyId) {
    throw new Error("Genetica invalida");
  }

  await ensureVarietyQr(varietyId);

  revalidatePath("/geneticas");
  revalidatePath(`/geneticas/${varietyId}`);
}

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

function getExtension(file: File) {
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/svg+xml") return "svg";
  return "bin";
}

export async function uploadGeneticFlowerPhotoAction(formData: FormData) {
  const varietyId = formData.get("varietyId");
  const photo = formData.get("photo");

  if (typeof varietyId !== "string" || !varietyId) {
    throw new Error("Genetica invalida");
  }

  if (!(photo instanceof File) || photo.size === 0) {
    throw new Error("Selecciona una imagen valida");
  }

  if (!ALLOWED_IMAGE_TYPES.has(photo.type)) {
    throw new Error("Formato de imagen no permitido");
  }

  if (photo.size > 5 * 1024 * 1024) {
    throw new Error("La imagen supera el limite de 5 MB");
  }

  const variety = await prisma.variety.findUnique({ where: { id: varietyId } });

  if (!variety) {
    throw new Error("Genetica no encontrada");
  }

  const extension = getExtension(photo);
  const safeName = variety.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const fileName = `${safeName}-${randomUUID()}.${extension}`;
  const relativePath = `/uploads/geneticas/${fileName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "geneticas");
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await photo.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, buffer);

  await prisma.variety.update({
    where: { id: varietyId },
    data: {
      flowerImageUrl: relativePath,
    },
  });

  revalidatePath("/geneticas");
  revalidatePath(`/geneticas/${varietyId}`);
}
