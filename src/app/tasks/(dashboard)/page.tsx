/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";

const TasksPage = () => {
    const { tasks, updateTask, deleteTask } = useTasks();
    const handleDelete = (taskId: number) => {
        deleteTask(taskId);
    };
    return (
        <div className="overflow-x-auto w-full">
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
                            <TableCell>
                                <Link
                                    href={`/tasks/update/${task.id}`}
                                    className="m-0.5"
                                >
                                    <Button className="h-6 w-6 bg-green-300">
                                        <SquarePen />
                                    </Button>
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="h-6 w-6 bg-red-400"
                                            value={task.id}
                                        >
                                            <Trash />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your task.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>

                                            <AlertDialogAction
                                                className={buttonVariants({
                                                    variant: "destructive",
                                                })}
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TasksPage;
