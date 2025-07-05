"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Status, useTasks } from "@/context/TaskContext";
import { getSubTasks } from "@/lib/GetSubTasks";
import { ArrowLeft, Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const TaskDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { tasks, updateTask } = useTasks();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();
    let tempTask = tasks.find((tt) => tt.id === Number(id));
    if (!tempTask) {
        tempTask = {
            id: -1,
            title: "",
            description: "",
            status: Status.Pending,
            due_date: "",
        };
    }
    const generateSteps = async () => {
        setIsError(false);
        try {
            setIsLoading(true);
            const response = await getSubTasks(tempTask);
            if (response.subtasks) {
                tempTask.steps = response.subtasks;
                updateTask(tempTask);
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error("Error getting subtasks:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            router.push("/tasks");
                        }}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Task Details
                        </h1>
                        <p className="text-white text-sm">
                            Task ID: {tempTask.id}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between flex-wrap gap-2">
                            <CardTitle className="text-xl">
                                {tempTask.title}
                            </CardTitle>
                            <Badge
                                className={
                                    tempTask.status === Status.Completed
                                        ? "bg-green-500 rounded-2xl"
                                        : "bg-yellow-500 rounded-2xl"
                                }
                            >
                                {tempTask.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium text-white mb-2">
                                Description
                            </h3>
                            <p className="text-white leading-relaxed">
                                {tempTask.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-white mb-2">
                                Due Date
                            </h3>
                            <p className="text-white">{tempTask.due_date}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-white mb-2">
                                Steps
                            </h3>
                        </div>
                        {isLoading ? (
                            <div>Generating...</div>
                        ) : (
                            <div>
                                {tempTask.steps ? (
                                    <p className="text-white whitespace-pre-wrap">
                                        {tempTask?.steps}
                                    </p>
                                ) : (
                                    <Button
                                        className="hover:cursor-pointer"
                                        onClick={() => generateSteps()}
                                    >
                                        Suggest Subtasks
                                    </Button>
                                )}
                            </div>
                        )}
                        {isError && (
                            <div className="text-red-500 text-sm">
                                Server Error! Could not generate subtasks,
                                please try again later :(
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TaskDetailPage;
