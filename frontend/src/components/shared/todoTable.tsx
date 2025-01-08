"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";

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
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
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

export function TodoTable() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleCreate = async () => {
    await createTodo(inputValue);
    getTodos().then((data) => {
      setTodos(data);
    });
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    getTodos().then((data) => {
      setTodos(data);
    });
  };

  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder="やることを入力"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="default" onClick={handleCreate}>
          登録
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-96">ID</TableHead>
            <TableHead>TODO</TableHead>
            <TableHead className="text-right">Menu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.body}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
