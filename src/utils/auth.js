export const getToken = () => {
  const userDetails = localStorage.getItem("UserDetails");
  if (userDetails) {
    const parsedDetails = JSON.parse(userDetails);
    return parsedDetails.token;
  }
  return null;
};
