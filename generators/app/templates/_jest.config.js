module.exports = {
  verbose: true,  
  testEnvironment: "jest-environment-happy-dom",
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  transform: {
    "\\.(ts|js)x?$": "ts-jest",
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    "**/src/**",
    "!**/src/**/*.scss",
    "!**/dist/**",
    "!**/node_modules/**"
  ],
  testRegex: '(/src/.*(\\.|/)(test|spec))\\.[t]s?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/config/tsconfig.test.json'
    }
  }
  //testNamePattern: "component"
};
