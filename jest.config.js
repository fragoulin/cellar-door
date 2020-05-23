module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    electron: '<rootDir>/test/mock/electron.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
}
