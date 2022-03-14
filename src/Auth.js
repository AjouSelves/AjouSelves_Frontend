import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const REST_API_KEY = "f9f1df64f45106996eef35693c66965e";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const CLIENT_SECRET = "	T7DdcbBIECyAD7ZFhVKjwD1uC9l5lvce";

  const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";

  // callback으로 받은 인가 코드
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      // access token 가져오기
      const res = await axios.post(
        KAKAO_OAUTH_TOKEN_API_URL,
        // BE에 get 방식을 받을 수 있는 url
        //`${KAKAO_OAUTH_TOKEN_API_URL}?grant_type="authorization_code"&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`
        payload
      );

      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      // history.replace("/profile");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};

export default Auth;
