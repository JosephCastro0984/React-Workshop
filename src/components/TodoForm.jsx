import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Props: onAdd is a function that App.jsx passed down to us.
function TodoForm({ onAdd }) {
  // A controlled input: React state holds the value of the text box.
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    // Stop the browser from reloading the page when the form is submitted.
    event.preventDefault()

    // Ignore empty input (trim removes spaces at the start and end).
    if (title.trim() === '') return

    onAdd(title.trim())
    setTitle('') // clear the input after adding
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Label htmlFor="todo-title">New task</Label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="todo-title"
          placeholder="What do you need to do?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button type="submit" className="sm:w-auto">
          Add Todo
        </Button>
      </div>
    </form>
  )
}

export default TodoForm
