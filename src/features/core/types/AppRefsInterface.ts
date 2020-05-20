import { RefObject } from "react";

export interface AppRefsInterface {
  headerBeforeMenuLeft: RefObject<HTMLDivElement>;
  headerAfterMenuLeft: RefObject<HTMLDivElement>;
  headerBeforeMenuRight: RefObject<HTMLDivElement>;
  headerAfterMenuRight: RefObject<HTMLDivElement>;
  headerAfterLogo: RefObject<HTMLDivElement>;
}
