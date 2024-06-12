module.exports = {
    globals: {
      "ts-jest": {
        skipBabel: true,
      },
    },
    mapCoverage: true,
    moduleFileExtensions: ["js"],
    testResultsProcessor: "jest-sonar-reporter",
    testMatch: ["<rootDir>/tests/*.test.js"],
  };
