import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div
      className="group relative border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 animate-pulse"
      style={{ height: '100%' }}
    >
      <div className="flex flex-col h-full">
        {/* Increase the height of the image container */}
        <div className="w-full h-4/5 bg-gray-200 dark:bg-gray-700 aspect-w-1 aspect-h-1 overflow-hidden lg:aspect-none"></div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4"> {/* Increased spacing for larger text skeletons */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div> {/* Increased height */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div> {/* Increased height */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div> {/* Increased height */}
          </div>
          <div className="mt-6 space-y-4"> {/* Increased spacing */}
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div> {/* Increased height */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
