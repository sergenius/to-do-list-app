import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  async function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      await client.models.Todo.create({ content });
    }
  }
  
  async function deleteTodo(id: string) {
    try {
      await client.models.Todo.delete({ id });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <main className="p-4">
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
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
      
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;