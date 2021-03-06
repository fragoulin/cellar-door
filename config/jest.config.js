module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '..',
  moduleNameMapper: {
    "^components/(.*)": "<rootDir>/app/src/components/$1",
    "^container/(.*)": "<rootDir>/app/src/container/$1",
    "^emulators/(.*)": "<rootDir>/app/src/emulators/$1",
    "^localization/(.*)": "<rootDir>/app/src/localization/$1",
    "^models/(.*)": "<rootDir>/app/src/models/$1",
    "^redux/(.*)": "<rootDir>/app/src/redux/$1",
    "^services/(.*)": "<rootDir>/app/src/services/$1",
    "^storage/(.*)": "<rootDir>/app/src/storage/$1",
    "^test/(.*)": "<rootDir>/test/$1",
    electron: '<rootDir>/test/mock/electron.ts',
    '\\.(svg)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
}
