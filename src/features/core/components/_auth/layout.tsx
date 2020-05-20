import * as React from "react";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  height: 100%;
  width: 100%;
`;

export const Box = styled.div`
  padding: 24px 24px;
  width: 400px;
  background: white;

  z-index: 2;

  border-bottom: 3px solid #1890ff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 5px;
`;

export const SwitchState = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
`;

export const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  height: 100vh;
  width: 100vw;

  /* background: black; */

  z-index: 1;

  ::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    height: 100vh;
    width: 100vw;

    opacity: 0.5;
    filter: blur(5px);
    transform: scale(1.1);

    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }
`;
