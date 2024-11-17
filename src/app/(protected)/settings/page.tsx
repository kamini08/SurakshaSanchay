import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import Loading from "@/components/Loading"; // Import the Loading component

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const metadata = {
  title: "Home",
  description: "Landing page",
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when the login starts
    try {
      // Simulate a login process (replace this with your actual login logic)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second login delay
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Set loading to false when the login is done
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {loading ? (
        <Loading /> // Show the loading spinner while loading
      ) : (
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
              <LoginButton onClick={handleLogin}> {/* Call handleLogin on click */}
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
      )}
    </div>
  );
}