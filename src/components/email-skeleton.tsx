import { Skeleton } from "./ui/skeleton";

export function EmailSkeleton() {
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
      <div className="flex w-full flex-col gap-1">
        <div>
          <div>
            <Skeleton className="h-5 w-[250px]" />
            <Skeleton className="mt-1 h-4 w-[200px]" />
          </div>
          <div className="mt-2 text-xs">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="mt-2 h-3 w-full" />
            <Skeleton className="mt-1 h-3 w-1/2" />
          </div>
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        <Skeleton className="h-5 w-[70px]" />
      </div>
    </div>
  );
}
