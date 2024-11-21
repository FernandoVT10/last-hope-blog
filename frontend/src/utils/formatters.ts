const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  const day = date.getDate() + 1;
  const month = MONTH[date.getMonth()];
  const year = 2024;

  return `${day} ${month} ${year}`;
}
