import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import GlobalFonts from "../../../font/font";
import thumbnail from "../../../images/thumbnail.jpeg";
import { SERVER_URL } from "../../../_actions/types";
import {
  projDelete,
  projJoin,
  projLeave,
  projGetById,
} from "../../../_actions/goods_actions";

const Container = styled.div`
  font-family: "S-CoreDream-9Black";
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
  margin-top: 30px;
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
      console.log(res);
      setPhoneNumber(res.payload[0].phonenumber);
      setChkPoster(res.payload[1].is_poster);
      setChkJoined(res.payload[2].is_joined);
    });
  }, []);

  const login_token = window.localStorage.getItem("login-token");
  let header = {
    headers: {
      Authorization: login_token,
    },
  };

  const onDeleteHandler = () => {
    console.log("delete 실행");

    console.log("header: ", header);

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
    console.log("edit 실행");

    console.log("header: ", header);
    navigate("/goods/edit", { state: Goods });
  };

  const onJoinHandler = () => {
    dispatch(projJoin(Goods.projid, header)).then((res) => {
      if (res.payload.status === "success") {
        alert("참여를 성공했습니다!");
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
        alert("이미 참여한 프로젝트입니다!");
      }
    });
  };

  console.log(Goods);

  const [Image] = useState(Goods.url);
  console.log(Image);

  return (
    <GoodsListBlock>
      <Container>
        <GlobalFonts />
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
              <div>
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
              style={{ borderBottom: "2px solid black", paddingBottom: "20px" }}
            >
              🌟 {Goods.title}
            </h2>
            <div style={{ padding: "10px" }}>
              💰 1인당 굿즈 가격: {Goods.amount}
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              👨‍👩‍👦 최소 모집인원: {Goods.min_num}
            </div>
            <div style={{ padding: "10px" }}>
              👨‍👩‍👦 현재 참여인원: {Goods.cur_num}
              <div
                style={{
                  fontSize: "12px",
                  float: "right",
                  color: "red",
                  fontStyle: "normal",
                  verticalAlign: "middle",
                }}
              >
                {percentage(Goods.min_num, Goods.cur_num)} 달성
              </div>
            </div>
            <hr />
            <div style={{ padding: "10px" }}>📞 문의 연락처</div>
            <div>{PhoneNumber}</div>
            {chkJoined === 0 ? (
              <StyledButton style={{ width: "100%" }} onClick={onJoinHandler}>
                펀딩 참여하러 가기 😃
              </StyledButton>
            ) : (
              <StyledButton style={{ width: "100%" }} onClick={onLeaveHandler}>
                참여 취소하기
              </StyledButton>
            )}
          </div>
        </Body>
        <div style={{ marginTop: "150px" }}>
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
