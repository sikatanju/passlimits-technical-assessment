import { Task } from "@/context/TaskContext";

export const getSubTasks = async (task: Task) => {
    const prompt = `Generate subtasks for the given task, Title: ${task?.title}, description: ${task?.description}, break it into subtasks, don't go into details and add any heading, just generate a list of subtasks (separated by comma) would be fine.`;
    try {
        const response = await fetch("/api/generate-subtasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task, prompt }),
        });

        if (!response.ok) {
            return { subtasks: undefined };
        } else {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error("Error Calling API", error);
        throw error;
    }
};
