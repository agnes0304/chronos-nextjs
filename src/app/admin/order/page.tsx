"use client";
import { useState, useEffect } from "react";
import AdminConfirmBtn from "@/components/admin/AdminConfirmBtn";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { checkUserAuthorization } from "@/components/admin/CheckAuth";

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
    const authorizeAndFetch = async () => {
      const isAuthorized = await checkUserAuthorization();
      if (isAuthorized) {
        fetchData();
      }
    };

    authorizeAndFetch();
  }, []);

  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-600">
            입금 확인 요청 리스트
          </h1>
          <div className="flex gap-2">
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/posts")}
            >
              포스트 관리
            </button>
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin")}
            >
              관리자 메인
            </button>
          </div>
        </div>

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
