type FDateProps = {
  dateStr: string;
};

export default function Fdate({ dateStr } : FDateProps) {
  const date = new Date(dateStr);

  const formattedDate = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

  return (
      <p>{formattedDate} {formattedTime}</p>
  );
}
