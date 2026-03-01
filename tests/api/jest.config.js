module.exports = {
  displayName: 'api-tests',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/api'],
  testMatch: ['**/__tests__/**/*.js', '**/tests/**/*.test.js', '**/tests/**/*.spec.js'],
  collectCoverageFrom: [
    'api/**/*.js',
    '!api/node_modules/**',
    '!api/automation/**',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/api/node_modules/',
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test-results/api-coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/.git/'],
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/api/setup/jest.setup.js'],
  
  // Timeouts
  testTimeout: 30000,
  
  // Verbose output
  verbose: true,
  
  // Reporter
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-results/api',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathAsClassName: 'true',
      },
    ],
  ],
  
  // Module name mapper for path aliases if needed
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/api/$1',
  },
  
  // Transform files
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
