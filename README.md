![Static Badge](https://img.shields.io/badge/pnpm-v7.0.0-red)
![Static Badge](https://img.shields.io/badge/next.js-v13.4.12-green)
![Static Badge](https://img.shields.io/badge/typescript-v5.1.6-blue)
![Static Badge](https://img.shields.io/badge/lerna-v7.1.0-yellow)
---

# Form Platform

This platform provides an easy-to-use interface for creating and managing forms. Users can create, with help of OpenAI, and edit forms, as well as view responses in a customizable table.

## Features
- **User Login:** Users can log in to access their forms and responses;
- **Form Creation:** Create forms with ease, with the option to use OpenAI for assistance;
- **Form Editing:** Make changes to your forms at any time, but with restrictions if the form has already been answered;
- **Response Viewing:** View form responses in a customizable table on a separate page;
- **Form Sharing:** Share a link to your form with others;
- **Language Support:** Switch between English and Portuguese (Brazil) languages on the admin page.

![admin-en](https://github.com/ammtsz/forms/assets/66788932/363d8d77-987e-4a51-b217-2df85eb4cf9a)


## Tech Stack

A monorepo project that uses Lerna powered by Nx. Front-ends are React applications built with Next.js and TypeScript, data are stored on Firestore.

Main libraries:

- **Lerna powered by Nx**: Lerna is a tool for managing JavaScript projects with multiple packages. Nx is a set of extensible dev tools for monorepos. Lerna uses Nx to detect packages in the workspace and dependencies between them;
- **Next.js**: A React-based framework for building server-rendered or statically-exported web applications. This application uses version 13 with App Router;
- **TypeScript**: A strict syntactical superset of JavaScript that adds optional type-checking to the language;
- **Next-Auth**: An easy-to-use authentication library for Next.js applications, with support for various providers and authentication methods. So far, this application makes use of Google Provider only;
- **Firestore**: A flexible, scalable NoSQL cloud database from Firebase that allows you to store and sync data in real-time;
- **OpenAI API**: It provides developers with access to advanced AI models for tasks such as natural language processing. It is easy to integrate, scalable, and customizable. The use of OpenAI API in this project was limited due to the use of a free plan;
- **Chakra-UI**: A simple, modular, and accessible component library for React that provides developers with all the building and responsive blocks needed to build applications;
- **Tailwind CSS**: A utility-first CSS framework that provides a set of pre-defined CSS classes for rapidly building custom designs;
- **i18next**: An internationalization framework for JavaScript, providing an easy way to add multi-language support to your applications;
- **Zustand**: A small, fast, and scalable state-management solution using simplified flux principles. It allows developers to manage their application's state in a simple and intuitive way without the need for complex reducers or action creators like Redux;
- **Husky, Commitlint, Commitizen**: The use of those 3 libraries together ensures that commit messages are consistent, readable, and follow best practices. This can make it easier to review code changes, generate changelogs, and understand the history of the project.

The project had some relevant stack and structure changes since it was first started which caused some redundances and it is still being improved.

## Tree Structure
```
└───packages
    ├───apps
    │   ├───admin
    │   │   ├───api
    │   │   ├───app
    │   │   │   ├───api
    │   │   │   │   ├───auth
    │   │   │   │   └───openai
    │   │   │   ├───create
    │   │   │   ├───edit
    │   │   │   │   └───[id]
    │   │   │   └───responses
    │   │   │       └───[id]
    │   │   ├───components
    │   │   ├───constants
    │   │   ├───hooks
    │   │   ├───i18n
    │   │   ├───store
    │   │   ├───types
    │   │   └───utils
    │   └───submission
    │       ├───api
    │       ├───app
    │       │   └───[id]
    │       ├───components
    │       ├───hooks
    │       ├───i18n
    │       └───store
    ├───commons
    │   ├───types
    │   │   ├───declarations
    │   │   ├───global
    │   │   └───interfaces
    │   └───utils
    │       └───src
    │           ├───constants
    │           └───functions
    └───configs
        ├───eslint
        ├───test
        └───tsconfig
```

## Front-end Applications

### Admin Application

The first front-end application is designed for management tasks. It provides an interface where users can create forms with the assistance of an AI. Once a form is created, users can edit it as per their requirements. The application also provides a feature to view the responses submitted through these forms. The responses are displayed in a customized table, providing a clear and concise view of the data.


### Submission Application

The second front-end application serves as a public interface where users can answer the forms created through the admin application. It ensures smooth navigation and an easy-to-use interface for users to submit their responses.

## Getting Started

To get started with this project:

1. Clone the repository to your local machine
2. Install the dependencies: `pnpm install`
3. Run `pnpm dev` to start the development server for both applications\
            i.  Alternatively you can run `pnpm dev:admin` to start *Admin* application on port `3000`\
            ii. Alternatively you can run `pnpm dev:submission` to start *Submission* application on port `3001`
4. Run `pnpm commit` to commit changes
5. To build the applications for production, run `pnpm build`

## Tests
Unit tests were configured already, but haven't been created yet.   
