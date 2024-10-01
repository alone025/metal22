export default function formatDateString(
  dateString: string,
  timeZone = 'Europe/Moscow'
) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone,
  });

  return formatter.format(date);
}
