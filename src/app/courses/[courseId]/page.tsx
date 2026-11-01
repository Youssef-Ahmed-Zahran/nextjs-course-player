import CoursePlayerPage from "@/client/pages/CoursePlayerPage";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: Props) {
  const { courseId } = await params;
  return <CoursePlayerPage courseId={courseId} />;
}
