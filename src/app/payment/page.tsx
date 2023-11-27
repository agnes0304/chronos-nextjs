"use client";
import { useEffect, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import PayActions from "@/components/payment/PayActions";

// test url: http://localhost:3000/payment?product=test
const Payment = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const productName = searchParams.product;
  const [email, setEmail] = useState("");
  const [productPrice, setproductPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCheck, setIsCheck] = useState(false);


  useEffect(() => {
    const product = searchParams.product;
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/product/${product}`, {
          method: "GET",
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
    if (email && isCheck) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, isCheck]);

  const submitHandler = async () => {
    try {
      const body = {
        goodname: { productName },
        price: { productPrice },
        email: { email },
      };
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
          <span className="text-rose-500 font-normal">
            입금 및 주문내역 확인
          </span>
          이 가능합니다.
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
          name="결제폼"
          className="flex flex-col gap-4"
        >
          <input
            className="p-2 px-3 border border-gray-400 rounded-full w-[320px]"
            type="email"
            name="email"
            placeholder="@를 포함한 이메일 전체를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-1">
            <input
              type="checkbox"
              name="confirm"
              id="confirm"
              onClick={() => setIsCheck(!isCheck)}
            />
            <label
              htmlFor="confirm"
              className="text-sm font-normal text-gray-500"
            >
              이메일의 오타 여부를 확인해주세요.
            </label>
          </div>
        </form>
        <PayActions isActive={isActive} submitHandler={submitHandler} />
      </div>
    </div>
  );
};

export default Payment;
