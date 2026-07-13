import CategoryResults from "@/Components/CategoryResults";

export default async function Page({ params }) {
  const { category } = await params;

  return <CategoryResults category={category} />;
}