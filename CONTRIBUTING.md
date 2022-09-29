# Table of Contents

- [Introduction](#introduction)
  - [What kinds of contributions we're looking for](#what-kinds-of-contributions-we-are-looking-for)
- [Rules](#rules)
- [New to open source?](#new-to-open-source)
- [Getting started](#getting-started)
- [How to report a bug](#how-to-report-a-bug)
- [How to suggest a feature](#how-to-suggest-a-feature-or-enhancement)
  - [Current features needed](#current-features-needed)
  - [Process for suggesting a feature](#process-for-suggesting-a-feature)
- [Code review process](#code-review-process)
- [Community](#community)
- [Conventions](#conventions)
  - [Commits](#commits)
  - [New fonts](#new-fonts)
  - [Style guide](#style-guide)

# Introduction

First off, thank you for considering contributing to 3DSearch. It's people like you that make 3DSearch such a great tool.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

### What kinds of contributions we are looking for

3DSearch is an open source project and we love to receive contributions from our community — you! There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests or writing code which can be incorporated into 3DSearch itself.

# Rules

- Ensure cross-platform compatibility for every change that's accepted. Windows, Mac, Debian & Ubuntu Linux.
- Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
- Don't add any classes to the codebase unless absolutely needed. Err on the side of using functions.
- Keep feature versions as small as possible, preferably one new feature per version.
- Be welcoming to newcomers and encourage diverse new contributors from all backgrounds.

# New to open source?

Working on your first Pull Request? You can learn how from this _free_ series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

# Getting started

Small contributions such as fixing spelling errors, where the content is small enough to not be considered intellectual property, can be submitted by a contributor as a patch.

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:

- Spelling / grammar fixes
- Typo correction, white space and formatting changes
- Comment clean up
- Adding logging messages or debugging output
- Moving source files from one directory or package to another

# How to report a bug

Please use this [template](https://gist.github.com/auremoser/72803ba969d0e61ff070) for all submissions.

General questions should go to our discord server.

# How to suggest a feature or enhancement

The 3DSearch philosophy is to improve the user experience of searching the internet by providing a fun and interactive interface that's easy to use for web surfers of all levels.

### Current features needed

- Develop automatic testing for all UI items
- Converting existing JSX syntax to use static typing
- Remove letters from scene when a backspace event occurs (or a cut)
- Improve the Cannon letter geometry to accurately match the selected font
- Improve the drag interaction
- Improve the UI styling, offering multiple themes (design guide will be developed first)
- Add additional lighting options
- Add multi-language support
- [Add effect options](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer)

### Process for suggesting a feature

If you find yourself wishing for a feature that doesn't exist in 3DSearch, you are probably not alone. There are bound to be others out there with similar needs. Open an issue on our issues list on GitHub which describes the feature you would like to see, why you need it, and how it should work.

# Code review process

Currently, as the core team is still developing, new commits are being examined on a weekly basis. As the team grows and the project has more contributors, this will change.

# Community

You can chat with the core team on [Discord](https://discord.gg/6EZxJKuAgB).

# Conventions

### Commits

All commits must follow this [format](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733).

### New fonts

Fonts have been added by using [Facetype](https://gero3.github.io/facetype.js/) to convert TTF file formatted fonts to JSON files so that they can be read by Three's FontLoader.

Only regular (400 weight), non-italicized, non-bold fonts should be used. If the default font name causes overflow in the settings, the name should be shortened or abbreviated.

All fonts should be easily readable without the bevel property having been applied.

### Style guide

- Two (2) space indents, no tabs

We recommend using Visual Studio Code and adding the [Prettier - Code formatter](https://prettier.io/) extension, as this helps maintain the same syntax styling across 3DSearch.
