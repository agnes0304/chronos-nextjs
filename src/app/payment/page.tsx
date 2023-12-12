"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import PayActions from "@/components/payment/PayActions";
import Kakaobadge from "@/components/payment/Kakaobadge";
import Tossbadge from "@/components/payment/Tossbadge";

const Payment = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
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

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.preventDefault();
    if (!isActive) return;

    // TODO: 유저 기기가 모바일 크롬 그리고 데스크톱 웹인 경우 클립보드 복사, 붙여넣기를 지원하기. 그렇지 않은 경우는 기존과 동일.
    const copyToClipboardFallback = (url: string) => {
      const textarea = document.createElement("textarea");
      textarea.textContent = url;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
  
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          alert(`링크가 복사되었습니다. 모바일에서 새 탭으로 열어주세요! ${url}`);
        } else {
          console.error("Copy command was unsuccessful");
        }
      } catch (err) {
        console.error("Fallback copy method failed", err);
      }
  
      document.body.removeChild(textarea);
    };
  
    const copyToClipboard = async () => {
      const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || '/';
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(kakaoUrl);
          alert("링크가 복사되었습니다. 모바일 새 탭에서 열어주세요!");
        } else {
          copyToClipboardFallback(kakaoUrl);
        }
      } catch (err) {
        console.error("링크 복사에 실패했습니다.", err);
        copyToClipboardFallback(kakaoUrl);
      }
    };


    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileChrome = /chrome/i.test(userAgent) && /mobile/i.test(userAgent);
    const isDesktop = !/mobile/i.test(userAgent);

    if (isMobileChrome || isDesktop) {
      copyToClipboard();
    } else {
      window.open(url, "_blank");
    }

    // 주문자 정보 서버로 전송
    try {
      const body = {
        product: productName,
        price: productPrice,
        email: email,
      };
      const response = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!data) {
        throw new Error("Network response was not ok");
      }

      setTimeout(() => {
        router.push("/payment/confirm");
      }, 8000);
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
        <p className="text-base font-normal text-gray-500">
          입력하신 이메일로{" "}
          <span className="text-rose-500 font-medium">
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
        <form name="결제폼" className="flex flex-col gap-4">
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
              이메일 오타 여부를 확인했습니다.
            </label>
          </div>
        </form>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-normal text-gray-500">
            · 송금은 <span className="font-medium text-rose-500">모바일</span>
            에서 진행해주세요!
          </p>
          <div className="flex flex-wrap">
            <span className="text-sm font-normal text-gray-500">· </span>
            <Kakaobadge />{" "}
            <p className="text-sm font-normal text-gray-500">혹은</p>{" "}
            <Tossbadge />
            <p className="text-sm font-normal text-gray-500">
              에는 꼭{" "}
              <span className="font-medium text-rose-500">@제외 주소</span>를
              적어주세요!
            </p>
          </div>
          <p className="text-sm font-normal text-gray-500">
            ※ 예시: sample@naver.com → &apos;sample&apos;
          </p>
          <p className="text-sm font-normal text-gray-500">
            · 버튼 클릭 시 이동하는 주소를 복사해서 사용할 수 있습니다.
          </p>
          <p className="text-sm font-normal text-gray-500">
            · 송금 후에는 꼭 확인 버튼을 눌러주세요!
          </p>
        </div>
        <PayActions isActive={isActive} submitHandler={submitHandler} />
      </div>
    </div>
  );
};

export default Payment;
