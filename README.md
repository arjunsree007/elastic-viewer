# Elastic search UI 
![React Version](https://img.shields.io/badge/react-v16.13-brightgreen.svg)


**Aim**
This plug & play UI is part of MC Github. We started building Genetic User interface which can be configured on Any Elastic core with the goal of creating a modern Web UI 
(no page reloads, infinite scroll, filtered views, search UI builder) for Elasticsearch with 100% client-side rendering 
so one can easily run it as a hosted app on any web server, or as a docker image.


**About Molecular Connections**
We are the largest STM Indexing, Abstracting & technology Company from India. Our 360º solutions help publishers and pharmaceutical companies maximize the value of their information assets. With expertise spanning across multiple domains including, machine learning, text mining, literature curation, ontology development, content analytics, and visualization we serve various industries with proprietary services and products.

Visit : http://www.molecularconnections.com


**Step by Step Guide:**

- Clone the Github repo.
- Install dependencies, run `npm install`
- Start the project, `npm start` Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Connect to public accessible Elastic using Network IP and Port (eg: `http://[IP]:[PORT]/`)
- Optionally enter Username/Passowrd if Authentication is switched on for your elastic IP.
- Enter the core name for browsing the elastic data(optionally you can choose from the list of cores available).
- Enter configuraion settings for the core (Search/Filter/Display)
- Once the Fields are configured you can view the Elastic data based on the settings you provided.
- Use Pagination/Filtering option to filter your search based on your needs.-


![usage](http://gitlab.molecularconnections.com/jashobanta/elastic-ui/-/raw/master/public/images/logos/Hnet-image.gif)


## Available Scripts

In the project directory, you can run:

### `npm install`

Dowloads the project dependencies.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

