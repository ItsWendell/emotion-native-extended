import styled from "emotion-native-extended";
import {
  Layout as LayoutComponent,
  LayoutProps as LayoutComponentProps,
} from "@ui-kitten/components";
import {
  space,
  layout,
  flexbox,
  SpaceProps,
  LayoutProps as StyledLayoutProps,
  FlexboxProps,
} from "styled-system";

type LayoutProps = SpaceProps &
  StyledLayoutProps &
  LayoutComponentProps &
  FlexboxProps;

export const Layout = styled(LayoutComponent)<LayoutProps>(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  space,
  layout,
  flexbox
);
