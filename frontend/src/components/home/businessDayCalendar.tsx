"use client";

import * as React from "react";
import { Calendar } from "@/components/shadcn-ui/calendar";

export function BusinessDayCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="h-full w-full flex rounded-md border shadow"
      classNames={{
        months:
          "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
        month: "space-y-4 w-full flex flex-col",
        table: "w-full h-full border-collapse space-y-1",
        head_row: "",
        row: "w-full mt-2",
        cell: "w-fit h-fit text-center",
        day: "w-full h-10 flex items-center justify-center rounded-full",
        day_selected: "bg-main text-white",
      }}
    />
  );
}
