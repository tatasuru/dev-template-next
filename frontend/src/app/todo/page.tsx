import { TodoTable } from "@/components/shared/todoTable";
import { Suspense } from "react";

interface Todo {
  id: string;
  body: string;
}

export default function Todo() {
  return (
    <div className="h-screen bg-muted-foreground p-8">
      <div className="flex flex-col gap-8 h-full bg-white rounded-lg p-8">
        <h1 className="text-xl font-semibold">TODO APP</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoTable />
        </Suspense>
      </div>
    </div>
  );
}
