import * as React from "react";
import styled from "styled-components";
import { Icon } from "@opendash/icons";
import { useTranslation } from "../../..";

export const Container = styled.div`
  height: auto;
  min-height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Tile = styled.div`
  width: 150px;
  height: 150px;

  @media (min-width: 480px) {
    width: 200px;
    height: 200px;
  }

  margin: 10px;

  background: ${(props) => props.color || "#676767"};
  color: white;

  z-index: 2;

  border: 3px solid ${(props) => props.color || "#676767"};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  :hover {
    background: white;
    color: ${(props) => props.color || "#676767"};
  }
`;

export const TileInner = styled.div``;

export const LabelHolder = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 10px;
`;

export const IconHolder = styled.div`
  text-align: center;
  font-size: 40px;

  @media (min-width: 480px) {
    font-size: 60px;
  }
`;

export const Element = ({ label, icon, color, onClick }: any) => {
  const t = useTranslation();

  return (
    <Tile color={color} onClick={onClick}>
      <TileInner>
        <IconHolder>
          <Icon icon={icon} />
        </IconHolder>
        <LabelHolder>{t(label)}</LabelHolder>
      </TileInner>
    </Tile>
  );
};
