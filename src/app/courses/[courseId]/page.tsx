import { Suspense, use } from "react";
import CoursePlayerPage from "@/client/features/player/pages/CoursePlayerPage";
import PageLoader from "@/client/components/loader/PageLoader";
import { coursesData } from "@/data/courses.data";

export function generateStaticParams() {
  return coursesData.map((course) => ({
    courseId: course.id,
  }));
}

function CoursePlayerContent({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  return <CoursePlayerPage courseId={courseId} />;
}

export default function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  return (
    <Suspense fallback={<PageLoader />}>
      <CoursePlayerContent params={params} />
    </Suspense>
  );
}
