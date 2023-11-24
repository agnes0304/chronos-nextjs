"use client";
import { useEffect } from "react";
const userid = process.env.PAYAPP_USERID;
const shopname = process.env.PAYAPP_SHOPNAME;
const returnUrl = process.env.PAYAPP_RETURNURL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

declare var PayApp: any;

const Payment = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  useEffect(() => {
    const product = searchParams.product;
    const body = { name: product };
    const data = fetch(`${baseUrl}/product`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => data);
    console.log(data);
    const price = data.then((data) => data.price);

    // 페이앱 결제창 불러오기
    const script = document.createElement("script");
    script.src = "//lite.payapp.kr/public/api/payapp-lite.js";
    script.async = true;

    script.onload = () => {
      PayApp.setDefault("userid", userid);
      PayApp.setDefault("shopname", shopname);
    };

    document.body.appendChild(script);

    function payappPay() {
      PayApp.setParam("goodname", searchParams.product);
      PayApp.setParam("price", price);
      PayApp.setParam("recvphone", "01000000000");
      PayApp.setParam("returnurl", returnUrl);
      PayApp.setParam("smsuse", "n");
      PayApp.setParam("redirectpay", "1");
      PayApp.setParam("skip_cstpage", "y");
      PayApp.call();
    }

    const payButton = document.getElementById("payButton");
    payButton?.addEventListener("click", payappPay);

    return () => {
      document.body.removeChild(script);
      payButton?.removeEventListener("click", payappPay);
    };
    // 필수 파라미터 누락으로 나옴
  }, []);

  return (
    <div>
      <h1>결제창</h1>
      <a href="#" id="payButton">
        결제하기
      </a>
    </div>
  );
};

export default Payment;
