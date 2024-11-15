import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { signOut } = useAuthenticator();
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
      <div className="mt-8 p-4 bg-green-100 rounded">
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a 
          href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"
          className="text-blue-500 hover:text-blue-700"
        >
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
