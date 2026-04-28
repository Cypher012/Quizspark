import type { TopicWithCourse } from '../types'
import { TopicRowCard } from './topic-row-card'

type TopicListProps = {
  topics: TopicWithCourse[]
  isAdmin?: boolean
}

export function TopicList({ topics, isAdmin = false }: TopicListProps) {
  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <TopicRowCard key={topic.id} topic={topic} isAdmin={isAdmin} />
      ))}
    </div>
  )
}
