import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

function TodoItem({ todo, onUpdate, onDelete }) {
  // Is this row currently in "edit mode"?
  const [isEditing, setIsEditing] = useState(false)
  // The text inside the edit box (a controlled input).
  const [draftTitle, setDraftTitle] = useState(todo.title)

  function handleToggle() {
    // We send the whole todo so MockAPI.io keeps both fields.
    onUpdate(todo.id, { title: todo.title, completed: !todo.completed })
  }

  function handleSave(event) {
    event.preventDefault()
    if (draftTitle.trim() === '') return

    onUpdate(todo.id, { title: draftTitle.trim(), completed: todo.completed })
    setIsEditing(false)
  }

  function handleCancel() {
    setDraftTitle(todo.title) // throw away the edit
    setIsEditing(false)
  }

  // Conditional rendering: the same component shows two different views.
  if (isEditing) {
    return (
      <li className="p-3">
        <form onSubmit={handleSave} className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm">
              Save
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 p-3">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={handleToggle}
      />

      <label
        htmlFor={`todo-${todo.id}`}
        className={
          'flex-1 cursor-pointer text-sm ' +
          (todo.completed ? 'text-slate-400 line-through' : 'text-slate-900')
        }
      >
        {todo.title}
      </label>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(todo.id)}>
          Delete
        </Button>
      </div>
    </li>
  )
}

export default TodoItem
