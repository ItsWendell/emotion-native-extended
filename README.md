# Emotion Native Extended

This is an [Emotion JS](https://github.com/emotion-js/emotion) extension with integration of [React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet). Which adds support for media-queries, variables, dynamic themes, relative units, percents, math operations, scaling and more CSS styling stuff.

This also adds a wrapper around components with media queries, that makes the application responsive on window resizes, which works well in combination with React Native for Web and Styled System!

## Notes

Styled System sadly doesn't support the custimization for media queries yet. See / follow [Issue #1113](https://github.com/styled-system/styled-system/issues/1113) & [Pull Request #1113](https://github.com/styled-system/styled-system/pull/1133).

I've build in a replacement for unsupported media query: `screen and`, to support styled system.

## Example

The example contains a Expo project with example usage of the following libaries: Styled System / Emotion / Native Kitten.

It's recommended to link the library: `npm link` in the root folder, `npm link emotion-native-extended` in the example folder.

## Todo

- Setup an expo.io example with Styled System.
- Write tests
- Setup proper versioning.
