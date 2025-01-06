import type { Metadata } from "next";
import "../globals.css";
import MainContainer from "@/components/MainContsiner";

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
      <MainContainer>{children}</MainContainer>
    </>
  );
}
