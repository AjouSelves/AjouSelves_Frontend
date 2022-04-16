import React from "react";
import { useNavigate } from "react-router-dom";

function Boards() {
  const navigate = useNavigate();

  const onPostHandler = () => {
    navigate("/board_add");
  };

  return (
    <div>
      <button onClick={onPostHandler}>굿즈 등록하기</button>
    </div>
  );
}

export default Boards;
