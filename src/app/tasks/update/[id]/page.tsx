/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { Status, Task, useTasks } from "@/context/TaskContext";
import Link from "next/link";

const UpdateTaskPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const { tasks, updateTask } = useTasks();
    const { id } = use(params);
    console.log(id);
    const fallBackTask: Task = {
        id: tasks.length,
        title: "",
        description: "",
        status: Status.Pending,
        due_date: new Date().getFullYear().toString(),
    };
    const taskk = tasks.find((task) => task.id === Number(id));
    const [newTask, setNewTask] = useState(taskk ? taskk : fallBackTask);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setNewTask((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!newTask.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!newTask.description?.trim()) {
            newErrors.description = "Description is required";
        }

        if (!newTask.due_date) {
            newErrors.due_date = "Due date is required";
        } else {
            const selectedDate = new Date(newTask.due_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                newErrors.due_date = "Due date cannot be in the past";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            updateTask(newTask);
            router.push("/tasks");
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-black py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link href="/tasks">
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="mb-4 p-0 hover:bg-transparent"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Tasks
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Add New Task
                            </h1>
                            <p className="text-white">
                                Create a new task to stay organized
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                        <CardDescription>
                            Fill in the information below to create your new
                            task
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Task Title{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter task title..."
                                    value={newTask.title}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.title ? "border-red-500" : ""
                                    }
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your task in detail..."
                                    value={newTask.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className={`min-h-[100px] resize-none ${
                                        errors.description
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={newTask.status}
                                        onValueChange={(value) =>
                                            handleInputChange("status", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Status.Pending}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                    Pending
                                                </div>
                                            </SelectItem>
                                            <SelectItem
                                                value={Status.Completed}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    Completed
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="due_date">
                                        Due Date{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="due_date"
                                        type="date"
                                        value={newTask.due_date}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "due_date",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.due_date
                                                ? "border-red-500"
                                                : ""
                                        }
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                    />
                                    {errors.due_date && (
                                        <p className="text-sm text-red-500">
                                            {errors.due_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Adding Task...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Task
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UpdateTaskPage;
