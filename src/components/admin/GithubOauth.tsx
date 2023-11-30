"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/components/admin/SupaClient";

async function sendTokenToServer() {
  const token = localStorage.getItem("sb-ezbyvglcocakzgsptqkw-auth-token");
  if (token === null) {
    return { message: "token is null", error: true };
  }
  try {
    const res = await fetch(`${baseUrl}/send-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    const data = await res.json();

    if(data.message === "success"){
      return { message: "token is sent", error: false };
    } else {
      return { message: "Sending token failure", error: true };
    }
  } catch (error) {
    console.error("Network Error for sending token", error);
  }
}

async function saveAccessToken() {
  const token = localStorage.getItem("sb-ezbyvglcocakzgsptqkw-auth-token");
  if (token === null) {
    return { message: "accessToken is null", error: true };
  } else {
    const accessToken = JSON.parse(token as string)["access_token"];
    localStorage.setItem("accessToken", accessToken);
    return { message: "accessToken is saved", error: false };
  }
}

async function signInWithGithub() {
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: "https://chronos.jiwoo.best/admin" },
  });
}

const GithubOauth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    window.addEventListener("hashchange", function () {
      console.log("hash changed");
      checkUser();
    });
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await saveAccessToken(); // 얘만 동작
      try{
        const res = await sendTokenToServer();
        console.log(res);
      } catch {
        console.log("sendTokenToServer() error");
      }
    }
  }

  async function githubSignOut() {
    await supabase.auth.signOut();
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "https://chronos.jiwoo.best";
  }

  if (user) {
    return (
      <div>
        <button
          className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
          type="button"
          onClick={() => githubSignOut()}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          Github 로그아웃
        </button>
        {user && <p className="text-black">Signed in: {user.email}</p>}]
      </div>
    );
  }

  return (
    <div>
      <button
        className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
        type="button"
        onClick={() => signInWithGithub()}
      >
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        Github로 로그인
      </button>
    </div>
  );
};

export default GithubOauth;
