/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // preset: 'ts-jest', (1)
  //  testMatch: ['<rootDir>/e2e/**/*.test.ts'], // (2)
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
