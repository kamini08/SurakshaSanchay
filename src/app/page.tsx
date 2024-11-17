import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const metadata = {
  title: "Home",
  description: "Landing page",
};

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <main className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 p-6">
        <div className="space-y-6 text-center">
          <h1
            className={cn(
              "text-6xl font-semibold text-white drop-shadow-md",
              font.className,
            )}
          >
            🔐 Auth
          </h1>
          <p className="text-lg text-white">A Simple Authentication service</p>
          <div>
            <LoginButton>
              <Button
                variant="secondary"
                size="lg"
                className="bg-black-2 text-white"
              >
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
    </div>
  );
}
