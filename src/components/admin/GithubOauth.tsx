"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { useEffect, useState, useContext } from "react";
import { LoginContext } from "@/components/admin/LoginContext";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/components/admin/SupaClient";

// 서버로 token 보내기: @app.route('/send-token', methods=['POST'])
async function sendToken() {
  const token = localStorage.getItem("sb-ezbyvglcocakzgsptqkw-auth-token");
  try {
    const res = await fetch(`${baseUrl}/send-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("sendToken 내부 에러: ", error);
  }
}

const GithubOauth = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);

  const githubLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "https://chronos.jiwoo.best/admin" },
    });
    if (error) {
      setIsLogin(false);
      return;
    } 
    const msg = await sendToken();
    if(msg.message === "success") {
      setIsLogin(true);
    }
  };

  const githubLogoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    setIsLogin(false);
  };

  return (
    <div>
      {isLogin ? (
        <button
          className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
          type="button"
          onClick={() => githubLogoutHandler()}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          로그아웃
        </button>
      ) : (
        <button
          className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
          type="button"
          onClick={() => githubLoginHandler()}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          Github로 로그인
        </button>
      )}
    </div>
  );
};

export default GithubOauth;
