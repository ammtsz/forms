const { name } = require('./package.json')
const baseConfig = require('@forms/test/jest.config')

module.exports = {
  ...baseConfig,
  displayName: name,
  modulePathIgnorePatterns: ['<rootDir>/src/.*/__mocks__'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '@forms/utils': '<rootDir>/../../commons/utils/src'
  }
}
