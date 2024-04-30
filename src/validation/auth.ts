export const validatePassword = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Password is required"));
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one symbol")
    );
  }
  if (!/[A-Z]+/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one uppercase letter")
    );
  }
  if (!/[0-9]+/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one number")
    );
  }
  return Promise.resolve();
};
