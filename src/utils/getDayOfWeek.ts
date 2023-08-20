export const getDayOfWeek = (day: string) => {
  const date = new Date(day);
  return date.getDay() as number;
};
