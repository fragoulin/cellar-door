module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "electron": "<rootDir>/test/mock/electron.ts"
  }
};
