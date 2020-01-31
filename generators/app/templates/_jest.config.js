module.exports = {
  testEnvironment: "node",
  setupFiles: [
    '<rootDir>/config/jest.setup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  testRegex: '(/__tests__/.*(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'scss'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
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
