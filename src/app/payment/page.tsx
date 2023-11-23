"use client";
import { useEffect } from 'react';
const userid = process.env.PAYAPP_USERID;
const shopname = process.env.PAYAPP_SHOPNAME;
const returnUrl = process.env.PAYAPP_RETURNURL;

declare var PayApp: any;

const Payment = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//lite.payapp.kr/public/api/payapp-lite.js';
    script.async = true;

    script.onload = () => {
      PayApp.setDefault('userid', userid); // 필수
      PayApp.setDefault('shopname', shopname); // 필수
    };

    document.body.appendChild(script);

    function payappPay() {
      PayApp.setParam('goodname', 'test good');
      PayApp.setParam('price', '1000');
    //   어떻게 price 전달할지.
      PayApp.setParam('recvphone', '01000000000');
      PayApp.setParam('returnurl', returnUrl);
      PayApp.setParam('smsuse', 'n');
      PayApp.setParam('redirectpay', '1');
      PayApp.setParam('skip_cstpage', 'y');
      PayApp.call();
    }

    const payButton = document.getElementById('payButton');
    payButton?.addEventListener('click', payappPay);

    return () => {
      document.body.removeChild(script);
      payButton?.removeEventListener('click', payappPay);
    };
  }, []);

  return (
    <div>
      <h1>결제창</h1>
      <a href="#" id="payButton">결제하기</a>
    </div>
  );
};

export default Payment;
