"use client";

import CardContent from "@/components/ui/card-content";

export default function KriteriaSkeletonLoader() {
  return (
    <CardContent>
      <div className="flex items-center justify-between mb-4">
        <div className="h-7 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="space-y-2 md:hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 border border-border rounded-xl animate-pulse"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2">
                <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto hidden md:block">
        <div className="w-full text-sm">
          <div className="flex border-b border-border">
            <div className="py-3.5 px-4 w-20">
              <div className="h-5 w-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>
            <div className="py-3.5 px-4 flex-1">
              <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>
            <div className="py-3.5 px-4 w-32">
              <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>
            <div className="py-3.5 px-4 w-28 text-right">
              <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse ml-auto"></div>
            </div>
          </div>
          <div className="divide-y divide-border">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="py-4 px-4 w-20">
                  <div className="h-5 w-10 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="py-4 px-4 flex-1">
                  <div className="h-5 w-4/5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="py-4 px-4 w-32">
                  <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="py-4 px-4 w-28 text-right">
                  <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  );
}