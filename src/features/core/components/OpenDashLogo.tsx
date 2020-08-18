import * as React from "react";
import { useOpenDashApp } from "../../..";
import { useNavigate } from "react-router";

export const OpenDashLogo: React.FC<{ style: React.CSSProperties }> = ({
  style = {},
}) => {
  const app = useOpenDashApp();
  const navigate = useNavigate();

  const onClick = React.useCallback(() => {
    if (app.ui.logoLink && app.ui.logoLinkExternal) {
      window.location.href = app.ui.logoLink;
    } else if (app.ui.logoLink && !app.ui.logoLinkExternal) {
      navigate(app.ui.logoLink);
    } else {
      navigate("/");
    }
  }, []);

  if (app.ui.logoImage || app.ui.logoText) {
    return (
      <div style={style}>
        <img
          src={app.ui.logoImage}
          title={app.ui.logoText}
          style={{ display: "block", height: "100%", width: "auto" }}
          onClick={onClick}
        />

        {app.ui.logoText && <span>{app.ui.logoText}</span>}
      </div>
    );
  }

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="244.149px"
      height="243.984px"
      viewBox="0 0 244.149 243.984"
      enableBackground="new 0 0 244.149 243.984"
      style={style}
      onClick={onClick}
    >
      <g>
        <path
          fill="#B4B4B4"
          d="M122.221,122.058L84.576,9.275c30.458-10.17,62.054-7.94,90.776,6.408L122.221,122.058z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeMiterlimit="10"
          d="M122.221,122.058L84.576,9.275
		c30.458-10.17,62.054-7.94,90.776,6.408L122.221,122.058z"
        />
        <path
          fill="#B4B4B4"
          d="M122.221,122.058L16.796,67.078c14.848-28.472,37.322-47.634,67.78-57.803L122.221,122.058z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeMiterlimit="10"
          d="M122.221,122.058L16.796,67.078
		c14.848-28.472,37.322-47.634,67.78-57.803L122.221,122.058z"
        />
        <path
          fill="#B4B4B4"
          d="M122.221,122.058L8.191,155.744c-9.094-30.794-6.248-60.194,8.605-88.666L122.221,122.058z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeMiterlimit="10"
          d="M122.221,122.058L8.191,155.744
		c-9.094-30.794-6.248-60.194,8.605-88.666L122.221,122.058z"
        />
        <path
          fill="#B4B4B4"
          d="M122.221,122.058L63.598,225.503c-27.936-15.838-46.307-38.961-55.407-69.759L122.221,122.058z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeMiterlimit="10"
          d="M122.221,122.058L63.598,225.503
		c-27.936-15.838-46.307-38.961-55.407-69.759L122.221,122.058z"
        />
        <path
          fill="#4387C7"
          d="M122.221,122.058l53.131-106.375c58.749,29.348,82.582,100.759,53.24,159.5
		c-29.344,58.75-100.753,82.589-159.496,53.246c-2.356-1.173-3.21-1.633-5.498-2.926L122.221,122.058z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeMiterlimit="10"
          d="M122.221,122.058l53.131-106.375
		c58.749,29.348,82.582,100.759,53.24,159.5c-29.344,58.75-100.753,82.589-159.496,53.246c-2.356-1.173-3.21-1.633-5.498-2.926
		L122.221,122.058z"
        />
        <path
          fill="#FFFFFF"
          d="M180.002,154.532c-17.027,32.904-57.519,45.771-90.424,28.744c-32.906-17.037-45.773-57.524-28.746-90.43
		c17.04-32.906,57.525-45.779,90.43-28.745C184.168,81.141,197.042,121.62,180.002,154.532"
        />
      </g>
    </svg>
  );
};
