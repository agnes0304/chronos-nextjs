"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col w-[90vw] justify-center items-center">
          <h2 className="text-xl font-semibold text-gray-600">
            앗! 에러입니다...
          </h2>
          <button
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            onClick={() => reset()}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
