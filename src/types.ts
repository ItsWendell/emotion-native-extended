import EStyleSheet from 'react-native-extended-stylesheet';

export type EStyleSheet = typeof EStyleSheet;

export interface ExtendedStyleSheet extends EStyleSheet {
  sheets: Array<Record<string, Record<string, string>>>;
}

export enum NativeComponents {
  'ListView',
  'NavigatorIOS',
  'SnapshotViewIOS',
  'RecyclerViewBackedScrollView',
  'SwipeableListView',
  'SwitchIOS',
  'ActivityIndicator',
  'Button',
  'CheckBox',
  'DatePickerIOS',
  'DrawerLayoutAndroid',
  'FlatList',
  'Image',
  'ImageBackground',
  'InputAccessoryView',
  'KeyboardAvoidingView',
  'MaskedViewIOS',
  'Modal',
  'Picker',
  'PickerIOS',
  'ProgressBarAndroid',
  'ProgressViewIOS',
  'RefreshControl',
  'SafeAreaView',
  'ScrollView',
  'SectionList',
  'SegmentedControlIOS',
  'Slider',
  'StatusBar',
  'Switch',
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
}
