export const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-8 h-8 bg-white/30 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted rounded mx-auto animate-pulse" />
          <div className="h-3 w-24 bg-muted/60 rounded mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
};
