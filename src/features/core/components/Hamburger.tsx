import * as React from "react";

import styled from "styled-components";

const HEIGHT = 32;
const WIDTH = 32;
const STRENGTH = 2;
const OFFSET = 8;
const COLOR = "#444444";

const Container = styled.div`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  position: relative;
  margin: ${(HEIGHT - OFFSET * 2 - STRENGTH) / 2}px 0;

  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: ${STRENGTH}px;
    width: 100%;
    background: ${COLOR};
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    &:nth-child(1) {
      top: 0px;
    }
    &:nth-child(2),
    &:nth-child(3) {
      top: ${OFFSET}px;
    }
    &:nth-child(4) {
      top: ${OFFSET * 2}px;
    }
  }

  &.open {
    span {
      &:nth-child(1),
      &:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
      &:nth-child(2) {
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
`;

export const Hamburger = React.memo(function Hamburger({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <Container
      className={open ? "open" : undefined}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <span />
      <span />
      <span />
      <span />
    </Container>
  );
});
