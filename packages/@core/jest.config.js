module.exports = {
  displayName: {
    name: '@core',
    color: 'blue'
  },
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
