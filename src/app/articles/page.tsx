import { redirect } from "next/navigation";

export default async function Articles() {
  redirect("/articles/page/1");
}
