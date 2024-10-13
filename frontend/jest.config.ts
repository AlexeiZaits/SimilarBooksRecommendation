import { Config } from "jest";

const config: Config = {
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/src/**/*.mock**',
    '!<rootDir>/src/**/*.module.scss',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "scss", // Поддержка SCSS
  ],
  moduleDirectories: ["node_modules", "src"],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|scss)$': 'identity-obj-proxy', // Мок для CSS и SCSS
  },
};


export default config;
