import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  getUserInfo,
  deleteUser,
  getJoinTitle,
  getCreateTitle,
  passwordVerify,
} from "../../_actions/user_actions";
import { projGetAll } from "../../_actions/goods_actions";
import { SERVER_URL } from "../../_actions/types";
import thumbnail from "../../images/thumbnail.jpeg";
import UserInfo from "../../components/view/MyPageInfo/UserInfo";

const Card = styled.div`
  padding: 20px;

  cursor: pointer;
`;

const StyledButton = styled.button`
  width: 100%;
  border: none;
  padding: 20px 10px;
  cursor: pointer;
`;

const StyledButtonSmall = styled.button`
  border: none;
  background: #24272b;
  color: white;
  cursor: pointer;
`;

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userInfo, setUserInfo] = useState();
  const [GoodsList, setGoodsList] = useState();

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

    return () => (isLoading = false);
  }, []);

  const [chkButton, setChkButton] = useState(1);
  const [currPass, setCurrPass] = useState("");
  const [chkPassword, setChkPassword] = useState(false);
  const [chkPasswordDel, setChkPasswordDel] = useState(false);

  const deleteHandler = () => {
    if (chkPassword || chkPasswordDel) {
      dispatch(deleteUser(header)).then((res) => {
        // console.log(res);
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
    // console.log(body);
    // console.log(header);

    dispatch(passwordVerify(body, header)).then((res) => {
      // console.log(res);
      if (res.payload.status === "succes") setChkPassword(true);
      else if (res.payload.status === "fail")
        alert("현재 비밀번호가 올바르지 않습니다!");
    });
  };

  const passVeriDel = (e) => {
    e.preventDefault();
    let body = { password: currPass };
    // console.log(body);
    // console.log(header);
    alert();

    dispatch(passwordVerify(body, header)).then((res) => {
      // console.log(res);
      if (res.payload.status === "succes") {
        setChkPasswordDel(true);
        deleteHandler();
      } else if (res.payload.status === "fail")
        alert("현재 비밀번호가 올바르지 않습니다!");
    });
  };

  const [JoinedList, setJoinedList] = useState("");
  const [CreatedList, setCreatedList] = useState("");

  useEffect(() => {
    dispatch(getJoinTitle(header)).then((res) => {
      if (res.payload.status === "fail") setJoinedList(1);
      else {
        // console.log(res.payload.data);
        setJoinedList(res.payload.data);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getCreateTitle(header)).then((res) => {
      if (res.payload.status === "fail") setCreatedList(1);
      else {
        // console.log(res.payload.data);
        setCreatedList(res.payload.data);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(projGetAll()).then((res) => {
      setGoodsList(res.payload);
    });
  }, []);

  if (!JoinedList || !CreatedList) return null;

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
        <div
          style={{
            width: "150px",
            marginRight: "0",
            float: "left",
            background: "#fbfafa",
          }}
        >
          <StyledButton
            className={chkButton === 1 ? "active" : "unactive"}
            onClick={() => {
              setChkButton(1);
              if (JoinedList === 1) alert("참여하신 굿즈가 없습니다!");
            }}
          >
            내가 참여한 굿즈
          </StyledButton>
          <StyledButton
            className={chkButton === 2 ? "active" : "unactive"}
            onClick={() => {
              setChkButton(2);
              if (CreatedList === 1) alert("제작하신 굿즈가 없습니다!");
            }}
          >
            내가 제작한 굿즈
          </StyledButton>
          <StyledButton
            className={chkButton === 3 ? "active" : "unactive"}
            onClick={() => {
              setChkButton(3);
            }}
          >
            회원정보수정
          </StyledButton>
          <StyledButton
            className={chkButton === 4 ? "active" : "unactive"}
            onClick={() => {
              setChkButton(4);
              alert("아직 결제 완료된 굿즈가 없습니다!");
            }}
          >
            결제 완료 굿즈
          </StyledButton>
          <StyledButton
            className={chkButton === 5 ? "active" : "unactive"}
            onClick={() => {
              setChkButton(5);
            }}
          >
            회원 탈퇴하기
          </StyledButton>
        </div>
        {userInfo && chkButton === 1 && JoinedList !== 1 && (
          <div
            style={{
              width: "830px",
              float: "right",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr ",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "500",
                borderBottom: "1px solid black",
                paddingBottom: "10px",
                gridColumn: "1/4",
              }}
            >
              내가 참여한 굿즈
            </div>
            {JoinedList.map((JoinedList) => (
              <Card
                key={JoinedList.projid}
                onClick={() => {
                  navigate("/goods/info", { state: JoinedList.projid });
                }}
              >
                {JoinedList.url ? (
                  <img
                    alt="no_image"
                    src={`${SERVER_URL}${JoinedList.url}`}
                    width="300px"
                    height="300px"
                  />
                ) : (
                  <img
                    alt="thumbnail"
                    src={thumbnail}
                    width="200px"
                    height="200px"
                  />
                )}
                <div>
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        marginTop: "10px",
                      }}
                    >
                      {JoinedList.title}
                    </div>
                    <div>{JoinedList.nickname}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {userInfo && chkButton === 2 && CreatedList !== 1 && (
          <div
            style={{
              width: "830px",
              float: "right",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr ",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "500",
                borderBottom: "1px solid black",
                paddingBottom: "10px",
                gridColumn: "1/4",
              }}
            >
              내가 제작한 굿즈
            </div>
            {CreatedList.map((CreatedList) => (
              <Card
                key={CreatedList.projid}
                onClick={() => {
                  navigate("/goods/info", { state: CreatedList.projid });
                }}
              >
                {CreatedList.url ? (
                  <img
                    alt="no_image"
                    src={`${SERVER_URL}${CreatedList.url}`}
                    width="300px"
                    height="300px"
                  />
                ) : (
                  <img
                    alt="thumbnail"
                    src={thumbnail}
                    width="200px"
                    height="200px"
                  />
                )}
                <div>
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        marginTop: "10px",
                      }}
                    >
                      {CreatedList.title}
                    </div>
                    <div>{CreatedList.nickname}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {userInfo && chkButton === 3 && !chkPassword && (
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
                <StyledButtonSmall onClick={passVeri}>확인</StyledButtonSmall>
              </form>
            </div>
          </div>
        )}
        {userInfo && chkButton === 3 && chkPassword && (
          <div style={{ width: "830px", float: "right" }}>
            <UserInfo props={userInfo} />
          </div>
        )}
        {userInfo && chkButton === 4 && (
          <div style={{ width: "830px", float: "right" }}></div>
        )}
        {userInfo && chkButton === 5 && (
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
                <StyledButtonSmall onClick={passVeriDel}>
                  확인
                </StyledButtonSmall>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
