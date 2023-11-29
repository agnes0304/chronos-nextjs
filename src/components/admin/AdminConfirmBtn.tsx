type ConfirmButtonProps = {
  orderId: number;
  orderEmail: string;
  confirmOrder: (orderId: number, orderEmail:string) => void;
};

const AdminConfirmBtn: React.FC<ConfirmButtonProps> = ({
  orderEmail,
  orderId,
  confirmOrder,
}) => {
  return (
    <button
      className="bg-rose-300 text-white hover:bg-rose-400 active:bg-rose-400 h-[36px] w-[80px] p-2 border rounded-full text-sm flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
      onClick={() => confirmOrder(orderId, orderEmail)}
    >
      확인
    </button>
  );
};

export default AdminConfirmBtn;
