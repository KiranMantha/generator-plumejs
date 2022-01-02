module.exports = {
	testEnvironment: '@happy-dom/jest-environment',
	setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
	displayName: 'PLUMEJS',
	roots: ['<rootDir>/src/'],
	collectCoverage: true,
	coverageDirectory: '<rootDir>/coverage',
	testMatch: ['**/+(*.)+(spec).+(ts)'],
	// testMatch: ["**/+(index.)+(spec).+(ts)"], // to test single file,
	transform: {
		'^.+\\.ts$': 'ts-jest'
	},
	extensionsToTreatAsEsm: ['.ts'],
	moduleFileExtensions: ['ts', 'html', 'js', 'json'],
	moduleNameMapper: {
		'^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
			'jest-transform-stub'
	},
	globals: {
		'ts-jest': {
			diagnostics: true,
			tsconfig: '<rootDir>/tsconfig.json'
		}
	}
};
