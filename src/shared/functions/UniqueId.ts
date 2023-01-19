export const getUniqueId = (size: number) => {
  if (size > 5) return (Math.random() + 1).toString(36).substring(2, size);
  else return "Size must be larger than 5";
};
