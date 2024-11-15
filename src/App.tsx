import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.log('Not authenticated');
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
    });

    return () => subscription.unsubscribe();
  }, [isAuthenticated]);

  async function createTodo() {
    if (!isAuthenticated) return;
    
    const content = window.prompt("Todo content");
    if (content) {
      try {
        await client.models.Todo.create({ content });
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  }
  
  async function deleteTodo(id: string) {
    if (!isAuthenticated) return;

    try {
      await client.models.Todo.delete({ id });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        {/* Add your authentication UI here */}
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">My todos</h1>
      <button 
        onClick={createTodo}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + new
      </button>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li 
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded"
          >
            <span>{todo.content}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;