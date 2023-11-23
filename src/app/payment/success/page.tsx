"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { HashMobile } from "@/components/payment/HashMobile";

const Success = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  const lookUpHandler = () => {
    if (mobile) {
      const hashedMobile = HashMobile(mobile);
      router.push(`/payment/success/${hashedMobile}`);
    }
  };

  return (
    <div>
      <h1>
        주문 시에 입력하신 핸드폰 번호를 입력 후 아래 다운로드 버튼을
        눌러주세요!
      </h1>
      <input
        type="text"
        placeholder="핸드폰 번호"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      ></input>
      <button onClick={lookUpHandler}>다운로드</button>
    </div>
  );
};

export default Success;
