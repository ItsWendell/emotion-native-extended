import styled from "emotion-native-extended";
import { TextProps as NativeTextProps } from "react-native";
import { Text as Component } from "@ui-kitten/components";
import {
  typography,
  TypographyProps
} from "styled-system";

type Props = NativeTextProps & TypographyProps;

export const Text = styled(Component)<Props>({}, typography);
