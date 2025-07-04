import { Task } from "@/context/TaskContext";
import { ai } from "./utils";

export const getSubTasks = async (task: Task, prompt: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            thinkingConfig: {
                thinkingBudget: 0,
            },
        },
    });
    return response.text;
};
