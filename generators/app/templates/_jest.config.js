module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.setup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  // testMatch: ['**/+(index.)+(spec).+(ts)'], // to test single file,
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$'
    }
  }
};