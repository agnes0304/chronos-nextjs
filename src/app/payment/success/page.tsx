import axios from "axios"
const baseurl = process.env.NEXT_PUBLIC_BASE_URL

// 어떻게 구매한 파일의 다운로드 링크를 받아올지

const Success = () => {

    return (
        <div>
            <h1>결제를 완료하셨다면 주문 시 입력한 핸드폰 번호를 입력 후 아래 다운로드 버튼을 눌러주세요!</h1>
            <input type="text" placeholder="핸드폰 번호"></input>
            <button>다운로드</button>
        </div>
    )
}

export default Success