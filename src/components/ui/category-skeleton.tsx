
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function CategorySkeleton() {
  return (
    <Card className="h-full border-0 shadow-lg bg-swahili-dust-800/90 overflow-hidden">
      <div className="aspect-square overflow-hidden relative">
        <Skeleton className="w-full h-full bg-copper-wood-700" />
        <div className="absolute bottom-4 left-4 right-4">
          <Skeleton className="h-6 w-20 mb-2 bg-copper-wood-700" />
          <Skeleton className="h-4 w-32 bg-copper-wood-700" />
        </div>
      </div>
    </Card>
  );
}

export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
}
