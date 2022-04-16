import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { boardAdd } from "../../../_actions/board_actions";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function BoardAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Title: ", Title);
    console.log("Content: ", Content);

    let body = {
      title: Title,
      content: Content,
    };

    dispatch(boardAdd(body)).then((response) => {
      if (response.payload.addSuccess) {
        alert("Add success");
        navigate("/board");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div>
      <StyledForm onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={Title}
          placeholder="Title"
          onChange={onTitleHandler}
        />
        <textarea
          value={Content}
          placeholder="Content"
          onChange={onContentHandler}
        />
        <button type="submit">POST</button>
      </StyledForm>
    </div>
  );
}

export default BoardAdd;
