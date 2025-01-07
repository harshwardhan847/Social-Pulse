import type { Metadata } from "next";
import "../globals.css";
import MainContainer from "@/components/MainContsiner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Social Pulse",
  description: "Social Media Performance Analyser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-screen h-screen background-radial-gradient fixed top-0 left-0" />
      <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-md" />
      <ClerkLoaded>
        <MainContainer>{children}</MainContainer>
      </ClerkLoaded>
      <ClerkLoading>
        <div className="w-full h-full min-h-screen flex-1 flex items-center justify-center">
          <div className="w-10 h-10 aspect-square border-r-4 border-t-4 border-primary rounded-full animate-spin" />
        </div>
      </ClerkLoading>
    </>
  );
}
