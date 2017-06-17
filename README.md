### Software Studio
# Trafuko | 垃圾話

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Prerequisites

* node
* yarn
* react-native-cli

## Development Setup

```bash
yarn # install dependencies
```

## Run in Emulator

```bash
yarn start
# install into a device
react-native run-android
react-native run-ios
```

## Test

```bash
yarn jest
```

## Lint

```bash
yarn lint
```

# Workflow

1. Up to date
    - ```git pull```
    - ```yarn```
2. Unit Implementation (& Unit Test)
3. Integration: Test & Lint
    - ```yarn jest```
    - ```yarn lint```
4. Commit
    - ```git status```
    - ```git add --all```
    - ```git commit -m "change description"```
5. Sync to GitHub
    - ```git pull```
    - Resolve merge conflict (may commit again)
    - ```git push```
    - (Workspace is clean now!)
