// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//This code locks the ResizeOBSERVER to avoid error when testing in an environment where it is not supported.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};