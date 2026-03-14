async function page({ params }: { params: { projectId: string } }) {
  const { projectId } = await params;
  console.log(params);
  return <div>this is the project code playground : {projectId}</div>;
}

export default page;
