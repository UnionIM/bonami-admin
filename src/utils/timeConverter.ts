export function timeConverter(UNIX_timestamp: number) {
  const date = new Date(UNIX_timestamp);
  const months = [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Січ",
    "Вер",
    "Жов",
    "Лис",
    "Гру",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return (
    (day >= 10 ? day : "0" + day) +
    " " +
    month +
    " " +
    year +
    " " +
    (hour >= 10 ? hour : "0" + hour) +
    ":" +
    (min >= 10 ? min : "0" + min) +
    ":" +
    (sec >= 10 ? sec : "0" + sec)
  );
}
