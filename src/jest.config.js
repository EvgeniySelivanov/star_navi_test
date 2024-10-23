module.exports = {
  preset: 'ts-jest', // Используйте ts-jest для обработки TypeScript
  testEnvironment: 'jsdom', // Используйте jsdom для тестов, которые зависят от DOM
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Мок для стилей, если необходимо
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Преобразование TypeScript файлов
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)" // Позволяет обрабатывать axios и другие модули, если необходимо
  ],
};