"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/components/admin/SupaClient";

const GithubOauth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    window.addEventListener("hashchange", function () {
      console.log("hash changed");
      checkUser();
    });
  }, []);

  // db에 user의 id는 UID칼럼에, user의 email은 email칼럼에 저장하는 함수
  async function saveUser(user: User) {
    const { data, error } = await supabase
      .from("users")
      .insert([{ uid: user.id, email: user.email }]);
    if (error) {
      return { message: "user is not saved", error: true };
    }
    return { message: data, error: false };
  }

  async function saveAccessToken() {
    const token = localStorage.getItem("sb-ezbyvglcocakzgsptqkw-auth-token");
    if (token === null) {
      return { message: "accessToken is null", error: true };
    } else {
      const accessToken = JSON.parse(token as string)["access_token"];
      // const accessToken = JSON.parse(token as string)["current_session"]["access_token"];
      localStorage.setItem("accessToken", accessToken);
      return { message: "accessToken is saved", error: false };
    }
  }

  async function sendTokenToServer() {
    const token = localStorage.getItem("sb-ezbyvglcocakzgsptqkw-auth-token");
    if (token === null) {
      return { message: "refreshToken is null", error: true };
    }

    const refreshToken = JSON.parse(token as string)["refresh_token"];

    try {
      const response = await fetch(`${baseUrl}/set-refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });

      if (response.ok) {
        console.log("Token sent successfully");
        const data = await response.text();
        console.log(data);
      } else {
        console.error("Failed to send refreshToken", response.status);
      }
    } catch (error) {
      console.error("Error sending refreshToken", error);
    }
  }

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await saveUser(user);
      await saveAccessToken();
      await sendTokenToServer();
    }
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "https://chronos.jiwoo.best/admin" },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    localStorage.removeItem("accessToken");
    setUser(null);
    await fetch(`${baseUrl}/clear-refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "https://chronos.jiwoo.best/admin";
  }

  if (user) {
    return (
      <div>
        <button
          className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
          type="button"
          onClick={() => signOut()}
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
