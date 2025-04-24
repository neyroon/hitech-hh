import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const revalidatePathByModel = (model: string) => {
  switch (model) {
    case "article":
      revalidatePath("/articles");
      break;

    default:
      break;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  if (
    process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ===
    req.headers.get("authorization")
  ) {
    const { model } = await req.json();
    revalidatePathByModel(model);
  }

  return Response.json(res);
}
