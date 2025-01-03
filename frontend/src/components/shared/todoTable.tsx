import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Todo {
  id: string;
  body: string;
}

interface TodoTableProps {
  todos: Todo[];
  onButtonClick: (todoId: string) => void;
}

export function TodoTable({ todos, onButtonClick }: TodoTableProps) {
  return (
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
                onClick={() => onButtonClick(todo.id)}
              >
                delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
