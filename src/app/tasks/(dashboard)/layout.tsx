"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TasksLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="grid grid-cols-1 p-5 mx-auto justify-center items-center place-items-center md:max-w-full lg:max-w-3/4">
            <div className="min-w-1/3 bg-white rounded-lg text-center mb-10">
                <div className="text-3xl text-black">TaskNest</div>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-between items-start gap-2 mt-2">
                <div className="text-md md:text-xl">Tasks List</div>
                <div>
                    <Link href="/tasks/new">
                        <Button>Create a new Task</Button>
                    </Link>
                </div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default TasksLayout;
