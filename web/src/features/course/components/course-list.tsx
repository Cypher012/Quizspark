import type { Course } from '../types'
import { CourseRowCard } from './course-row-card'

type CourseListProps = {
  courses: Course[]
  isAdmin?: boolean
}

export function CourseList({
  courses,
  isAdmin = false,
}: CourseListProps) {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <CourseRowCard
          key={course.id}
          course={course}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  )
}
