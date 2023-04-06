const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function formatDate(dateString) {
  if (dateString === "PRESENT") return dateString;
  const date = new Date(dateString);
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${months[month]} ${year}`;
}
