import { StyledOptions, CreateStyledComponentExtrinsic, ComponentSelector  } from '@emotion/styled';
import ReactNative from 'react-native';
import React from 'react';
import { PropsOf } from '@emotion/styled-base/types/helper';

export type {
    CSSObject,
    CreateStyled as CreateEmotion,
    StyledOptions
} from '@emotion/styled';

export enum NativeComponents {
    "ListView",
    "NavigatorIOS",
    "SnapshotViewIOS",
    "RecyclerViewBackedScrollView",
    "SwipeableListView",
    "SwitchIOS",
    "ActivityIndicator",
    "Button",
    "CheckBox",
    "DatePickerIOS",
    "DrawerLayoutAndroid",
    "FlatList",
    "Image",
    "ImageBackground",
    "InputAccessoryView",
    "KeyboardAvoidingView",
    "MaskedViewIOS",
    "Modal",
    "Picker",
    "PickerIOS",
    "ProgressBarAndroid",
    "ProgressViewIOS",
    "RefreshControl",
    "SafeAreaView",
    "ScrollView",
    "SectionList",
    "SegmentedControlIOS",
    "Slider",
    "StatusBar",
    "Switch",
    "TabBarIOS",
    "Text",
    "TextInput",
    "ToolbarAndroid",
    "TouchableHighlight",
    "TouchableNativeFeedback",
    "TouchableOpacity",
    "TouchableWithoutFeedback",
    "View",
    "ViewPagerAndroid",
  };

export type Props = { [key: string]: any };

export type StyledFunction<Theme extends object = any, ExtraProps = {}> = CreateStyledComponentExtrinsic<
React.ComponentType<any> | typeof ReactNative[keyof typeof NativeComponents], ExtraProps, Theme
>;

export interface CreateStyled<Theme extends object = any> {
  <Tag extends React.ComponentType<any> | typeof ReactNative[keyof typeof NativeComponents], ExtraProps = {}>(
    component: Tag,
    options?: StyledOptions
  ): CreateStyledComponentExtrinsic<Tag, ExtraProps, Theme>;

  <Tag extends keyof typeof NativeComponents, ExtraProps = {}>(
    component: Tag,
    options?: StyledOptions
  ): CreateStyledComponentExtrinsic<typeof ReactNative[Tag], ExtraProps, Theme>;
}

export type CreateStyledList<Theme extends object = any, ExtraProps = {}> = {
  [key in keyof typeof NativeComponents]: StyledFunction<Theme, ExtraProps>;
};

export type Styled<Theme extends object = any, ExtraProps = {}> = CreateStyled<Theme> & CreateStyledList<Theme, ExtraProps>

export interface StyledComponent<InnerProps, StyleProps, Theme extends object>
  extends React.FunctionComponent<InnerProps & Omit<StyleProps, 'theme'> & { theme?: Theme }>,
  React.RefAttributes<unknown>, ComponentSelector {
  /**
   * @desc this method is type-unsafe
   */
  withComponent<Tag extends typeof ReactNative[keyof typeof NativeComponents]>(
    tag: Tag
  ): StyledComponent<PropsOf<Tag>, StyleProps, Theme>
  withComponent<Tag extends React.ComponentType<any>>(
    tag: Tag
  ): StyledComponent<PropsOf<Tag>, StyleProps, Theme>

  $$typeof: symbol
}

export type InputComponent = typeof ReactNative[keyof typeof NativeComponents] | React.ComponentType<any>;
