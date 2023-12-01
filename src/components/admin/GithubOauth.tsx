"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/components/admin/SupaClient";

type GithubOauthProps = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

const GithubOauth = ({ isLogin, setIsLogin }:GithubOauthProps) => {

  const sendToken = async (token: any) => {
    const res = await fetch(`${baseUrl}/send-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
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

    // 이 아래 것들이 작동을 하는지 확인해야 함. redirectTo가 먼저되는지, 아님 다 하고 redirect개념인지
    if (error) {
      throw new Error("github login error");
    }
    if (data) {
      const { data: session } = await supabase.auth.getSession();
      await sendToken(session.session);
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
