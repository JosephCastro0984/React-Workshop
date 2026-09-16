// The MockAPI.io base URL lives in the .env file so it is never hardcoded
// inside a component.
//
// .env example:
//   VITE_API_URL=https://YOUR_PROJECT_ID.mockapi.io/api/v1
//
// Vite only exposes variables that start with VITE_ to the browser.
export const API_URL = import.meta.env.VITE_API_URL

// The full address of our "todos" resource on MockAPI.io.
export const TODOS_URL = `${API_URL}/todos`
