import React from "react";

const Logout = () => {
  const REST_API_KEY = "f9f1df64f45106996eef35693c66965e";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const CLIENT_SECRET = "	T7DdcbBIECyAD7ZFhVKjwD1uC9l5lvce";

  const LOGOUT_REDIRECT_URI = "https://getpostman.com/logout";
  const LOGOUT_URI = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
};

export default Logout;
