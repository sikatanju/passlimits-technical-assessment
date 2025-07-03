/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Status, useTasks } from "@/context/TaskContext";

const TasksPage = () => {
    const { tasks, updateTask, deleteTask } = useTasks();

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>List of your tasks</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden sm:table-cell">
                            No.
                        </TableHead>
                        <TableHead className="">Title</TableHead>
                        <TableHead className="hidden sm:table-cell md:w-[300px] lg:w-[400px]">
                            Description
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow key={task.id}>
                            <TableCell className="hidden sm:table-cell">
                                {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                                {task.title}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {task?.description}
                            </TableCell>
                            <TableCell>
                                <select
                                    defaultValue={task.status}
                                    onChange={(e) => {
                                        const statusValue = e.target.value;
                                        console.log(statusValue);
                                        const newTask = {
                                            ...task,
                                            status:
                                                statusValue === "pending"
                                                    ? Status.Pending
                                                    : Status.Completed,
                                        };
                                        updateTask(newTask);
                                        console.log(task);
                                    }}
                                >
                                    <option key={"pending"} value={"pending"}>
                                        Pending
                                    </option>
                                    <option
                                        key={"completed"}
                                        value={"completed"}
                                    >
                                        Completed
                                    </option>
                                </select>
                            </TableCell>
                            <TableCell className="text-right">
                                {task.due_date}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TasksPage;
