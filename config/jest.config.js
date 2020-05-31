const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    "<rootDir>"
  ],
  rootDir: '..',
  modulePaths: [
    "<rootDir>",
    '../app/test'
  ],
  moduleNameMapper: {
    electron: '<rootDir>/app/test/mock/electron.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/app/test/setupTests.ts'],
}
