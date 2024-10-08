'use strict';

import chalk from 'chalk';
import Generator from 'yeoman-generator';
import yosay from 'yosay';
import { mkdirp } from 'mkdirp';
import figlet from 'figlet';

class PlumeJSGenerator extends Generator {
	constructor(args, options) {
		super(args, options);
	}

	async prompting() {
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
				message: "What's your project name? ",
				default: this.appname
			},
			{
				type: 'input',
				name: 'description',
				message: "What's your project description? ",
				default: ''
			},
			{
				type: 'list',
				name: 'bundler',
				message: 'Which bundler to use? ',
				choices: [
					{
						name: 'Vite',
						value: 'VITE'
					},
					{
						name: 'Webpack',
						value: 'WEBPACK'
					}
				]
			},
			{
				type: 'list',
				name: 'dockerSetup',
				message: 'Do you want to setup Dockerfile?',
				choices: [
					{
						name: 'Yes',
						value: 'YES'
					},
					{
						name: 'skip',
						value: 'SKIP'
					}
				]
			},
			{
				type: 'list',
				name: 'pkgManager',
				message: 'Which package manager to use? ',
				choices: [
					{
						name: 'Yarn',
						value: 'yarn'
					},
					{
						name: 'npm',
						value: 'npm'
					},
					{
						name: 'pnpm',
						value: 'pnpm'
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
			this.answers.bundler === 'WEBPACK'
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

		if (this.answers.bundler === 'WEBPACK') {
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
				this.templatePath('_tsconfig.app.json'),
				this.destinationPath('tsconfig.app.json')
			);

			this.fs.copy(
				this.templatePath('_vitest.config.js'),
				this.destinationPath('vitest.config.js')
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
			this.answers.bundler === 'WEBPACK'
				? this.templatePath('_package-webpack.json')
				: this.templatePath('_package-vite.json'),
			this.destinationPath('package.json'),
			{
				name: this.answers.name,
				description: this.answers.description
			}
		);

		this.fs.copy(
			this.templatePath('_vitest.setup.js'),
			this.destinationPath('vitest.setup.js')
		);

		this.fs.copy(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore')
		);

		this.fs.copy(
			this.templatePath('_eslint.config.mjs'),
			this.destinationPath('eslint.config.mjs')
		);

		this.fs.copy(
			this.templatePath('_prettierrc.json'),
			this.destinationPath('.prettierrc.json')
		);

		this.fs.copy(
			this.templatePath('_tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);
		if (this.answers.dockerSetup === 'YES') {
			this.fs.copy(
				this.templatePath('_dockerignore'),
				this.destinationPath('.dockerignore')
			);

			this.fs.copy(
				this.templatePath('_Dockerfile'),
				this.destinationPath('Dockerfile')
			);

			this.fs.copy(
				this.templatePath('_server.js'),
				this.destinationPath('server.js')
			);
		}

		this.fs.copy(
			this.templatePath('_README.md'),
			this.destinationPath('README.md')
		);
	}

	install() {
		this.env.options.nodePackageManager = this.answers.pkgManager;
	}

	async end() {
		this.log(
			`Successfully created project ${this.answers.name}. Happy coding..`
		);

		const answer = await this.prompt({
			type: 'list',
			name: 'openWith',
			message: 'Do you want to open the new folder with Visual Studio Code?',
			choices: [
				{
					name: 'Yes',
					value: 'code'
				},
				{
					name: 'skip',
					value: 'skip'
				}
			]
		});

		if (answer && answer.openWith && answer.openWith !== 'skip') {
			this.spawnCommand(answer.openWith, [this.destinationPath()]);
		}
	}
}

export default PlumeJSGenerator;
