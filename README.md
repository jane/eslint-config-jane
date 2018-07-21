# eslint-config-jane

## Deprecated

Use [eslint-plugin-jane](http://npm.im/eslint-plugin-jane).

Shared eslint config for front-end projects at [Jane](https://jane.com).

--------

## Installation

`npm i -D eslint-config-jane`

You'll also need to install some plugins (`peerDependencies`), at least until
there's some sort of resolution for [this
issue](https://github.com/eslint/eslint/issues/3458):

`npm i -D babel-eslint eslint-plugin-babel eslint-plugin-promise
eslint-plugin-import eslint-plugin-unicorn`.

Optionally, you can also install any or all of:

* `eslint-plugin-jest`
* `eslint-plugin-jsx-a11y`
* `eslint-plugin-prettier`
* `eslint-plugin-react`

If they're installed, their rules will be used. If `eslint-plugin-prettier` is
installed, our style rules are removed.

## Usage

.eslintrc
```json
{
  "root": true,
  "extends": "eslint-config-jane"
  // any custom configs
}
```

.prettierrc.js
```javascript
module.exports = require('eslint-config-jane/prettier')
```

## Notes

Our rules are heavily based on [Standard](https://standardjs.com/).

Most rules only warn. Exceptions (rules that error):

* `comma-dangle`: es5 compatible
* `eol-last`
* `indent`: _2, `SwitchCase` 1_
* `new-cap`: _`newIsCap` true, `capIsNew` false_
* `no-duplicate-imports`
* `no-eval`
* `no-extend-native`
* `no-global-assign`
* `no-mixed-tabs-and-spaces`
* `no-tabs`
* `no-undef`
* `no-undef-init`
* `no-with`
* `quotes`: _single, avoidEscape true_
* `unicode-bom`: _never_
* `unicorn/filename-case`: _kebab_

## LICENSE

[MIT](./LICENSE.md)
