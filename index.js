#!/usr/bin/env node
"use strict";

const inquirer = require('inquirer');
const chalk = require('chalk');

const response = chalk.bold.green;

const resume = require('./resume.json');

const resumePrompts = {
  type: 'list',
  name: 'resumeOptions',
  message: 'Hello, what would you like to know about me?',
  choices: [...Object.keys(resume), 'Exit']
};

const main = () => {
  console.log('Hello, my name is Aaron Deane, and welcome to my CLI resume');
  resumeHandler();
}

const resumeHandler = () => {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions === 'Exit') {return;}

    const option = answer.resumeOptions;
    console.log(response('-----------------------------------------------'));
    resume[`${option}`].forEach(item => {
      console.log(response("|    => " + item));
    });
    console.log(response('------------------------------------------------'));
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}
main();