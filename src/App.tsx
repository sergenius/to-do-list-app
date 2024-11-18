import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAIGeneration } from "./client";

const client = generateClient<Schema>();

interface Todo {
  id: string;
  content: string;
  description: string;
  instructions: string;
  estimatedHours: number;
  deadline: string;
  status: string;
}

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [{ data: aiData, isLoading, error }, generateTaskDetails] = useAIGeneration("generateTaskDetails");

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
    
    const sub = client.models.Todo.observeQuery().subscribe(({ items }) => {
      console.log('Received todos:', items);
      setTodos(items as Todo[]);
    });

    return () => sub.unsubscribe();
  }, []);

  async function fetchTodos() {
    try {
      const response = await client.models.Todo.list();
      console.log('Initial todos:', response.data);
      setTodos(response.data as Todo[]);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function createTodo() {
    const taskName = window.prompt("Task name");
    if (!taskName) return;

    setLoading(true);
    try {
      // Generate AI task details
      await generateTaskDetails({ taskName });
    } catch (error) {
      console.error("Error generating task details:", error);
      alert("Failed to generate task details. Please try again.");
      setLoading(false);
      return;
    }
  }

  // Watch for AI generation results and create todo when available
  useEffect(() => {
    async function createTodoWithAIData() {
      if (aiData && !isLoading && !loading) {
        try {
          // Calculate deadline based on estimated hours
          const deadline = new Date();
          deadline.setHours(deadline.getHours() + aiData.estimatedHours);

          // Create the enhanced todo
          const newTodo = await client.models.Todo.create({
            content: window.prompt("Task name") || "New Task",
            description: aiData.description,
            instructions: aiData.instructions,
            estimatedHours: aiData.estimatedHours,
            deadline: deadline.toISOString(),
            status: 'PENDING'
          });
          
          console.log('Created todo:', newTodo);
          await fetchTodos();
        } catch (error) {
          console.error("Error creating todo:", error);
          alert("Failed to create todo. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }

    createTodoWithAIData();
  }, [aiData, isLoading]);

  async function deleteTodo(id: string) {
    try {
      await client.models.Todo.delete({ id });
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{user?.signInDetails?.loginId}'s todos</h1>
      
      <button
        onClick={createTodo}
        disabled={loading || isLoading}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading || isLoading ? 'Creating...' : '+ New Task'}
      </button>

      <div className="space-y-4">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{todo.content}</h3>
                  <p className="text-gray-600 mt-2">{todo.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold">Instructions:</h4>
                    <p className="whitespace-pre-line">{todo.instructions}</p>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Estimated time: {todo.estimatedHours} hours</p>
                    <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos yet. Create one!</p>
        )}
      </div>

      <button
        onClick={signOut}
        className="mt-8 px-4 py-2 border rounded hover:bg-gray-100"
      >
        Sign out
      </button>
    </div>
  );
}

export default App;