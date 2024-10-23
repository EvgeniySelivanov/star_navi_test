module.exports = {
  preset: 'ts-jest', // Use ts-jest to process TypeScript
  testEnvironment: 'jsdom', // Use jsdom for tests that depend on the DOM
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', //Mock for styles if needed
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Converting TypeScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)" //Allows handling of axios and other modules if needed
  ],
};