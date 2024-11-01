# Express weekend project

This weekend, you will build a web API and present it on Monday.

You will be scored on this presentation, meaning it is possible to succeed or fail.

## What to do during the weekend

- Create a public repository on your individual GitHub account.
- Create a project planning board for the repository.
- Create a big picture plan and add it to the readme in your repository.
- Write a backend API.
- Create a video recording where you present your work, and publish on YouTube.

## Planning requirements

- You make up your own idea.
- A visualization of how the app should work in your big picture plan.
- A project board that clearly shows your microsteps and expectations. Please divide the "done" column into half-days, so you have at least 4 different "done" columns. It needs to be clear in what order you did the tasks.

## Programming requirements

- Tech stack: typescript, tsx, node.js test runner, express.js, supertest, zod, uuid. You can choose to add other tools as you see fit.
- A minimum of two different application features. The features are not allowed to directly access each other's database data. If the feature needs data from another feature, you need to call a service method from the other feature.
- You need to implement at least one each of the following routes: `get all`, `create`, `get by ID`, `delete`, `update`. This means that not all features need all route types.
- Code architecture should be tidy. Good names, usage of factory functions, and simple code is expected.
- You should have one integration test per route.
- You should have at least one set of ZOMBIES unit tests for at least one feature. This means that you should not test the functional core with supertest, but just unit test with pure functions without side-effects.

## Presentation video requirements

- Keep the presentation short and relevant.
- The video should have your screen shared, and yourself via video. OBS can be used to set it up.
- The audio should be good enough quality that we can listen to it in the office on the big screen.
- The video content should be large enough to see on a larger mobile phone.
- Your presentation should have these segments, in this given order: `Who are you?`, `What did you build?`, `What's your big picture plan?`, `Showing the project board, explain your ways of working throughout the weekend.`, `Prove that the app can be run normally.`, `Demo the test cases to prove that the application works completely.`, `Show code that fulfilled a part of the requirements. Make it clear what piece of code fulfilled what requirement.`.

## Notes

- You will be scored on the content of the video recording. Make sure all relevant parts are presented to be properly evaluated.
- Make sure that it's easy to score you on each requirement by addressing what requirement you fulfilled in the different segments in your presentation.