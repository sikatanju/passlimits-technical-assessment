/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
// import { Timestamp } from "../components/Timestamp";
// import Button from "../components/ui/Button";

export default async function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
        </div>
    );
}
