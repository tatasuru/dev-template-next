"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TodoTable } from "@/components/shared/todoTable";

interface Todo {
  id: string;
  body: string;
}

async function getTodos() {
  try {
    const response = await fetch("http://localhost:8000/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

async function createTodo(body: string) {
  try {
    const response = await fetch("http://localhost:8000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create todo:", error);
  }
}

async function deleteTodo(id: string) {
  try {
    const response = await fetch(`http://localhost:8000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Success to delete todo item: ${id}`);
    return data;
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputContent, setInputContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      const todoData = await getTodos();
      setTodos(todoData);
    }
    fetchData();
  }, []);

  const handleDeleteButtonClick = async (todoId: string) => {
    await deleteTodo(todoId);

    async function fetchData() {
      const todoData = await getTodos();
      setTodos(todoData);
    }
    fetchData();
  };

  const handleCreateButtonClick = async (body: string) => {
    await createTodo(body);

    async function fetchData() {
      const todoData = await getTodos();
      setTodos(todoData);
    }

    fetchData();
    setInputContent("");
  };

  return (
    <div className="h-screen bg-muted-foreground p-8">
      <div className="flex flex-col gap-8 h-full bg-white rounded-lg p-8">
        <h1 className="text-xl font-semibold">TODO APP</h1>
        <div className="flex gap-4">
          <Input
            value={inputContent}
            onChange={(e) => {
              setInputContent(e.target.value);
            }}
            placeholder="やることを入力"
          />
          <Button
            onClick={() => {
              handleCreateButtonClick(inputContent);
            }}
            disabled={inputContent === ""}
          >
            登録
          </Button>
        </div>

        {todos.length === 0 && (
          <div>
            <p className="text-sm">やることがありません</p>
          </div>
        )}
        {todos.length > 0 && (
          <TodoTable todos={todos} onButtonClick={handleDeleteButtonClick} />
        )}
      </div>
    </div>
  );
}
