import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  getUserInfo,
  deleteUser,
  getJoinTitle,
  passwordVerify,
} from "../../_actions/user_actions";
import UserInfo from "../../components/view/MyPageInfo/UserInfo";

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: 20px 10px;
  cursor: pointer;
`;

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userInfo, setUserInfo] = useState();

  let header = {
    headers: {
      Authorization: state,
    },
  };

  useEffect(() => {
    let isLoading = true;
    dispatch(getUserInfo(header)).then((res) => {
      if (isLoading) {
        setUserInfo(res.payload.data[0]);
      }
    });

    dispatch(getJoinTitle(header)).then((res) => {
      // console.log(res.payload.data);
    });

    return () => (isLoading = false);
  }, []);

  const [chkButton, setChkButton] = useState(0);
  const [currPass, setCurrPass] = useState("");
  const [chkPassword, setChkPassword] = useState(false);
  const [chkPasswordDel, setChkPasswordDel] = useState(false);

  const deleteHandler = () => {
    if (chkPassword || chkPasswordDel) {
      dispatch(deleteUser(header)).then((res) => {
        console.log(res);
        if (res.payload.status === "success") {
          alert("회원탈퇴 되었습니다!");
          localStorage.clear();
          navigate("/");
          window.location.reload();
        } else {
          alert("error!");
          navigate("/");
        }
      });
    }
  };

  const passVeri = (e) => {
    e.preventDefault();
    let body = { password: currPass };
    console.log(body);
    console.log(header);

    dispatch(passwordVerify(body, header)).then((res) => {
      console.log(res);
      if (res.payload.status === "succes") setChkPassword(true);
      else if (res.payload.status === "fail")
        alert("현재 비밀번호가 올바르지 않습니다!");
    });
  };

  const passVeriDel = (e) => {
    e.preventDefault();
    let body = { password: currPass };
    console.log(body);
    console.log(header);

    dispatch(passwordVerify(body, header)).then((res) => {
      console.log(res);
      if (res.payload.status === "succes") {
        setChkPasswordDel(true);
        deleteHandler();
      } else if (res.payload.status === "fail")
        alert("현재 비밀번호가 올바르지 않습니다!");
    });
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "1000px",
          height: "500px",
          margin: "0 auto",
          paddingTop: "36px",
        }}
      >
        <aside
          style={{
            width: "150px",
            marginRight: "0",
            float: "left",
            background: "#fbfafa",
          }}
        >
          <StyledButton
            onClick={() => {
              setChkButton(2);
            }}
          >
            내가 참여한 굿즈
          </StyledButton>
          <StyledButton
            onClick={() => {
              setChkButton(3);
            }}
          >
            내가 제작한 굿즈
          </StyledButton>
          <StyledButton
            onClick={() => {
              setChkButton(1);
            }}
          >
            회원정보수정
          </StyledButton>
          <StyledButton
            onClick={() => {
              alert("아직 결제 완료된 굿즈가 없습니다!");
            }}
          >
            결제 완료 굿즈
          </StyledButton>
          <StyledButton
            onClick={() => {
              setChkButton(4);
            }}
          >
            회원 탈퇴하기
          </StyledButton>
          {/* onClick={deleteHandler} */}
        </aside>
        {userInfo && chkButton === 0 && <div>main</div>}
        {userInfo && chkButton === 1 && !chkPassword && (
          <div style={{ width: "830px", float: "right" }}>
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <form>
                <label>비밀번호를 입력해주세요.</label>
                <br />
                <br />
                <input
                  type="password"
                  onChange={(e) => {
                    setCurrPass(e.currentTarget.value);
                  }}
                ></input>
                <button onClick={passVeri}>확인</button>
              </form>
            </div>
          </div>
        )}
        {userInfo && chkButton === 1 && chkPassword && (
          <div style={{ width: "830px", float: "right" }}>
            <UserInfo props={userInfo} />
          </div>
        )}
        {userInfo && chkButton === 2 && <div>user info is here 2</div>}
        {userInfo && chkButton === 3 && <div>user info is here 3</div>}
        {userInfo && chkButton === 4 && (
          <div style={{ width: "830px", float: "right" }}>
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <form>
                <label>비밀번호를 입력해주세요.</label>
                <br />
                <br />
                <input
                  type="password"
                  onChange={(e) => {
                    setCurrPass(e.currentTarget.value);
                  }}
                ></input>
                <button onClick={passVeriDel}>확인</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
