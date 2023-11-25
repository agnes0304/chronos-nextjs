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

const DownloadData = async ({ params }: { params: { mobile: string } }) => {
  let data: s3Url = { url: [] };
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
    <div className="flex flex-col w-[90vw] justify-center items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">
          구매하신 자료입니다.
        </h1>
        <p className="text-sm text-gray-500">
          아래 링크를 <span className="text-rose-500 font-semibold">전부</span> 눌러 다운로드 받아주세요.
        </p>
        <div>
          <ul className="text-gray-500 font-light text-md">
            <li className="mb-1">자료 다운로드 링크 여기에 들어감</li>
            <li className="mb-1">자료 다운로드 링크 여기에 들어감</li>
            <li className="mb-1">자료 다운로드 링크 여기에 들어감</li>
            <li className="mb-1">자료 다운로드 링크 여기에 들어감</li>
            <li>자료 다운로드 링크 여기에 들어감</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadData;
