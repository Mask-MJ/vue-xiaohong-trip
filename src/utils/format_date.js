import dayjs from "dayjs";

export function formatMonthDay(date, formatStr = "MM月DD日") {
  //format:默认值为"MM月DD日"
  //当传入的date为其他格式时，需要指定formatStr
  return dayjs(date).format(formatStr);
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'day');
}