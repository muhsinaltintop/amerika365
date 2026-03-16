import { NextResponse } from "next/server";

interface GeneratePayload {
  sourceText?: string;
  sourceLanguage?: string;
  category?: string;
}

function toSlug(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export async function POST(request: Request) {
  const body = (await request.json()) as GeneratePayload;
  const sourceText = body.sourceText?.trim();

  if (!sourceText) {
    return NextResponse.json({ error: "Kaynak metin zorunludur." }, { status: 400 });
  }

  const sentences = sourceText
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  const lead = sentences[0] ?? sourceText;
  const secondary = sentences[1] ?? "Detaylar gelişmeye devam ediyor.";

  const title = `Özet: ${lead.slice(0, 90)}`;
  const excerpt = `${lead.slice(0, 160)}${lead.length > 160 ? "..." : ""}`;
  const keywords = (body.category ? [body.category] : ["ABD", "güncel"]).join(", ");

  return NextResponse.json({
    draft: {
      title,
      excerpt,
      category: body.category ?? "ABD",
      sourceLanguage: body.sourceLanguage ?? "en",
      content: [
        { type: "paragraph", text: lead },
        { type: "paragraph", text: secondary },
      ],
      seo: {
        title: `${title.slice(0, 60)}`,
        description: excerpt,
        keywords,
      },
      slug: toSlug(title),
    },
  });
}
