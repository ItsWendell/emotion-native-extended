# Emotion Native Extended

![npm](https://img.shields.io/npm/v/emotion-native-extended?style=flat-square)

This is a drop-in replacement optimized for React Native for the `styled` function / object coming from [Emotion](https://github.com/emotion-js/emotion). It extends the native styhesheets with [React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet), adds support for media-queries, variables, dynamic themes, relative units, percents, math operations, scaling and a lot more CSS styling features.

This library also adds support for real-time responsive styling, in many cases using media queries on native or other methods this could been a chore todo.

## Getting Started

1. `npm install emotion-native-extended@next`
2. Replace your existing `import styled from "@emotion/native";` with `import styled from "emotion-native-extended"`
3. See the docs for [React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet) and [Emotion](https://github.com/emotion-js/emotion) for the supported styling properties.

## Styled System

I started this project since I like using [Styled System](https://github.com/styled-system/styled-system) for rapid UI development using style props. It has support for React Native but it doesn't work for it's responsive features since media queries don't work. [React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet) add's this functionality.

### Quick note

There is a small script in this code that replaces all `@media screen and` media queries with regular `@media` media queries since these are not supported by Extended Stylesheet and Styled System is using them as their media queries. Styled System doesn't support custimization for media queries yet. See / follow [Issue #1113](https://github.com/styled-system/styled-system/issues/1113) & [Pull Request #1113](https://github.com/styled-system/styled-system/pull/1133).

## Example

The example contains a [Expo](https://expo.io/) project with example usage with React Native for Web, Android and iOS with the use of the following libaries: Styled System / Emotion / Native Kitten.
