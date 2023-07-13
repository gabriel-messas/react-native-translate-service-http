# react-native-translate-service-http
Translate service for React Native that fetches translation files via HTTP

- Prerequisites
  - HTTP API with two GET endpoints: one returning available languages list and another returning a specific language's translation file

- Instructions
  - Wrap the application in the `LangContextProvider` element and use the provided `ready` state variable to know when the translation file is loaded and ready to serve. Calling the `translate` function before `ready` turns `true` will cause problems.
