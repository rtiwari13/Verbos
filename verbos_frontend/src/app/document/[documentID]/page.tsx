import SingleDocPage from "@/components/document/SingleDocPage";

export default async function DocPage({
  params,
}: {
  params: Promise<{ documentID: number }>;
}) {
  const { documentID } = await params;
  return documentID ? (
    <SingleDocPage documentID={documentID} />
  ) : (
    <>Loading Document ....</>
  );
}
