"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TasksLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="grid grid-cols-1 p-5 mx-auto justify-center items-center place-items-center md:w-2/3 lg:w-1/2">
            <div className="min-w-1/3 bg-white rounded-lg text-center mb-10">
                <div className="text-3xl text-black">TaskNest</div>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-start items-start gap-2 p-2">
                <div>
                    <Button>All Tasks</Button>
                </div>
                <div>
                    <Button>Pending Tasks</Button>
                </div>
                <div>
                    <Button>Completed Tasks</Button>
                </div>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-between items-start gap-2 mt-2 p-2">
                <div className="text-md md:text-xl">Tasks List</div>
                {/* <div>
                    <input
                        className="border-3 border-gray-500 rounded-lg"
                        placeholder="Search for a Task"
                    />
                </div> */}
                <div>
                    <Link href="/tasks/new">
                        <Button>Create a new Task</Button>
                    </Link>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default TasksLayout;
