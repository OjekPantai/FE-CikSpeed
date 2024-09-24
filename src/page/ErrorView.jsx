const ErrorView = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center space-y-2">
        <h4 className="scroll-m-20 text-6xl font-bold tracking-tight">404</h4>
        <p className="text-muted-foreground text-lg">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default ErrorView;
