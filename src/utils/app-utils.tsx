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

function formatTimestamp(timestamp: string | Date) {
  var date = new Date(timestamp);
  return date.toLocaleString("en-US");
}

function calculateDeadline(): Date {
  const currentDate = new Date();
  const deadline = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  return deadline;
}

export { checkTokenValidity, formatTimestamp, calculateDeadline };
