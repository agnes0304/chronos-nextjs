"use client";
// import { useRouter } from "next/router"; 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ExpirationConfirm from "@/components/payment/ExpirationConfirm";
import GetPersonalInfo from "@/components/payment/GetPersonalInfo";

const Success = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const lookUpHandler = () => {
    if (email) {
      router.push(`/payment/success/${email}`);
    }
  };

  useEffect(() => {
    if (email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  return (
    <>
      {confirmChecked ? (
        <GetPersonalInfo
          email={email}
          setEmail={setEmail}
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
