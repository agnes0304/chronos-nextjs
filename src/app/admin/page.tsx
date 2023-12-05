"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import GithubOauth from "@/components/admin/GithubOauth";
import EmailLogin from "@/components/admin/EmailLogin";
import { supabase } from "@/components/admin/SupaClient";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginedUserData, setLoginedUserData] = useState<any>(null);

  const sendUserData = async (userData: {
    userId: string | undefined;
    userEmail: string | undefined;
  }) => {
    const res = await fetch(`${baseUrl}/send-user-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (data && data.message === 0) {
      console.log("sending token failure");
      throw new Error("sending token faailure");
    } else if (data.message === 1) {
      console.log("insertion failure");
      throw new Error("insertion failure");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLogin(true);
        setLoginedUserData(user);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginedUserData) {
      sendUserData({
        userId: loginedUserData.id,
        userEmail: loginedUserData.email,
      });
    }
  }, [loginedUserData]);

  return (
    <>
      <div className="flex flex-col w-[90vw] justify-center items-center gap-5">
        <h1 className="text-xl font-bold text-gray-600">
          {loginedUserData?.email
            ? `${loginedUserData.email}님`
            : "관리자 페이지"}
        </h1>
        {isLogin ? (
          <div className="flex gap-8">
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/order")}
            >
              주문서 확인
            </button>
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/posts")}
            >
              포스트 관리
            </button>
          </div>
        ) : (
          <EmailLogin />
        )}
        <GithubOauth isLogin={isLogin} />
      </div>
    </>
  );
};

export default AdminPage;
