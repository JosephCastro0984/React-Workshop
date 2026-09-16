# Todo List

A beginner-friendly React application that stores its tasks in [MockAPI.io](https://mockapi.io/?utm_source=chatgpt.com).

## Project Overview

This app lets you manage a simple task list:

- See all your todos
- Add a new todo
- Edit the text of a todo
- Mark a todo as completed (and un-complete it again)
- Delete a todo
- Filter the list: **All**, **Active**, **Completed**
- See how many tasks are still remaining
- Friendly **loading**, **error**, and **empty** screens

Every change is saved to MockAPI.io, so if you refresh the page your todos are still there.

## Technologies

- **React** – builds the user interface out of components
- **Vite** – the dev server and build tool
- **Tailwind CSS** – utility classes for styling
- **shadcn/ui** – ready-made, accessible components (Button, Card, Input, Label, Checkbox, Badge, Alert)
- **MockAPI.io** – a free fake REST API that acts as our backend
- **Fetch API** – how the browser talks to MockAPI.io

## Prerequisites

You need these installed / created first:

- [Node.js](https://nodejs.org/) (version 20 or newer)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)
- A free [MockAPI.io](https://mockapi.io/?utm_source=chatgpt.com) account

If you have not created your MockAPI.io project yet, follow **[../MOCKAPI_SETUP.md](../MOCKAPI_SETUP.md)** first.

## Installation

```bash
npm install
```

## Environment Setup

Copy:

```text
.env.example
```

to:

```text
.env
```

On macOS / Linux:

```bash
cp .env.example .env
```

On Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Then open `.env` and paste in your own MockAPI.io URL:

```env
VITE_API_URL=https://YOUR_PROJECT_ID.mockapi.io/api/v1
```

Notes:

- Do **not** put `/todos` at the end. The app adds it for you.
- Variables must start with `VITE_` or Vite will not pass them to the browser.
- Restart `npm run dev` after changing `.env`.
- `.env` is listed in `.gitignore`, so your URL is never committed.

## Run the Project

```bash
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## API

This app uses one MockAPI.io resource: **`todos`**.

| Field       | Type    | Example        |
| ----------- | ------- | -------------- |
| `title`     | string  | `"Learn React"`|
| `completed` | boolean | `false`        |

MockAPI.io adds the `id` field for you.

| Method   | Endpoint      | Used for                        |
| -------- | ------------- | ------------------------------- |
| `GET`    | `/todos`      | Loading the list when the page opens |
| `POST`   | `/todos`      | Adding a new todo               |
| `PUT`    | `/todos/:id`  | Editing the title, and completing a todo |
| `DELETE` | `/todos/:id`  | Removing a todo                 |

All of these live in `src/App.jsx`. The base URL comes from `src/api.js`:

```js
export const API_URL = import.meta.env.VITE_API_URL
export const TODOS_URL = `${API_URL}/todos`
```

## Project Structure

```text
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── TodoForm.jsx     # the "add a todo" form
│   ├── TodoFilters.jsx  # All / Active / Completed + remaining count
│   ├── TodoList.jsx     # maps over the todos
│   └── TodoItem.jsx     # one row: checkbox, edit, delete
├── api.js               # reads VITE_API_URL
├── App.jsx              # state + all fetch calls
├── main.jsx             # starts React
└── index.css            # Tailwind + theme
```

## Learning Objectives

By reading and changing this project you practise:

- **Components and props** – `App.jsx` passes data and functions down to `TodoList`, `TodoItem`, and `TodoForm`
- **useState** – todos, loading, error, filter, and the edit box all live in state
- **useEffect** – loading the todos once, right after the first render
- **Event handlers** – `onClick`, `onChange`, `onSubmit`
- **Forms and controlled inputs** – the input's value comes from state
- **Conditional rendering** – loading vs. error vs. empty vs. the list
- **`Array.map()`** – turning an array of todos into JSX
- **`Array.filter()`** – the All / Active / Completed filter and the remaining count
- **Fetch API with async/await** – GET, POST, PUT, DELETE
- **Loading and error states** – `try / catch / finally`
- **Environment variables** – keeping the API URL out of the code

### Things to try on your own

1. Show the newest todo at the top instead of the bottom.
2. Add a "Clear completed" button that deletes every completed todo.
3. Disable the Add button while a request is in flight.
"# React-Workshop" 
