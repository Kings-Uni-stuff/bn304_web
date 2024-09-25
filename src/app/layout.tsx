import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { BackgroundBeams } from "@/components/ui/background-beams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BN304 Capstone",
    description: "A Pool security system interface for the BN304 capstone project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className="dark">
                <body className={`${inter.className} h-screen`}>
                    <SignedOut>
                        <BackgroundBeams />
                        <div className="absolute z-[999] flex-col gap-4 flex w-full h-full justify-center items-center">
                            <div className="p-8 bg-stone-900 rounded-lg">
                                <h1 className="text-3xl">Hey there!</h1>
                                <p>You&apos;ll need to sign in before you can continue.</p>
                                <SignInButton>
                                    <button
                                        type="button"
                                        className="p-2 w-full rounded-lg bg-cyan-500 hover:bg-cyan-700 transition-colors mt-4"
                                    >
                                        Sign in
                                    </button>
                                </SignInButton>
                            </div>
                            <div className="flex gap-2 text-stone-500">
                                <p className="text-center">Our user authentication is handled by </p>
                                <a href="https://clerk.com/" className="text-blue-400 flex items-center gap-1 w-fit">
                                    Clerk! <ArrowSquareOut size={16} />
                                </a>
                            </div>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className="w-full pt-4 px-5 justify-between flex items-center gap-3">
                            <h1>Hello, {currentUser().then((user) => user?.username)}!</h1>
                            <UserButton />
                        </div>
                        {children}
                    </SignedIn>
                </body>
            </html>
        </ClerkProvider>
    );
}
