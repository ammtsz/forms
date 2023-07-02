module.exports = {
  clearMocks: true,
  verbose: false,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['../../configs/test/setup.ts'],
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/**/*.{spec,test}.{ts,tsx}'
  ],
  testPathIgnorePatterns: ['node_modules', 'dist', 'coverage', 'build(.*)'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.mock.{ts,tsx}',
    '!<rootDir>/src/**/styles.{ts,tsx}',
    '!<rootDir>/src/bootloader.tsx',
    '!<rootDir>/src/index.{ts,tsx}',
    '!<rootDir>/src/routes/appRoutes.ts',
    '!<rootDir>/src/setupTests.ts'
  ],
  coveragePathIgnorePatterns: ['node_modules', 'dist', 'styles.ts'],
  coverageReporters: [
    'text',
    'html',
    'lcov',
    'json-summary',
    'clover',
    'cobertura'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/,
        warnOnly: true
      },
      isolatedModules: true
    }
  },
  transform: {
    '^.+\\.[t]sx?$': 'ts-jest',
  }
}
