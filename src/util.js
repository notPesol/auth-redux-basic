export const calculateExpireTime = (expireTime) => {
  const currentTime = Date.now();
  const expiresIn = new Date(new Date(expireTime)).getTime();
  return expiresIn - currentTime;
};

export const removeFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
};

export const logoutHandler = (dispath, action) => {
  dispath(action());
  removeFromStorage();
};

export const saveToStorage = (data) => {
  localStorage.setItem("token", data.idToken);
  const expiresIn = new Date(Date.now() + +data.expiresIn * 1000);
  localStorage.setItem("expiresIn", expiresIn);
};
