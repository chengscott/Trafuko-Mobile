### Software Studio
# Trafuko | 垃圾話
[![gradle](https://img.shields.io/badge/gradle-1.2.3-orange.svg)](https://gradle.org/)
[![android-sdk](https://img.shields.io/badge/android%20sdk-24-brightgreen.svg)](https://developer.android.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
##### Warning: &nbsp;The project now is stopped to develop
# Fecture
1. 幹話卡片滑動系統，只需一指完成喜惡選擇(尚未完成
2. 基礎幹畫收藏列表
3. 整合FB與Firebase進行帳戶管理
4. 幹話相機(尚未完成

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
    
# Expected
* Integrate with maching learning to analyze users trash talk
* Finish the trash talk camera
* Finish the slide card system
