'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const figlet = require('figlet');

module.exports = class extends Generator {
	async prompting() {
		// Have Yeoman greet the user.
		this.log(
			chalk.yellow(
				figlet.textSync('PlumeJS', {
					horizontalLayout: 'full'
				})
			)
		);
		this.log(
			yosay(`Welcome to the super-excellent ${chalk.red('plumejs')} generator!`)
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

		this.answers = await this.prompt(prompts);
	}

	writing() {
		mkdirp.sync(this.answers.name);
		this.destinationRoot(this.answers.name);
		this.fs.copy(
			this.templatePath('_src/_index.html'),
			this.destinationPath('src/index.html')
		);

		this.fs.copy(
			this.templatePath('_src/_index.ts'),
			this.destinationPath('src/index.ts')
		);

		this.fs.copy(
			this.templatePath('_src/_index.spec.ts'),
			this.destinationPath('src/index.spec.ts')
		);

		this.fs.copy(
			this.templatePath('_src/_polyfills.ts'),
			this.destinationPath('src/polyfills.ts')
		);

		this.fs.copy(
			this.templatePath('_src/_sample-ele.ts'),
			this.destinationPath('src/sample-ele.ts')
		);

		this.fs.copy(
			this.templatePath('_src/_persons/_persons-list.ts'),
			this.destinationPath('src/persons/persons-list.ts')
		);

		this.fs.copy(
			this.templatePath('_src/_persons/_persons-list.scss'),
			this.destinationPath('src/persons/persons-list.scss')
		);

		this.fs.copy(
			this.templatePath('_src/_styles.scss'),
			this.destinationPath('src/styles.scss')
		);

		this.fs.copy(
			this.templatePath('_src/_i18n/_en.ts'),
			this.destinationPath('src/i18n/en.ts')
		);

		this.fs.copy(
			this.templatePath('_src/_i18n/_fr.ts'),
			this.destinationPath('src/i18n/fr.ts')
		);

		this.fs.copy(
			this.templatePath('_@types/_browser-or-node/_index.d.ts'),
			this.destinationPath('@types/browser-or-node/index.d.ts')
		);

		this.fs.copy(
			this.templatePath('_@types/_vanilla-i18n/_index.d.ts'),
			this.destinationPath('@types/vanilla-i18n/index.d.ts')
		);

		this.fs.copy(
			this.templatePath('_@types/_typings.d.ts'),
			this.destinationPath('@types/typings.d.ts')
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
			this.destinationPath('package.json'),
			{
				name: this.answers.name,
				description: this.answers.description
			}
		);

		this.fs.copy(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore')
		);

		this.fs.copy(
			this.templatePath('_tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);

		this.fs.copy(
			this.templatePath('_tsconfig.app.json'),
			this.destinationPath('tsconfig.app.json')
		);

		this.fs.copy(
			this.templatePath('_tsconfig.spec.json'),
			this.destinationPath('tsconfig.spec.json')
		);

		this.fs.copy(
			this.templatePath('_README.md'),
			this.destinationPath('README.md')
		);

		this.fs.copy(
			this.templatePath('_jest.config.js'),
			this.destinationPath('jest.config.js')
		);

		this.fs.copy(
			this.templatePath('_config/_jest.setup.js'),
			this.destinationPath('config/jest.setup.js')
		);
	}

	install() {
		this.installDependencies({
			bower: false,
			npm: true
		});
	}
};
