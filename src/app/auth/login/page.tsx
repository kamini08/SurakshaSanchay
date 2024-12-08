import { LoginForm } from "@/components/auth/login-form";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: 'url("/images/bgimage/police.jpg")',
          backgroundSize: "130% 140%",
          
          
        }}
      >
        {/* Overlay for darkening the background */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.5 }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoginForm />
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
