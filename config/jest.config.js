module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '..',
  moduleNameMapper: {
    electron: '<rootDir>/test/mock/electron.ts',
    '\\.(css|less|scss|sass|svg)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
}
