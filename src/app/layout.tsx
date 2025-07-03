import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { TasksProvider } from "@/context/TaskContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TasksProvider>{children}</TasksProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
