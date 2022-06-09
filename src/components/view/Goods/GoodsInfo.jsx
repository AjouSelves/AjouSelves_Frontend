import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import thumbnail from "../../../images/thumbnail.jpeg";
import { SERVER_URL } from "../../../_actions/types";
import {
  projDelete,
  projJoin,
  projLeave,
  projGetById,
} from "../../../_actions/goods_actions";

const StyledSelect = styled.select`
  width: 50%;
  height: 30px;
`;

const Container = styled.div`
  font-weight: 200;
  font-size: 18px;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const GoodsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const StyledButton = styled.button`
  border: none;
  background: #24272b;
  color: white;

  padding: 8px 15px;
  height: 32px;
  font-size: 15px;
  line-height: 14px;
  cursor: pointer;
`;

function percentage(min, cur) {
  return ((cur / min) * 100).toFixed(1) + "%";
}

// 특정 굿즈 정보 보여주는 component

function GoodsInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const [projid] = useState(state);
  const GoodsList = useSelector((state) => state.goods.getAll);

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [CurNum, setCurNum] = useState();
  const [ProjState, setProjState] = useState(0);

  const [chkPoster, setChkPoster] = useState(0);
  const [chkJoined, setChkJoined] = useState(0);

  const Goods = useMemo(() => {
    return GoodsList.find((f) => f.projid === projid);
  }, [GoodsList]);

  // useEffect(dispatch(projGetById(projid, header)));
  useEffect(() => {
    const login_token = window.localStorage.getItem("login-token");
    let header = {
      headers: {
        Authorization: login_token,
      },
    };

    dispatch(projGetById(projid, header)).then((res) => {
      // console.log(res);
      setPhoneNumber(res.payload[0].phonenumber);
      setChkPoster(res.payload[1].is_poster);
      setChkJoined(res.payload[2].is_joined);
      setCurNum(res.payload[0].cur_num);
      setProjState(res.payload[0].state);
    });
  }, [Goods.cur_num]);

  const login_token = window.localStorage.getItem("login-token");
  let header = {
    headers: {
      Authorization: login_token,
    },
  };

  const onDeleteHandler = () => {
    // console.log("delete 실행");

    // console.log("header: ", header);

    dispatch(projDelete(Goods.projid, header)).then((res) => {
      if (res.payload.text === "success") {
        alert("삭제 완료");
        navigate("/goods");
      } else {
        alert("글 작성자만 삭제가 가능합니다.");
      }
    });
  };

  const onEditHandler = () => {
    // console.log("edit 실행");

    // console.log("header: ", header);
    navigate("/goods/edit", { state: Goods });
  };

  const onJoinHandler = () => {
    dispatch(projJoin(Goods.projid, header)).then((res) => {
      if (res.payload.status === "success") {
        alert(
          "참여를 성공했습니다! 도서관 카페 또는 파란학기 굿즈바이어스 부스로 찾아오시면 스티커를 수령하실 수 있습니다!"
        );
        window.location.reload();
      } else {
        alert("이미 참여한 프로젝트입니다!");
      }
    });
  };

  const onLeaveHandler = () => {
    dispatch(projLeave(Goods.projid, header)).then((res) => {
      if (res.payload.status === "success") {
        alert("참여취소를 성공했습니다!");
        window.location.reload();
      } else {
        alert("참여하지 않은 프로젝트입니다!");
      }
    });
  };

  // console.log(Goods);

  const [Image] = useState(Goods.url);

  const ChangeStateHandler = () => {};
  // console.log(Image);

  return (
    <GoodsListBlock>
      <Container>
        <Body>
          <div>
            {!Image ? (
              <img
                alt="thumbnail"
                src={thumbnail}
                width="400px"
                height="400px"
              />
            ) : (
              <img
                alt="thumbnail"
                src={`${SERVER_URL}${Image}`}
                width="400px"
                height="400px"
              />
            )}
            {chkPoster === 1 && (
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <StyledButton
                  style={{ background: "red", marginRight: "10px" }}
                  onClick={onDeleteHandler}
                >
                  굿즈 삭제하기
                </StyledButton>
                <StyledButton onClick={onEditHandler}>
                  굿즈 수정하기
                </StyledButton>
              </div>
            )}
          </div>
          <div>
            <h2
              style={{
                borderBottom: "2px solid black",
                paddingBottom: "20px",
              }}
            >
              🌟 {Goods.title}
            </h2>
            <div style={{ padding: "10px" }}>💰 굿즈 가격: {Goods.amount}</div>
            <hr />
            <div style={{ padding: "10px" }}>
              👨‍👩‍👦 최소 모집인원: {Goods.min_num}
            </div>
            <div style={{ padding: "10px" }}>
              👨‍👩‍👦 현재 참여인원: {CurNum}
              <div
                style={{
                  fontSize: "12px",
                  float: "right",
                  color: "red",
                  fontStyle: "normal",
                  verticalAlign: "middle",
                }}
              >
                {percentage(Goods.min_num, CurNum)} 달성
              </div>
            </div>
            <hr />
            <div style={{ padding: "10px" }}>📞 문의 연락처</div>
            <div>{PhoneNumber}</div>
            {chkJoined === 0 && Goods.state === 1 && (
              <StyledButton
                style={{ width: "100%", marginTop: "30px" }}
                onClick={onJoinHandler}
              >
                펀딩 참여하러 가기 😃
              </StyledButton>
            )}
            {chkJoined === 1 && Goods.state === 1 && (
              <StyledButton
                style={{ width: "100%", marginTop: "30px" }}
                onClick={onLeaveHandler}
              >
                펀딩 참여 취소하기 😢
              </StyledButton>
            )}
            {/* {chkPoster && (
              <div style={{ marginTop: "30px" }}>
                <StyledSelect
                  onChange={(e) => {
                    setProjState(e.target.value);
                  }}
                >
                  <option value="none">====선택====</option>
                  <option value="1">모집중</option>
                  <option value="2">결제중</option>
                  <option value="3">작업중</option>
                  <option value="4">종료</option>
                </StyledSelect>
                <StyledButton
                  style={{ marginLeft: "15px" }}
                  onClick={ChangeStateHandler}
                >
                  상태 바꾸기
                </StyledButton>
              </div>
            )} */}
          </div>
        </Body>
        {chkJoined === 1 && (
          <div style={{ marginTop: "50px" }}>
            <h2>📍 굿즈 수령 위치</h2>
            <hr />
            <div>
              <div>
                도서관 카페 또는 파란학기 굿즈바이어스 부스로 찾아오시면
                스티커를 수령하실 수 있습니다!
              </div>
              <br />
              <div>
                <div style={{ fontWeight: "1000" }}>
                  파란학기 굿즈바이어스 부스
                </div>
                (율곡관 1층 로비, 6월 10일 금요일 13:00부터 16:00까지)
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: "100px" }}>
          <h2>📝 굿즈 소개</h2>
          <hr />
          <div style={{ whiteSpace: "pre-wrap", padding: "30px 0" }}>
            {Goods.explained}
          </div>
        </div>
      </Container>
    </GoodsListBlock>
  );
}

export default GoodsInfo;
