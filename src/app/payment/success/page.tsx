"use client";
// import { useRouter } from "next/router"; 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HashMobile } from "@/components/payment/HashMobile";
import ExpirationConfirm from "@/components/payment/ExpirationConfirm";
import GetMobileNum from "@/components/payment/GetMobileNum";

const Success = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const lookUpHandler = () => {
    if (mobile) {
      const hashedMobile = HashMobile(mobile);
      router.push(`/payment/success/${hashedMobile}`);
    }
  };

  useEffect(() => {
    if (mobile) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [mobile]);

  return (
    <>
      {confirmChecked ? (
        <GetMobileNum
          mobile={mobile}
          setMobile={setMobile}
          isDisabled={isDisabled}
          lookUpHandler={lookUpHandler}
          setConfirmChecked={setConfirmChecked}
        />
      ) : (
        <ExpirationConfirm setConfirmChecked={setConfirmChecked} />
      )}
    </>
  );
};

export default Success;
