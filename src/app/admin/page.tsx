import GithubOauth from "@/components/admin/GithubOauth";
import EmailLogin from "@/components/admin/EmailLogin";
import { supabase } from "@/components/admin/SupaClient";

const AdminPage = () => {
  async function checkLoggedin() {
    const { data: session } = await supabase.auth.getSession();
    console.log(session);
    if (session && session.session !== null) {
      return (
        <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
          <button
            className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
            type="button"
          >
            주문 리스트
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
        <EmailLogin />
        <GithubOauth />
      </div>
    );
  }
  return <>{checkLoggedin()}</>;
};

export default AdminPage;
