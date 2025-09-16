export default async function Page({
  params,
}: {
  params: Promise<{ documentID: string }>
}) {
  const { documentID } = await params
  return <div>My Post: lalala {documentID}</div>
}