import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Task Management <br className="hidden sm:block" />
                            <span className="text-amber-100 dark:text-amber-100">
                                simplified
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                            A minimal and elegant task management system with AI
                            for modern teams. Manage your tasks with ease.
                        </p>
                        <div className="mt-10">
                            <Link href="/tasks">
                                <Button className="lg hover:cursor-pointer">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-gray-200 dark:border-dark-border-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            ©2025 SikaTanju. Built for Passlimits Technical
                            Assessment.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
