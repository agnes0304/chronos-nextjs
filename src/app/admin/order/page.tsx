const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
type order = {
  id: number;
  email: string;
  product: string;
  price: number;
  createdAt: string;
  isConfirm: boolean;
};

async function getOrderQueue() {
  try {
    const res = await fetch(`${baseUrl}/queue`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
    // [{'id': 2, 'created_at': '2023-11-27T03:39:27.545984+00:00', 'product': 'test', 'email': 'test@gmail.com', 'price': 1000, 'isConfirm': False}, {'id': 3, 'created_at': '2023-11-27T03:40:51.060711+00:00', 'product': 'test', 'email': 'test01@gmail.com', 'price': 1000, 'isConfirm': False},
  } catch (error) {
    console.log("getOrderQueue 내부 에러: ", error);
  }
}

const OrderPage = async () => {
  let data: order[] = [];
  try {
    data = await getOrderQueue();
    console.log(data);
  } catch (error) {
    console.log("An error occurred:", error);
  }

  return (
    <div>
      <h1>입금확인 요청 내역</h1>
      {data.map((order, index) => {
        return (
          <div key={index}>
            <p>id: {order.id}</p>
            <p>email: {order.email}</p>
            <p>product: {order.product}</p>
            <p>price: {order.price}</p>
            <p>createdAt: {order.createdAt}</p>
            <p>isConfirm: {order.isConfirm}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderPage;
