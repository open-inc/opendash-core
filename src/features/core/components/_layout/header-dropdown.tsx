import * as React from "react";
import styled from "styled-components";

export const HeaderDropdown = styled.div`
  display: block;
  padding: 1px;
  background: #005493;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  top: -6px;
  /* left: ${(p) => (p.right ? "auto" : "-10px")};
  right: ${(p) => (p.right ? "-10px" : "auto")}; */
  position: relative;
  min-width: 302px;
  /* margin-left: -10px; */

  ::before {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #005493;
    content: "";
    position: absolute;
    top: -5px;
    left: ${(p) => (p.right ? "auto" : "18px")};
    right: ${(p) => (p.right ? "18px" : "auto")};
  }
`;

export const HeaderDropdownText = styled.div`
  padding: 10px;
  color: #fff;
`;

export const HeaderDropdownButton = styled.button`
  color: #fff;
  background: #0063ac;
  display: block;
  line-height: 40px;
  min-width: 300px;
  padding: 0 10px;
  border: 0;
  border-bottom: 1px solid #005493;
  text-align: left;

  :first {
    border-top: 1px solid #005493;
  }

  :hover {
    color: #fff;
    background: #005493;
  }

  .anticon {
    margin-right: 10px;
  }
`;
