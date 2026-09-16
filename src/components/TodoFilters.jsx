import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// The three buttons the user can click.
const filters = ['all', 'active', 'completed']

function TodoFilters({ filter, onChange, remainingCount }) {
  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {filters.map((name) => (
          <Button
            key={name}
            type="button"
            size="sm"
            // Conditional styling: highlight the button that is active.
            variant={filter === name ? 'default' : 'outline'}
            onClick={() => onChange(name)}
            className="capitalize"
          >
            {name}
          </Button>
        ))}
      </div>

      <Badge variant="secondary">
        {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
      </Badge>
    </div>
  )
}

export default TodoFilters
