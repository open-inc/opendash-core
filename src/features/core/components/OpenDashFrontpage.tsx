import * as React from "react";

import { Container, ContainerInner, Element } from "./OpenDashFrontpage.layout";
import { useNavigate } from "react-router-dom";

import { useNavigation, useTranslation } from "../../..";

interface Props {}

export const OpenDashFrontpage: React.FC<Props> = ({}) => {
  const t = useTranslation();
  const navigate = useNavigate();
  const [, items] = useNavigation("frontpage");

  const elements = React.useMemo(
    () =>
      items
        .filter((item) => item.link)
        .filter((item) => item.icon)
        .filter((item) => item.color)
        .map((item) => ({
          ...item,
          onClick: () => {
            if (item.link) {
              navigate(item.link);
            }
          },
        })),
    [items]
  );

  if (elements.length === 1) {
    navigate(elements[0].link);
  }

  return (
    <Container>
      <ContainerInner>
        {elements.map((e) => (
          <Element key={e.id} {...e} />
        ))}

        {elements.length === 0 && t("opendash:frontpage.empty")}
      </ContainerInner>
    </Container>
  );
};
