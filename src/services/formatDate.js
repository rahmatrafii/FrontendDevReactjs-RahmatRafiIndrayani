export const formatDate = (date) => {
  const dateObject = new Date(date);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = dateObject.toLocaleString("en-US", options);
  return formattedDate;
};
