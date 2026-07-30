import AdminRecordDetail from "../../../AdminRecordDetail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminRecordDetail kind="prompts" id={(await params).id} />;
}
