# **IHL**
IHL is a portal for user to compete among your friends in terms of healthy lifestyle.

## **Local Development**
This is project is built with expressjs. Before you can start local development you need to take care of a few prerequisites, required by the project.

+ [Installing Prerequisites](#installing-prerequisites)
+ [Clone Project](#cloone-project)
+ [Install project dependencies](#install-project)
+ [Start Local Development Server](#start-local-development-server)

## Installing Prerequisites

### Using apt package manager
Before you begin installing make sure you run `sudo apt update` to get the latest version available.

```
# if you do not have nodejs installed on your system
sudo apt install nodejs

#if you do not have npm installed on your system
sudo apt install npm

```

## Clone Project
You can simply clone the project using git as:
```
git clone https://github.com/csdu/sankalan-portal
```
or you can simply download ZIP and extract it.

## Install project dependencies

Change into poject directory and install all dependencies using npm:

npm install

This will install all the node packages required by the project. After installing node dependencies, you should compile down the frontend assets using,

```
npm run dev
```
This will compile down our stylesheets (CSS) & javascript files. You can also run a watcher to automatically compile the assets, whenever the files are changed. This is recommended when you're working with SASS or the javascript, you do not need to run npm run dev again and again, you can simply run:
```
npm run watch
```
## Start Local Development Server

To begin browsing & testing the portal you'd need to start a local development server.
```
node app.js
```
This will serve your website at `localhost:8000`, you can now open this up in your browser.

## **Contribution**

All type of contributions are invited, make sure you create your own new branch before implementing a new feature and then make commit from that branch and then push it to your own remote branch. Thank you!