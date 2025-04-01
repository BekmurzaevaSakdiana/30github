import React, { Suspense } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <img src="/img/loading.gif" alt="Loading" className="w-20 h-20" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
