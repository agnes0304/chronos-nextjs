"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col w-[90vw] justify-center items-center">
      <div className="flex flex-col w-[90vw] justify-center items-center gap-6 sm:w-4/5 md:w-2/3">
        <h2 className="text-xl font-semibold text-gray-600">
          다운로드 가능한 링크가 없습니다🥲
        </h2>
        <p className="text-sm text-gray-500">
          입금 확인 대기 중인 경우 확인이 완료된 후 이메일을 발송해드려요!
        </p>
        <p className="text-sm text-gray-500">조금만 기다려주세요😊</p>

        <button
          className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
          onClick={() => router.push("/")}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
