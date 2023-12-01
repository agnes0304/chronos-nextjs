"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/components/admin/SupaClient";

type GithubOauthProps = {
  isLogin: boolean;
};

const GithubOauth = ({
  isLogin,
}: GithubOauthProps) => {
  const githubLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "https://chronos.jiwoo.best/admin" },
    });
    if (error) {
      throw new Error("github login error");
    }
  };

  const githubLogoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.href = "/admin";
    if (error) {
      console.log(error);
      throw new Error("github logout error");
    }
  };

  return (
    <>
      {isLogin ? (
        <div>
          <button
            className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
            onClick={() => githubLogoutHandler()}
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <button
            className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
            onClick={() => githubLoginHandler()}
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            Github로 로그인
          </button>
        </div>
      )}
    </>
  );
};

export default GithubOauth;
