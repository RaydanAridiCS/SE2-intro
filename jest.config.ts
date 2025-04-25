import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: false // Set to true if using ES Modules
      }
    ]
  },
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/index.ts',          
    '!<rootDir>/src/**/index.ts',       
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 75,
      statements: 75
    }
  },
  coveragePathIgnorePatterns: [        
    '/node_modules/',
    '/index.ts$'
  ]
};

export default config;