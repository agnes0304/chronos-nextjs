"use client";
import { useEffect, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Payment = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const productName = searchParams.product;
  const [email, setEmail] = useState("");
  const [productPrice, setproductPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const product = searchParams.product; 
    const body = { name: product };

    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/product`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data); // {id: 1, name: 'test', price: 1000}
        const price = data.price;
        setproductPrice(price);
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (email) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email]);

  const submitHandler = async () => {
    try {
      const body = { goodname: {productName}, price: {productPrice}, email: {email} };
      const response = await fetch(`${baseUrl}/paying_payapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex flex-col w-[90vw] justify-center items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">
          이메일을 입력해주세요!
        </h1>
        <p className="text-base font-light text-gray-700">
          입력하신 이메일로{" "}
          <span className="text-rose-500 font-normal">입금 및 주문내역 확인</span>이
          가능합니다.
        </p>
        <div className="w-full">
          <h2 className="text-base font-medium text-gray-400 mb-1">주문서</h2>
          <div className="w-full border-b border-t border-gray-400">
            <table className="text-sm text-gray-500 font-normal">
              <tbody>
                <tr>
                  <td className="p-4 text-center">판매자명</td>
                  <td className="p-4 text-center">화석</td>
                </tr>
                <tr>
                  <td className="p-4 text-center">상품명</td>
                  <td className="p-4 text-center">{productName}</td>
                </tr>
                <tr>
                  <td className="p-4 text-center">가격</td>
                  <td className="p-4 text-center">{productPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form
        //   onSubmit={submitHandler}
          name="결제폼"
          className="flex flex-col gap-4"
        >
          <input
            className="p-2 px-3 border border-gray-400 rounded-full w-[320px]"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <button
          type="button"
          onClick={submitHandler}
          className={`${
            !isActive
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400"
          } h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out`}
          disabled={!isActive}
        >
          결제하기
        </button>
        {/* <a href="#" id="payButton">결제하기 테스트</a> */}
      </div>
    </div>
  );
};

export default Payment;
