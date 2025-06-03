
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-dark-clay-100 border border-copper-wood-700">
      <div className="aspect-square overflow-hidden">
        <Skeleton className="w-full h-full bg-copper-wood-700" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 bg-copper-wood-700" />
            ))}
          </div>
          <Skeleton className="ml-2 h-4 w-12 bg-copper-wood-700" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2 bg-copper-wood-700" />
        <Skeleton className="h-4 w-full mb-4 bg-copper-wood-700" />
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-20 bg-copper-wood-700" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1 bg-copper-wood-700" />
          <Skeleton className="h-8 flex-1 bg-copper-wood-700" />
        </div>
        <Skeleton className="h-8 w-full mt-2 bg-copper-wood-700" />
      </CardContent>
    </Card>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
