import * as React from "react";
import styled from "styled-components";

export const WidgetContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  padding-top: 30px;
  position: relative;
  background: white;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  border: 1px solid #d9d9d9;
  transition: box-shadow 0.3s ease-in-out;
`;

export const WidgetHeader = styled.div`
  display: block;
  height: 30px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

export const WidgetHeaderName = styled.div`
  display: block;
  height: 30px;
  padding: 0 7px;
  font-size: 14px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* float: left; */
`;

export const WidgetHeaderAction = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  float: right;
  color: #666666;
  text-align: center;
  cursor: pointer;
  background: none;
  border: none;
`;

export const WidgetContent = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
