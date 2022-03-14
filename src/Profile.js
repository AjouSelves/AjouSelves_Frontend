import React, { useEffect, useState } from "react";

<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>;

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  // const { Kakao } = window;

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  // function logout_with_kakao() {
  //   if (Kakao.Auto.getAccessToken()) {
  //     console.log("카카오 인증 access token이 존재합니다.");
  //     Kakao.Auth.getAccessToken();
  //     Kakao.API.request({
  //       url: "/v1/user/unlink",
  //       success: function (response) {
  //         console.log(response);
  //       },
  //       fail: function (error) {
  //         console.log(error);
  //       },
  //     });
  //     Kakao.Auth.setAccessToken(undefined);
  //   }
  // }

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <h2>{user_id}</h2>
      <h2>{nickName}</h2>
      <img src={profileImage} alt=""></img>
      {/* <h2>
        <a href="http://localhost:3000" onClick={logout_with_kakao}>
          Logout
        </a>
      </h2> */}
    </div>
  );
};

export default Profile;
