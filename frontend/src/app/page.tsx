"use client";

// import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const todos = [
  {
    id: "1",
    content: "やること",
  },
  {
    id: "2",
    content: "やること",
  },
  {
    id: "3",
    content: "やること",
  },
  {
    id: "4",
    content: "やること",
  },
  {
    id: "5",
    content: "やること",
  },
  {
    id: "6",
    content: "やること",
  },
  {
    id: "7",
    content: "やること",
  },
];

export default function Home() {
  // const [todo, setTodo] = useState("");

  return (
    <div className="h-screen bg-muted-foreground p-8">
      <div className="flex flex-col gap-8 h-full bg-white rounded-lg p-8">
        <h1 className="text-xl font-semibold">TODO APP</h1>
        <div className="flex gap-4">
          <Input />
          <Button>Click me</Button>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">id</TableHead>
                <TableHead>TODO</TableHead>
                <TableHead className="text-right">Menu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.content}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm">
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
