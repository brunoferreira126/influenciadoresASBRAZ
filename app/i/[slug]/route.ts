import { NextResponse } from "next/server";
import { getInfluencer, recordEvent } from "@/lib/data";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const influencer = await getInfluencer(slug);
  if (!influencer) return NextResponse.redirect(new URL("/?link=invalido", request.url), 302);
  await recordEvent(influencer.id, "click");
  return NextResponse.redirect(new URL(`/casa/${slug}`, request.url), 302);
}
