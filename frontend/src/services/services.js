import { apiDomain } from "../config";

export const googleLogin = () => {
  window.location.href = `${apiDomain}/auth/google`;
};
export const logout = () => {
  window.location.href = `${apiDomain}/user/logout`;
};
