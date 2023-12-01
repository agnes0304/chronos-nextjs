const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/components/admin/SupaClient";

const GithubOauth = () => {
  // send token(session) to sever
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
    if (error) {
      throw new Error("github login error");
    }
    if (data) {
      const { data: session } = await supabase.auth.getSession();
      await sendToken(session);
    }
  };

  const githubLogoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      throw new Error("github logout error");
    }
  };

  async function checkGithubLoggedin() {
    const { data: session } = await supabase.auth.getSession();
    if (session) {
      return (
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
      );
    }
    return (
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
    );
  }
  return <>{checkGithubLoggedin()}</>;
};

export default GithubOauth;
