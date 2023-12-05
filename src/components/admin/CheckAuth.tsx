import { supabase } from "@/components/admin/SupaClient";

export async function checkUserAuthorization() {
  const { data: session } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (session.session === null) {
    alert("로그인이 필요합니다");
    window.location.href = "/admin";
    return false;
  }

  const userId = user?.id;

  const { data: userRole, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("supabase 에러: ", error);
    return false;
  }

  if (!userRole || userRole.role !== 1) {
    alert("권한이 없습니다.");
    window.location.href = "/";
    return false;
  }

  return true;
}
