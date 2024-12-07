const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen" >
      {/* Faded overlay */}
      <div className=""></div>

      {/* Content */}
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;