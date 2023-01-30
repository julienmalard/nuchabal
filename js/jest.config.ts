import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
    "transform": {
      "(.*).ts$": [
        "ts-jest",
        {
          "useESM": true
        }
      ]
    },
    "preset": "ts-jest/presets/default-esm",
    "moduleNameMapper": {
      "^@/(.*).js$": "<rootDir>/ruxeel/$1",
      "^@/(.*)$": "<rootDir>/ruxeel/$1"
    },
    "testMatch": [
      "**/*.tjt.ts"
    ],
    "testEnvironment": "node"
  }

  export default config