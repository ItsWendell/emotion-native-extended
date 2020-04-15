import { TextProps as NativeTextProps } from "react-native";
import { Text as Component } from "@ui-kitten/components";
import {
  typography,
  TypographyProps
} from "styled-system";
import styled from "../../providers/styled";

type Props = NativeTextProps & TypographyProps;

export const Text = styled(Component)<Props>({}, typography);
