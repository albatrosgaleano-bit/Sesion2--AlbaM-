"use server";

import { revalidatePath } from "next/cache";

import { ensureLotPhaseQr } from "@/lib/qr";

export async function generateLotPhaseQrAction(formData: FormData) {
  const lotId = formData.get("lotId");

  if (typeof lotId !== "string" || !lotId) {
    throw new Error("Lote invalido");
  }

  await ensureLotPhaseQr(lotId);

  revalidatePath("/qr");
  revalidatePath(`/lotes/${lotId}`);
}
