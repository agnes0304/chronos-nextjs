"use client";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HashMobile } from "@/components/payment/HashMobile";

const Success = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const lookUpHandler = () => {
    if (mobile) {
      const hashedMobile = HashMobile(mobile);
      router.push(`/payment/success/${hashedMobile}`);
    }
  };

  useEffect(() => {
    if (mobile) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [mobile]);

  return (
    <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
      <h1 className="text-lg text-gray-600">
        주문 시에 입력하신 핸드폰 번호를 아래에 입력해주세요.
      </h1>
      <input
        className="p-2 px-3 border border-gray-400 rounded-full w-[300px]"
        type="text"
        placeholder="'-'는 제외하고 입력해주세요!"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      ></input>
      <button
        className={`${
          isDisabled
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400"
        } h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out`}
        type="button"
        disabled={isDisabled}
        onClick={lookUpHandler}
      >
        <span className="mr-1">다운로드</span>
      </button>
    </div>
  );
};

export default Success;
