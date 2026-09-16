import TodoItem from './TodoItem'

function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <ul className="divide-y rounded-md border">
      {/* Array.map() turns each todo object into a <TodoItem /> */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
