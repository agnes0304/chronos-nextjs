"use client";
import { useState, useEffect, use } from "react";
import AdminConfirmBtn from "@/components/admin/AdminConfirmBtn";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { supabase } from "@/components/admin/SupaClient";

type Order = {
  id: number;
  email: string;
  product: string;
  price: number;
  createdAt: string;
  isConfirm: boolean;
};

async function getOrderQueue() {
  try {
    const res = await fetch(`${baseUrl}/queue`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("getOrderQueue 내부 에러: ", error);
  }
}

async function confirmOrder(id: number, email: string) {
  try {
    const res = await fetch(`${baseUrl}/queue/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const confirmed = await res.json();
    if (confirmed.message === "success") {
      sendEmail(email);
      location.reload();
    }
    return alert(confirmed.message);
  } catch (error) {
    console.log("confirmOrder 내부 에러: ", error);
  }
}

async function sendEmail(email: string) {
  try {
    const res = await fetch(`${baseUrl}/email/${email}`, {
      method: "GET",
    });
    const result = await res.json();

    if (result.message === "sent") {
      return "메일 전송에 성공했습니다";
    }
    return "메일 전송에 실패했습니다";
  } catch (error) {
    console.log("sendEmail 내부 에러: ", error);
  }
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchData = async () => {
    try {
      const orderdata = await getOrderQueue();
      setOrders(orderdata);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const checkUserAuthorization = async () => {
      const { data: session } = await supabase.auth.getSession();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 확인했음
      if (session.session === null) {
        alert("로그인이 필요합니다");
        window.location.href = "/admin";
      }

      const userId = user?.id;

      try {
        const { data: userRole } = await supabase
          .from("users")
          .select("role")
          .eq("uid", userId)
          .maybeSingle();

        if (userRole && userRole.role !== 1) {
          alert("권한이 없습니다.");
          window.location.href = "/";
          return;
        }
      } catch (error) {
        console.log("supabase 가져오는 try catch 에러: ", error);
      }

      fetchData();
    };

    checkUserAuthorization();
  }, []);

  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">
          입금확인 요청 내역
        </h1>
        <table className="w-full">
          <thead className="text-white text-sm font-normal uppercase bg-indigo-500">
            <tr>
              <td className="py-1 border text-center p-4">ID</td>
              <td className="py-1 border text-center p-4">Email</td>
              <td className="py-1 border text-center p-4">Product</td>
              <td className="py-1 border text-center p-4">Price</td>
              <td className="py-1 border text-center p-4">Confirm</td>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {orders.length === 0 && (
              <tr className="text-center border-b">
                <td className="py-1">.</td>
                <td className="py-1">.</td>
                <td className="py-1">
                  <p>주문 내역이 없습니다</p>
                </td>
                <td className="py-1">.</td>
                <td className="py-1">
                  <div className="w-full flex justify-center items-center">
                    .
                  </div>
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order.id} className="text-center border-b">
                <td className="py-1">{order.id}</td>
                <td className="py-1">{order.email}</td>
                <td className="py-1">{order.product}</td>
                <td className="py-1">{order.price}</td>
                <td className="py-1">
                  <div className="w-full flex justify-center items-center">
                    <AdminConfirmBtn
                      orderId={order.id}
                      orderEmail={order.email}
                      confirmOrder={confirmOrder}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
