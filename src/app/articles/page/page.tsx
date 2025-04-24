import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/articles/page/1");
}
