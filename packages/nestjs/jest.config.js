
module.exports = {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright'
  },
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/*.(t|j)s'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
}
