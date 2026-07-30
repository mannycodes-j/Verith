import AdminVerificationDetail from "./AdminVerificationDetail";

export default async function AdminVerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminVerificationDetail id={id} />;
}
