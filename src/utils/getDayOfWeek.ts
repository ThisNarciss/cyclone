export const getDayOfWeek = (day: string) => {
  const date = new Date(day);
  const dayNum = date.getDay();
  console.log(dayNum);

  return dayNum as number;
};
