import * as RN from 'react-native';

// import { createCss } from './createCss';

import { StyleSheet } from './StyleSheet';
import { styled as createStyled } from './base';
import { CreateStyled } from './types';
import { ReactNativeComponentNames } from './types/base';
import { getShouldForwardProp } from './base';
import { createCss } from './createCss';

const css = createCss(StyleSheet);

const components = [
  'ActivityIndicator',
  'Button',
  'DatePickerIOS',
  'DrawerLayoutAndroid',
  'FlatList',
  'Image',
  'ImageBackground',
  'KeyboardAvoidingView',
  'ListView',
  'Modal',
  'NavigatorIOS',
  'Picker',
  'PickerIOS',
  'ProgressBarAndroid',
  'ProgressViewIOS',
  'RecyclerViewBackedScrollView',
  'RefreshControl',
  'SafeAreaView',
  'ScrollView',
  'SectionList',
  'SegmentedControlIOS',
  'Slider',
  'SnapshotViewIOS',
  'StatusBar',
  'SwipeableListView',
  'Switch',
  'SwitchIOS',
  'TabBarIOS',
  'Text',
  'TextInput',
  'ToolbarAndroid',
  'TouchableHighlight',
  'TouchableNativeFeedback',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'View',
  'ViewPagerAndroid',
];

export { css };

const styled: CreateStyled = components.reduce((acc: any, comp) => {
  return Object.defineProperty(acc, comp, {
    enumerable: true,
    configurable: false,
    get() {
      const key = comp as ReactNativeComponentNames;
      return createStyled(RN[key], {
        shouldForwardProp: getShouldForwardProp(RN[key]),
      });
    },
  });
}, createStyled);

export default styled;
