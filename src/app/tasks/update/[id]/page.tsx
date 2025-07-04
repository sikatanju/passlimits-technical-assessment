import TaskForm from "@/components/TaskForm";
import React, { use } from "react";

const UpdateTaskPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    return <TaskForm mode="update" taskId={id} />;
};

export default UpdateTaskPage;
