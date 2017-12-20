# S.K. Loader
#### React Loader UI Component
This project is a simple loading component to show progress of an upload. It was built in React using ES6.

## Getting Started
After pulling down the repo, the component can be loaded in a few easy steps

- From the root folder run `npm install` to install required packages

#### Development Environment
1. Then run `npm start` to spin up a local server for a development envrionment.
2. Thats It! You're done.

#### Production Ready Version
1.  Run `npm run build` to create compiled files in the `/build` folder
2. Install serve globally `npm install -g serve`
3. Finally serve up the component form the build folder `serve -s build`

## Features of the component

##### Loading UI
During an active transfer the percentage will be shown and the surrounding circle will grow as it spins.

##### Pause Transfer
During active transfer the user will have the ability to pause and continue the transfer at any point.

##### Cancel Transfer
While the transfer is active or paused, the user can cancel at any time, reseting the component to a 0% inactive state.

##### Succesful Transfer
On 100% completion, the user will be shown a completed green ring with easy to understand success check mark.
They will also have the ability to start a new transfer if they wish.
