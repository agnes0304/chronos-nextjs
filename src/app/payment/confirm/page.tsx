"use client";
import { useState } from "react";
import Link from "next/link";
const ConfirmPage = () => {
  const [isConfirm, setIsConfirm] = useState(false);

  const confirmHandler = () => {
    setIsConfirm(true);
  };

  return (
    <div>
      {isConfirm ? (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-600 mb-3">송금 완료!</h1>
            <p className="text-base font-normal text-gray-600">
              이메일 일치 여부 확인 후 다운로드 받으실 수 있습니다.
            </p>
            <p className="text-base font-normal text-gray-600">
              30분~1시간 정도 소요됩니다. 입력하신 이메일로 알려드릴게요!
            </p>
          </div>
          <Link
            href="/"
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
          >
            홈으로
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <h1 className="text-lg text-gray-600">
            송금 완료 후 확인 버튼을 눌러주세요
          </h1>
          <button
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
            onClick={() => confirmHandler()}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmPage;
