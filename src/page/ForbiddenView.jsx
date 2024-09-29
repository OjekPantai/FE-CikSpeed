const ForbiddenView = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center space-y-2">
        <h4 className="scroll-m-20 text-6xl font-bold tracking-tight">403</h4>
        <p className="text-muted-foreground text-lg">
          You're not allowed to access this page
        </p>
      </div>
    </div>
  );
};

export default ForbiddenView;
