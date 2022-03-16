export const timeFormatter = (date: string) => {
  const sourceDate = new Date(date);
  return `${sourceDate.toLocaleDateString()} ${sourceDate.toLocaleTimeString()}`;
};
