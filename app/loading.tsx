// app/loading.tsx
export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex space-x-2 justify-center items-center">
          <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
          <div className="h-3 w-3 bg-white rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="h-3 w-3 bg-white rounded-full animate-pulse [animation-delay:0.4s]"></div>
        </div>
        <p className="mt-4 text-zinc-400">Loading portfolio...</p>
      </div>
    );
  }
  