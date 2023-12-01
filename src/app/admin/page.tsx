"use client";
import GithubOauth from "@/components/admin/GithubOauth";
import EmailLogin from "@/components/admin/EmailLogin";
import { supabase } from "@/components/admin/SupaClient";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginedUserData, setLoginedUserData] = useState<any>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session !== null) {
        setIsLogin(true);
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <h1 className="text-lg text-gray-600">{loginedUserData.email}</h1>
          <button
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
            onClick={() => (window.location.href = "/admin/order")}
          >
            주문 리스트
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <EmailLogin />
          <GithubOauth isLogin={isLogin} setIsLogin={setIsLogin} loginedUserData={loginedUserData} setLoginedUserData={setLoginedUserData}/>
        </div>
      )}
    </>
  );
};

export default AdminPage;
