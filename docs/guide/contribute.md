
# Contribution guide  

welcome! We are very happy that you are here and look forward to your interest in participating in Luckysheet contributions. Of course, before you participate in the Luckysheet contribution, please make sure to read the following full text:

## Our code of conduct

1. We promise to respect all those who participated in the contribution, not limited to those who raised questions, contributed documents and code, resolved bugs and other contributions;

2. We are obliged to abide by local laws and regulations, and we reject all behaviors with legal risks;
3. We oppose any participant's derogatory comments, personal attacks, harassment or insult to others, and other non-professional behaviors;
4. We have the right and responsibility to delete or edit content that does not comply with this code of conduct, not limited to code, issues, wikis, documents and others. Participants who do not comply with the code of conduct may be removed from the team;
5. We accept the supervision of anyone, and anyone can report to us the facts that are found to be inconsistent with this code of conduct through problem feedback.

## How to participate in contributing?

* Contributed documents: Browsing the document can deepen your understanding of Luckysheet. Once you find that the document is not clearly written or the logic is confusing, you can correct, modify, and supplement. You can go to [Google Forum](https://groups.google.com/g/luckysheet) to give feedback
* Contributing code: Welcome everyone to contribute code to the Luckysheet community, you are welcome to claim the Open state [Issues](https://github.com/mengshukeji/Luckysheet/issues) and unfinished features, submit a PR, and become one of the contributors If you find that some functions cannot meet your needs or have problems during use, please record in Issues
* Participate in the issue discussion: you can post your suggestions under any [Issues](https://github.com/mengshukeji/Luckysheet/issues)
* Review code: You can see PR submitted by all contributors on [Github](https://github.com/mengshukeji/Luckysheet), you can review their code and post your suggestions

## How to submit issues

Before you submit features/improvements, you should pay attention to the following points:

* Please confirm whether the feature/improvement has been submitted by others
* An easy-to-understand title to explain the bug/submission feature/improvement you submitted
* If it is a bug, describe the cause of the bug in detail. If it can be reproduced, please try to provide complete reproduction steps
* If it is a feature, then the feature should have wide applicability, suitable for most users, and it is best to provide detailed design documents
* If it is an improvement, describe the benefits of this improvement as clearly as possible

Specific steps:

* Create [Issues](https://github.com/mengshukeji/Luckysheet/issues) and describe the issue clearly
* If you want to solve the issue, assign the issue to your own name. If you just submit a bug/feature/improvement and don’t have time to contribute code, set assignne to empty
* If it is a relatively large feature/improvement, try to output the design document first and follow the [Luckysheet RFC](https://github.com/mengshukeji/Luckysheet-rfcs) process for others to review

## How to claim Issues

In Luckysheet's [Issues](https://github.com/mengshukeji/Luckysheet/issues) list, there are many issues created by others that have not been repaired. If you are interested, you can claim these issues. The steps to claim are as follows:

* Leave a message under the issue, express the idea of claiming the task, and specify **@I can solve it**
* If the submitter has no comments, assign the issue to your own name and update the progress in time
* If it is a relatively large feature, try to output the design document first and follow the [Luckysheet RFC](https://github.com/mengshukeji/Luckysheet-rfcs) process for others to review
* Develop the code and submit the code to github

## How to submit code

1. Fork to own warehouse

Go to the Github page of [Luckysheet](https://github.com/mengshukeji/Luckysheet), and click the Fork button in the upper right corner to proceed.

2. Git clone to local

```shell
git clone https://github.com/<your_github_name>/Luckysheet.git
```

3. Establish a connection upstream

```shell

cd Luckysheet
gitremote add upstream https://github.com/mengshukeji/Luckysheet.git
```
    
4. Create a development branch

```shell
git checkout -b dev
```

5. Modify the submission code

```shell
git add.
npm run commit
git push origin dev
```

6. Sync code, synchronize the latest code to the local

```shell
git fetch upstream
git rebase upstream/master
```

7. If there is a conflict (nothing can be ignored)

```shell
git status # View conflict files and modify conflicts
git add.
git rebase --continue
```
When submitting the git rebase --continue command, if vim prompts to edit the commit information, you can add your changes, then save and exit
> For vim commands, please refer to the [vim](https://www.runoob.com/linux/linux-vim.html) 

8. Submit branch code

```shell
git push origin dev
```

If you are prompted to pull first, you can pull it before submitting
```shell
git pull origin dev
git push origin dev
```
If the vim prompt to edit the commit information pops up, you can exit directly through the vim command
> For vim commands, please refer to [vim](https://www.runoob.com/linux/linux-vim.html)

9. Submit pr
Go to the fork project in your github warehouse, switch to the branch you just created and modified, click new pull request, and add the corresponding description, and finally click Create pull request to submit
    
## Code Specification

> General code specification example

* Keep the block depth to a minimum. Avoid nested If conditions as much as possible
```js
// CORRECT
if (!comparison) return

if (variable) {
  for (const item of items) {}
} else if (variable2) {
  // Do something here
}

// INCORRECT
if (comparison) {
  if (variable) {
    for (const item in items) {}
  } else if (variable2) {
    // Do something here
  }
} else {
  return
}
```

* Do not use operands for chain comparison
```js
// CORRECT

if (cb) cb()
if (!cb || (cb === fn)) cb()

// INCORRECT

cb && cb()
(!cb || (cb === fn)) && cb()
```

* All variables should be declared at the beginning of the block in alphabetical order
```js
// CORRECT
function foo () {
  const foo ='bar'
  const bar ='foo'

        if (conditional) {}

  ...

  return foo
}

// INCORRECT

function foo () {
  const foo ='bar'

        if (conditional) {}

  const bar ='foo'

  ...

  return foo
}
```

* Return as soon as possible
```js
// CORRECT
if (condition) return'foo'
if (condition2) return'bar'
// Return must have a blank line above
return'fizz'

// INCORRECT
const variable =''

if (condition) {
  variable ='foo'
} else if (condition2) {
  variable ='bar'
} else {
  variable ='fizz'
}

return variable
```

## How to contribute documents

## How to become Luckysheet Committer

As long as anyone contributes to the Luckysheet project, you are the officially recognized Contributor of the Luckysheet project. There is no exact standard for growing from Contributor to Committer, and there is no expected timetable, but Committer candidates are generally A long-term active contributor, becoming Committer does not require a huge architectural improvement contribution, or how many lines of code contributions, contributing code, contributing documents, participating in mailing list discussions, helping to answer questions, etc., are all ways to increase their influence .

List of potential contributions (in no particular order):

* Submit the bugs, features, and improvements you found to the issue
* Update the official documents so that the project documents are the most recent, the best practices for writing Luckysheet, and various useful documents for the users
* Perform test and report test results, performance test and other MQ performance comparison test, etc.
* Review the work of others (including code and non-code) and publish your own suggestions
* Guide new contributors and be familiar with the community process
* Post a blog about Luckysheet
* Any contribution to the development of the Luckysheet community
* ......
