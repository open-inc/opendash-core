import * as React from "react";
import styled from "styled-components";

export const WidgetContainer = styled.div`
  display: flex;
  align-self: stretch;
  width: 100%;
  padding-top: 48px;
  position: relative;
  background: white;
  transition: box-shadow 0.3s ease-in-out;
`;

export const WidgetHeader = styled.div`
  display: flex;
  height: 48px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

export const WidgetHeaderName = styled.div`
  display: block;
  height: 48px;
  padding: 0 7px;
  line-height: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;

  border-bottom: 1px solid #f0f0f0;
  flex: 1;
`;

export const WidgetHeaderAction = styled.div`
  display: block;
  float: right;
`;

export const WidgetContent = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
