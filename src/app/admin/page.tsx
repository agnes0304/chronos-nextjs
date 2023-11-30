"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useState, useEffect } from "react";
import { HashInfo } from "@/components/payment/HashInfo";
import { useRouter } from "next/navigation";
import GithubOauth from "@/components/admin/GithubOauth";

const AdminPage = () => {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  // accessToken있는지 확인하기
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const adminHandler = async () => {
    try {
      const body = { email: HashInfo(adminEmail) };
      const res = await fetch(`${baseUrl}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data.message);

      if (data.message === "success") {
        alert("관리자 로그인 성공");
        router.push("/admin/order");
      } else {
        alert("관리자 로그인 실패");
      }
      if (!data) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <button
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
          >
            주문 리스트
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <h1 className="text-lg text-gray-600">
            이메일을 아래에 입력해주세요.
          </h1>
          <input
            className="p-2 px-3 border border-gray-400 rounded-full w-[300px]"
            type="email"
            placeholder="관리자 이메일"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          ></input>
          <button
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
            onClick={() => adminHandler()}
          >
            로그인
          </button>
          <GithubOauth isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      )}
      
    </>
  );
};

export default AdminPage;
