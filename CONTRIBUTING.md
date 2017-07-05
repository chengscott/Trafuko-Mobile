# Contributing

First off, thank you for considering contributing to Trafuko. It's people like you to make Trafuko great again.

## 1. Where do I go from here?

If you've noticed a bug or have a question, search the [Issue Tracker](https://github.com/chengscott/Trafuko-Mobile/issues?q=something) to see if someone else has already created a ticket.
If not, go ahead and [create one](https://github.com/chengscott/Trafuko-Mobile/issues/new)!

## 2. Fork & Branching

If this is something you think you can fix, then [fork Trafuko-Mobile](https://help.github.com/articles/fork-a-repo) and create a branch with a descriptive name.

A good branch name would be (where issue #1 is the ticket you're working on):

```sh
git checkout -b 1-systembar-color
```

## 3. Development Setup

Make sure you've the correct prerequisites and environments listed in the [README](README.md#development).

## 4. Did you find a bug?

* **Ensure the bug was not already reported** by [searching all Issues](https://github.com/chengscott/Trafuko-Mobile/issues?q=).

* If you're unable to find an open issue addressing the problem, [create a new one](https://github.com/chengscott/Trafuko-Mobile/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

* If possible, use the relevant bug report templates to create the issue.

## 5. Follow the Workflow

At this point, you're ready to make your changes!
Make sure you've correctly follow the [Workflow in README](README.md#workflow).
The most important part is to implement **unit test** and pass locally.
Feel free to ask for help; everyone is a beginner at first :smile_cat:

## 6. Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with remote master branch:

```sh
git remote add upstream https://github.com/chengscott/Trafuko-Mobile.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```sh
git checkout 1-systembar-color
git rebase master
git push --set-upstream origin 1-systembar-color
```

Finally, go to GitHub and
[create a Pull Request](https://help.github.com/articles/creating-a-pull-request)
:D

## 8. Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good](http://git-scm.com/book/en/Git-Branching-Rebasing) [resources](https://help.github.com/articles/interactive-rebase), but here's the suggested workflow:

```sh
git checkout 1-systembar-color
git pull --rebase upstream master
git push --force-with-lease 1-systembar-color
```

## 9. Merging a PR (maintainers only)

A PR can only be merged into master by a maintainer if:

* It has been approved by at least two maintainers. If it was a maintainer who opened the PR, only one extra approval is needed.
* It has no requested changes.
* It is up to date with current master.

Any maintainer is allowed to merge a PR if all of these conditions are met.

