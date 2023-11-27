"use client";
import { useState, useEffect } from "react";
import AdminConfirmBtn from "@/components/admin/AdminConfirmBtn";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    // [{'id': 2, 'created_at': '2023-11-27T03:39:27.545984+00:00', 'product': 'test', 'email': 'test@gmail.com', 'price': 1000, 'isConfirm': False}, {'id': 3, 'created_at': '2023-11-27T03:40:51.060711+00:00', 'product': 'test', 'email': 'test01@gmail.com', 'price': 1000, 'isConfirm': False},
  } catch (error) {
    console.log("getOrderQueue 내부 에러: ", error);
  }
}

async function confirmOrder(id: number) {
  try {
    const res = await fetch(`${baseUrl}/queue/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const confirmed = await res.json();
    console.log(confirmed);
    // reload
    location.reload();
    return confirmed;
  } catch (error) {
    console.log("confirmOrder 내부 에러: ", error);
  }
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderdata = await getOrderQueue();
        setOrders(orderdata);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchData();
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
                      onConfirm={confirmOrder}
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
