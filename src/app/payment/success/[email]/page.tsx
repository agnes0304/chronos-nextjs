const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

type s3Url = {
  urls: string[];
};

async function getOrder(email: string) {
  try {
    const res = await fetch(`${baseUrl}/orders/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Cache-Control': 'no-store' },
      cache: 'no-store',
    },
    
    );
    const data = await res.json();

    if (data[1]?.message === "success") {
      return data[0];
    } 
    return { urls: [] };
  } catch (error) {
    console.log("getOrder 내부 에러: ", error);
    throw error;
  }
}

const DownloadData = async ({ params }: { params: { email: string } }) => {
  let data: s3Url = { urls: [] };
  try {
    if (params.email) {
      data = await getOrder(params.email);
      console.log(data);
    } else {
      throw new Error("파라미터 잘못됨.");
    }
  } catch (error) {
    console.log("An error occurred:", error);
    throw error;
  }

  return (
    <div className="flex flex-col w-[90vw] justify-center items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">
          구매하신 자료입니다.
        </h1>
        <p className="text-sm text-gray-500">
          아래 링크를 <span className="text-rose-500 font-semibold">전부</span>{" "}
          눌러 다운로드 받아주세요.
        </p>
        <div>
          <ul className="text-gray-500 font-base text-md">
            {/* urls가 비어있으면 만료되었습니다. 메세지 띄우기*/}
            {data.urls.length === 0 ? (
              <>
              <li className="mb-1 w-full">다운로드 링크가 만료되었습니다.</li>
              <li className="w-full">궁금하신 점은 chronos9734@gmail.com로 문의주세요</li>
              </>
            ) : (
              data.urls.map((url, index) => {
                return (
                  <li key={index} className="mb-1 w-full">
                    <a
                      className="text-indigo-400 hover:text-indigo-600 w-full"
                      href={url}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faFileArrowDown} /> {index + 1}번
                      자료입니다. ({index + 1}/{data.urls.length})
                    </a>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadData;
