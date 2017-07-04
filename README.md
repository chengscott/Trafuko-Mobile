### Software Studio
# Trafuko | 垃圾話
[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)]()
[![gradle](https://img.shields.io/badge/gradle-1.2.3-orange.svg)](https://gradle.org/)
[![android-sdk](https://img.shields.io/badge/android%20sdk-24-brightgreen.svg)](https://developer.android.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![](/metadata/logo.png)

# Features

## App

0. 載入動畫

![](/metadata/loading.gif)

1. 智慧幹話卡

![](/metadata/cards.gif)

2. 整合雲端幹話收藏

![](/metadata/fav.png)

3. 一鍵登入 FB 帳號

![](/metadata/login.gif)

4. 幹話相機

![](/metadata/camera.png)


## 幹話推薦 Machine Learning

1. Preprocess Text
2. N-Gram
3. Extract Feature
4. Multiclass Decision Forest

![](/metadata/ml.png)

## 拍照幹話 Deep Learning
###### TODO: Not Implemented

- Train: MS COCO dataset
    - Image → CNN
    - Sentence → RNN
- 照片
    - Image → CNN
- 幹話 Cluster
    - Sentence → RNN

# Development

## Data Flow

![](/metadata/data.png)

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

# Contributing

Since the course has ended, the original development team may **NOT** involve with the program, but future releases will probably be geared more towards bug-fixes rather than addition of new features.

More contributing guides should be referred to our Wiki. Thanks for your participation!

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

