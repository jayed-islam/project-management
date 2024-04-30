const checkTokenValidity = (): boolean => {
  const tokenData: string | null = localStorage.getItem("token");
  const tokenExpiryData: string | null = localStorage.getItem("tokenExpiry");

  if (!tokenData || !tokenExpiryData) {
    return false;
  }

  const tokenExpiry: number = parseInt(tokenExpiryData);
  const currentTime: number = new Date().getTime();

  if (currentTime > tokenExpiry) {
    return false;
  }

  const token: string = tokenData;

  if (token !== "myMocktoken") {
    return false;
  }
  return true;
};

export { checkTokenValidity };
