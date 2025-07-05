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
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Status, Task, useTasks } from "@/context/TaskContext";
import { getSubTasks } from "@/lib/GetSubTasks";
import { Lightbulb, SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TasksPage = () => {
    const { tasks, updateTask, deleteTask } = useTasks();
    const [isSubtasksOpen, setIsSubtasksOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [suggestedSubtasks, setSuggestedSubtasks] = useState<string>();
    const handleDelete = (taskId: number) => {
        deleteTask(taskId);
    };

    const getSuggestions = async (task: Task) => {
        setSelectedTask(task);
        if (task && !task.steps) {
            setIsLoading(true);
            setIsSubtasksOpen(true);
            try {
                const response = await getSubTasks(task);
                task.steps = response;
                setSuggestedSubtasks(response);
            } catch (error) {
                console.error("Error getting subtasks:", error);
            } finally {
                setIsLoading(false);
            }
        } else if (task && task.steps) {
            setSuggestedSubtasks(task.steps);
            setIsSubtasksOpen(true);
        }
    };
    const handleAcceptSubtasks = () => {
        setIsSubtasksOpen(false);
    };
    if (tasks.length <= 0) {
        return <div>No tasks to show.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>List of your tasks</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden sm:table-cell">
                            No.
                        </TableHead>
                        <TableHead className="w-48">Title</TableHead>
                        <TableHead className="hidden sm:table-cell w-64">
                            Description
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow key={task.id}>
                            <TableCell className="hidden sm:table-cell w-8">
                                {index + 1}
                            </TableCell>
                            <TableCell className="font-medium md:w-36 lg:w-54 whitespace-normal">
                                <Link href={`/tasks/${task.id}`}>
                                    <div className="break-words hover:cursor-pointer hover:underline">
                                        {task.title}
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell md:w-3xl lg:w-4xl break-words whitespace-normal">
                                <div className="break-words">
                                    {task.description}
                                </div>
                            </TableCell>
                            <TableCell className="w-6">
                                <select
                                    className="hover:cursor-pointer"
                                    defaultValue={task.status}
                                    onChange={(e) => {
                                        const statusValue = e.target.value;
                                        const newTask = {
                                            ...task,
                                            status:
                                                statusValue === "pending"
                                                    ? Status.Pending
                                                    : Status.Completed,
                                        };
                                        updateTask(newTask);
                                    }}
                                >
                                    <option
                                        className="bg-black text-white hover:cursor-pointer"
                                        key={"pending"}
                                        value={"pending"}
                                    >
                                        Pending
                                    </option>
                                    <option
                                        className="bg-black text-white hover:cursor-pointer"
                                        key={"completed"}
                                        value={"completed"}
                                    >
                                        Completed
                                    </option>
                                </select>
                            </TableCell>
                            <TableCell className="w-24">
                                {task.due_date}
                            </TableCell>
                            <TableCell>
                                <Button
                                    className="h-6 w-6 bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer"
                                    onClick={() => getSuggestions(task)}
                                >
                                    <Lightbulb className="h-3 w-3" />
                                </Button>
                                <Link
                                    href={`/tasks/update/${task.id}`}
                                    className="mx-1"
                                >
                                    <Button className="h-6 w-6 bg-green-400 hover:bg-green-500 hover:cursor-pointer">
                                        <SquarePen />
                                    </Button>
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="h-6 w-6 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
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
            <Dialog open={isSubtasksOpen} onOpenChange={setIsSubtasksOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            Suggested Subtasks for: {selectedTask?.title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                        {isLoading ? (
                            <div>Generating subtasks...</div>
                        ) : (
                            <div className="p-3 border rounded">
                                <p className="text-sm text-white">
                                    {suggestedSubtasks}
                                </p>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant={"outline"}
                            onClick={handleAcceptSubtasks}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TasksPage;
