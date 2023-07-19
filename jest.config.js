module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
};
