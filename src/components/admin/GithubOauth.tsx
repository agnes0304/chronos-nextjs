"use client";
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

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user", user);
    setUser(user);
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "https://chronos.jiwoo.best/admin/order" },
    }); 
  }

  async function signOut() {
    await supabase.auth.signOut();
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
