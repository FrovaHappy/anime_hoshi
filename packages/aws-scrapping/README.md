<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS with Typescript'
description: 'This template demonstrates how to make a simple HTTP API with Node.js and Typescript running on AWS Lambda and API Gateway using the Serverless Framework v3.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Scraping modules with Playwrights

**Serverless Framework Node with Typescript HTTP API on AWS**
This module is built on a HTTP API with Node.js and Typescript template by Serverless Framework v3.

## Resources
You will need to have an aws account, also have both [aws cli](https://aws.amazon.com/es/cli/) and [severless framework](https://www.serverless.com/framework/docs/getting-started) installed on your computer.

To set the access key use `$ aws configure`.

## Setup

Run this command to initialize a new project in a new working directory.

``` bash
$ npm install
```

## Usage

**Deploy**

``` bash
$ serverless deploy
```

**Invoke the function locally.**

``` bash
$ serverless invoke local --function hello
```

**Invoke the function**

``` bash
$ curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/
```
