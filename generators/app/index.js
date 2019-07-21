'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the super-excellent ${chalk.red('generator-plumejs')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name: ',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description: ',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('_src/_index.html'),
      this.destinationPath('src/index.html')
    );

    this.fs.copy(
      this.templatePath('_src/_index.ts'),
      this.destinationPath('src/index.ts')
    );

    this.fs.copy(
      this.templatePath('_webpack/_base.config.js'),
      this.destinationPath('webpack/base.config.js')
    );

    this.fs.copy(
      this.templatePath('_webpack/_build.config.js'),
      this.destinationPath('webpack/build.config.js')
    );

    this.fs.copy(
      this.templatePath('_webpack/_server.config.js'),
      this.destinationPath('webpack/server.config.js')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json', {
        name: this.props.name,
        description: this.props.description
      })
    );

    this.fs.copy(
      this.templatePath('_babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
  }

  install() {
    this.installDependencies();
  }
};
