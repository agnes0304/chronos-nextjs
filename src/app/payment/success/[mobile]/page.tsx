const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type s3Url = {
  url: string[];
};

// params의 key로 get요청을 보내서 해당 mobile을 가진 order를 찾아서 그 order의 product를 보여줌.
// /orders로 GET요청 body에 params.mobile
async function getOrder(mobile: string) {
  try {
    // http request body에 params.mobile -> fetch로 get요청
    const res = await fetch(`${baseUrl}/orders`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hashed_mobile: mobile }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("getOrder 내부 에러: ", error);
  }
}

const CompletePaymentData = async ({
  params,
}: {
  params: { mobile: string };
}) => {
  let data: Order = {
    id: 0,
    product: "",
    mobile: "",
    price: 0,
    createdAt: "",
  };
  try {
    if (params.mobile) {
      data = await getOrder(params.mobile);
      console.log(data);
    } else {
      throw new Error("파라미터 잘못됨.");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }

  return (
    <div>
      <h1>결제하신 상품입니다.</h1>
      <h2>주의사항</h2>
      <p>
        결제하신 상품은 1회에 한해 다운로드가 가능하며, 링크의 유효기간은
        1일입니다.
      </p>
      <p>본 페이지 링크의 유효기간 또한 1일입니다.</p>
    </div>
  );
};

export default CompletePaymentData;
