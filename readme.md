# Typescript Boilerplate

A simple and ready to use Node.Js Typescript Boilerplate with some custom configs for ME.

This boilerplate includes some basic tools as:

- [ESlint][eslint] for code linting.
- [Jest][jest] for unit testing and coverage.
- [Husky][husky] to run scripts based on git hooks.
- [CommitMessageLinter][msg-linter] to prevent commits outside the conventional format.
- [LintStaged][lint-staged] to run tests only on staged files.
- [FakerJs][faker-js] to create random values for tests.
- [ModuleAlias][module-alias] to handle the defined modules in tsconfig

## Getting Started

To clone the repository, use the following commands:

```sh
git clone https://github.com/gabriel-fabian/typescript-boilerplate
cd typescript-boilerplate
npm install && npm run prepare
```

## Additional Information

This boilerplate will prevent commits outside the [ConventionalCommits][conventional-commits] format, if you don't know what that is read the linked DOC.

Husky is configured to run three scripts. A pre-commit one to execute the [LintStaged][lint-staged] which will run all the commands in `.lintstagedrc.json` config file. A pre-push one to execute Jest in coverage mode. And a commit-msg one to enable `git-commit-msg-linter` when using Husky

If Husky isn't working make sure to run `npm run prepare` and have files matching the LintStaged config.

Note that in case you decided to use `@` aliases when importing files, you will need to call `module-alias/register` in the main file of your project or else your compiled source with `tsc` will not know how to handle these modules. e.g.

```javascript
  import 'module-alias/register' // Import the module-alias register to handle the @ module imports
  import { app } from './express'

  const port: number = Number(process.env.PORT) || 3000

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
```

## License

Licensed under the GNU GPL v3.0. See the [LICENSE](https://github.com/gabriel-fabian/typescript-boilerplate/blob/master/LICENSE) file for details.

[eslint]: https://github.com/eslint/eslint
[jest]: https://github.com/facebook/jest
[husky]: https://github.com/typicode/husky
[msg-linter]: https://github.com/legend80s/commit-msg-linter
[lint-staged]: https://github.com/okonet/lint-staged
[faker-js]: https://github.com/faker-js/faker
[conventional-commits]: https://www.conventionalcommits.org/
[module-alias]: https://github.com/ilearnio/module-alias
