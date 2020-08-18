import { RefObject } from "react";

export interface AppRefsInterface {
  content: RefObject<HTMLDivElement>;
  headerBeforeMenuLeft: RefObject<HTMLDivElement>;
  headerAfterMenuLeft: RefObject<HTMLDivElement>;
  headerBeforeMenuRight: RefObject<HTMLDivElement>;
  headerAfterMenuRight: RefObject<HTMLDivElement>;
  headerBeforeLogo: RefObject<HTMLDivElement>;
  headerAfterLogo: RefObject<HTMLDivElement>;
}
