import { NextResponse } from "next/server";
import { ensureSettings, getInfluencer, recordEvent } from "@/lib/data";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const influencer = await getInfluencer(slug); const settings = await ensureSettings();
  if (!influencer || !settings.whatsappNumber) return NextResponse.redirect(new URL(`/casa/${slug}?whatsapp=indisponivel`, request.url),302);
  await recordEvent(influencer.id,"whatsapp");
  const message=`Oi, vim pelo influenciador ${influencer.name} e gostaria de saber mais sobre a casa.`;
  return NextResponse.redirect(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`,302);
}
