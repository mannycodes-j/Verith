import AdminRecordDetail from "../../AdminRecordDetail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminRecordDetail kind="courses" id={(await params).id} />;
}
