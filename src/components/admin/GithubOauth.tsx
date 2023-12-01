"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/components/admin/SupaClient";

type GithubOauthProps = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  loginedUserData?: any;
  setLoginedUserData: (loginedUserData: any) => void;
};

const GithubOauth = ({
  isLogin,
  setIsLogin,
  loginedUserData,
  setLoginedUserData,
}: GithubOauthProps) => {
  const sendUserData = async (userData: any) => {
    const res = await fetch(`${baseUrl}/send-user-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userData }),
    });
    const data = await res.json();
    if (data && data.message === "success") {
      console.log("success");
    } else {
      console.log("sending token faliure");
      throw new Error("sending token faliure");
    }
  };

  const githubLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "https://chronos.jiwoo.best/admin" },
    });
    if (error) {
      throw new Error("github login error");
    }
    if (data) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLoginedUserData(user);
      await sendUserData(user);
      setIsLogin(true);
    }
  };

  const githubLogoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    setIsLogin(false);
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
