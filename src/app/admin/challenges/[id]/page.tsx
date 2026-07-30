import AdminRecordDetail from "../../AdminRecordDetail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminRecordDetail kind="challenges" id={(await params).id} />;
}
