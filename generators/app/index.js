'use strict';

import chalk from 'chalk';
import Generator from 'yeoman-generator';
import yosay from 'yosay';
import mkdirp from 'mkdirp';
import figlet from 'figlet';

class PlumeJSGenerator extends Generator {
	constructor(args, options) {
		super(args, options);
	}

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
			yosay(`Welcome to the super-excellent ${chalk.red('PlumeJS')} generator!`)
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
			},
			{
				type: 'list',
				name: 'bundler',
				message: 'Select a bundler for your project: ',
				choices: [
					{
						name: 'Vite',
						value: 'V'
					},
					{
						name: 'Webpack',
						value: 'W'
					}
				]
			}
		];

		this.answers = await this.prompt(prompts);
		this.env.cwd = this.answers.name;
	}

	writing() {
		mkdirp.sync(this.answers.name);
		this.destinationRoot(this.answers.name);

		this.fs.copy(
			this.templatePath('_@types/_typings.d.ts'),
			this.destinationPath('@types/typings.d.ts')
		);

		this.fs.copy(
			this.answers.bundler === 'W'
				? this.templatePath('_index-webpack.html')
				: this.templatePath('_index-vite.html'),
			this.destinationPath('index.html')
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
			this.templatePath('_src/_styles/_styles.scss'),
			this.destinationPath('src/styles/styles.scss')
		);

		if (this.answers.bundler === 'W') {
			this.fs.copy(
				this.templatePath('_src/_images/logo.jpg'),
				this.destinationPath('src/images/logo.jpg')
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

			this.fs.copy(
				this.templatePath('_config/_jest.setup.js'),
				this.destinationPath('config/jest.setup.js')
			);

			this.fs.copy(
				this.templatePath('_jest.config.js'),
				this.destinationPath('jest.config.js')
			);
		} else {
			this.fs.copy(
				this.templatePath('_public/_images/logo.jpg'),
				this.destinationPath('public/images/logo.jpg')
			);

			this.fs.copy(
				this.templatePath('_vite.config.js'),
				this.destinationPath('vite.config.js')
			);
		}

		this.fs.copyTpl(
			this.answers.bundler === 'W'
				? this.templatePath('_package-webpack.json')
				: this.templatePath('_package-vite.json'),
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
			this.templatePath('_eslintrc.json'),
			this.destinationPath('.eslintrc.json')
		);

		this.fs.copy(
			this.templatePath('_prettierrc.json'),
			this.destinationPath('.prettierrc.json')
		);

		this.fs.copy(
			this.templatePath('_tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);

		this.fs.copy(
			this.templatePath('_README.md'),
			this.destinationPath('README.md')
		);
	}

	end() {
		this.log(
			`Successfully created project ${this.answers.name}. Happy coding..`
		);
	}
}

export default PlumeJSGenerator;
