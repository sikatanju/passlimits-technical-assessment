/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export enum Status {
    Pending = "pending",
    Completed = "completed",
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    due_date: string;
}

interface TasksContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 0,
            title: "Dummy Task",
            description: "Description for dummy task",
            status: Status.Completed,
            due_date: new Date().toISOString().split("T")[0],
        },
    ]);

    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

    const updateTask = (updated: Task) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === updated.id ? updated : task))
        );
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <TasksContext.Provider
            value={{ tasks, addTask, updateTask, deleteTask }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context) throw new Error("useTasks must be used within TasksProvider");
    return context;
};
