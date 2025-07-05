import { Task } from "@/context/TaskContext";

export const getSubTasks = async (task: Task, prompt: string) => {
    try {
        const response = await fetch("/api/generate-subtasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task, prompt }),
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.subtasks;
    } catch (error) {
        console.error("Error Calling API", error);
        throw error;
    }
};
