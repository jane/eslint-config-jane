const { isInstalled, keep } = require('./helpers')
const prettierFormat = require('./prettier')

const hasReact = isInstalled('eslint-plugin-react')
const hasA11y = isInstalled('eslint-plugin-jsx-a11y')
const hasJest = isInstalled('eslint-plugin-jest')
const hasPrettier = isInstalled('eslint-plugin-prettier')
const hasFlow = isInstalled('flow-bin')

const reactStyleRules = {
  'react/jsx-indent': ['warn', 2],
  'react/jsx-indent-props': ['warn', 2],
  'react/jsx-tag-spacing': [
    'warn',
    {
      afterOpening: 'never',
      beforeSelfClosing: 'always',
      closingSlash: 'never',
    },
  ],
  'react/jsx-curly-spacing': ['warn', 'never'],
  'react/jsx-equals-spacing': ['warn', 'never'],
}

const reactRules = Object.assign(
  {
    'react/jsx-no-bind': 0,
    'react/no-did-update-set-state': 'warn',
    'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],
    'react/jsx-no-undef': 'warn',
    'react/jsx-pascal-case': [
      'warn',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-direct-mutation-state': 'error',
    'react/no-access-state-in-setstate': 'warn',
    'react/no-is-mounted': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/no-unknown-property': 'warn',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/require-render-return': 'warn',
    'react/self-closing-comp': 'warn',
  },
  !hasPrettier && reactStyleRules
)

const a11yRules = {
  'jsx-a11y/accessible-emoji': 'warn',
  'jsx-a11y/alt-text': 'warn',
  'jsx-a11y/anchor-has-content': 'warn',
  'jsx-a11y/anchor-is-valid': 'warn',
  'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
  'jsx-a11y/aria-props': 'warn',
  'jsx-a11y/aria-proptypes': 'warn',
  'jsx-a11y/aria-role': 'warn',
  'jsx-a11y/aria-unsupported-elements': 'warn',
  'jsx-a11y/click-events-have-key-events': 'warn',
  'jsx-a11y/heading-has-content': 'warn',
  'jsx-a11y/html-has-lang': 'warn',
  'jsx-a11y/iframe-has-title': 'warn',
  'jsx-a11y/img-redundant-alt': 'warn',
  'jsx-a11y/label-has-for': 'warn',
  'jsx-a11y/mouse-events-have-key-events': 'warn',
  'jsx-a11y/no-access-key': 'warn',
  'jsx-a11y/no-distracting-elements': 'warn',
  'jsx-a11y/no-onchange': 'warn',
  'jsx-a11y/no-redundant-roles': 'warn',
  'jsx-a11y/interactive-supports-focus': 'warn',
  'jsx-a11y/role-has-required-aria-props': 'warn',
  'jsx-a11y/role-supports-aria-props': 'warn',
  'jsx-a11y/scope': 'warn',
  'jsx-a11y/tabindex-no-positive': 'warn',
}

const jestRules = {
  'jest/no-disabled-tests': 0,
  'jest/no-focused-tests': 'warn',
  'jest/no-identical-title': 'warn',
  'jest/valid-expect': 'warn',
}

const styleRules = {
  'arrow-parens': ['warn', 'always'],
  'arrow-spacing': ['warn', { before: true, after: true }],
  'block-spacing': ['warn', 'always'],
  'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
  'comma-spacing': ['warn', { before: false, after: true }],
  'comma-style': ['warn', 'last'],
  'dot-location': ['warn', 'property'],
  'func-call-spacing': ['warn', 'never'],
  'generator-star-spacing': ['warn', { before: true, after: true }],
  indent: ['error', 2, { SwitchCase: 1 }],
  'jsx-quotes': ['warn', 'prefer-double'],
  'key-spacing': [
    'warn',
    {
      beforeColon: false,
      afterColon: true,
    },
  ],
  'keyword-spacing': ['warn', { before: true, after: true }],
  'max-len': [
    'warn',
    120,
    {
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
    },
  ],
  'no-mixed-spaces-and-tabs': 'error',
  'no-tabs': 'error',
  'no-multi-spaces': [0],
  'no-multiple-empty-lines': ['warn', { max: 1 }],
  'object-curly-spacing': ['warn', 'always'],
  'object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
  'one-var': [0],
  'operator-linebreak': [
    'warn',
    'after',
    {
      overrides: {
        '?': 'before',
        ':': 'before',
      },
    },
  ],
  'padded-blocks': ['warn', 'never'],
  quotes: ['error', 'single', { avoidEscape: true }],
  'rest-spread-spacing': ['warn', 'never'],
  semi: ['warn', 'never'],
  'semi-spacing': ['warn', { before: false, after: true }],
  'space-before-blocks': ['warn', 'always'],
  'space-before-function-paren': ['warn', 'always'],
  'space-in-parens': ['warn', 'never'],
  'space-infix-ops': 'warn',
  'space-unary-ops': ['warn', { words: true, nonwords: false }],
  'spaced-comment': [
    'warn',
    'always',
    {
      line: { markers: ['*package', '!', ','] },
      block: {
        balanced: true,
        markers: ['*package', '!', ','],
        exceptions: ['*'],
      },
    },
  ],
  'template-curly-spacing': ['warn', 'never'],
  'yield-star-spacing': ['warn', 'both'],
}

const prettierRules = {
  'prettier/prettier': ['warn', prettierFormat],
}

const flowRules = {
  'flowtype-errors/show-errors': [2],
  'flowtype/generic-spacing': [0],
  'flowtype/space-after-type-colon': [0],
  'flowtype/no-weak-types': [2],
  'flowtype/no-types-missing-file-annotation': [2],
  'flowtype/require-parameter-type': [0],
  'flowtype/require-return-type': [
    2,
    'always',
    {
      annotateUndefined: 'always',
      excludeArrowFunctions: 'expressionsOnly',
    },
  ],
  'flowtype/require-variable-type': [
    2,
    {
      excludeVariableTypes: {
        const: true,
        let: false,
        var: false,
      },
    },
  ],
}

const baseRules = {
  'array-callback-return': 'warn',
  'arrow-body-style': ['warn', 'as-needed'],
  camelcase: ['warn', { properties: 'never' }],
  'comma-dangle': [
    'error',
    {
      arrays: 'ignore',
      objects: 'ignore',
      imports: 'ignore',
      exports: 'ignore',
      functions: 'never',
    },
  ],
  'constructor-super': 'warn',
  curly: ['warn', 'multi-line'],
  'default-case': ['warn', { commentPattern: '^no default$' }],
  'eol-last': 'error',
  eqeqeq: ['warn', 'allow-null'],
  'guard-for-in': 'warn',
  'new-cap': ['error', { newIsCap: true, capIsNew: false }],
  'new-parens': 'warn',
  'no-array-constructor': 'warn',
  'no-caller': 'warn',
  'no-class-assign': 'warn',
  'no-cond-assign': ['warn', 'always'],
  'no-console': ['warn'],
  'no-const-assign': 'warn',
  'no-constant-condition': ['warn', { checkLoops: false }],
  'no-control-regex': 'warn',
  'no-debugger': 'warn',
  'no-delete-var': 'warn',
  'no-dupe-args': 'warn',
  'no-dupe-class-members': 'warn',
  'no-dupe-keys': 'warn',
  'no-duplicate-case': 'warn',
  'no-duplicate-imports': 'error',
  'no-empty-character-class': 'warn',
  'no-empty-pattern': 'warn',
  'no-eval': 'error',
  'no-ex-assign': 'warn',
  'no-extend-native': 'error',
  'no-extra-bind': 'warn',
  'no-extra-label': 'warn',
  'no-extra-parens': ['warn', 'functions'],
  'no-fallthrough': 'warn',
  'no-func-assign': 'warn',
  'no-global-assign': 'error',
  'no-implied-eval': 'warn',
  'no-invalid-regexp': 'warn',
  'no-irregular-whitespace': 'warn',
  'no-iterator': 'warn',
  'no-label-var': 'warn',
  'no-labels': ['warn', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': 'warn',
  'no-loop-func': 'warn',
  'no-mixed-operators': [
    'warn',
    {
      groups: [
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
      allowSamePrecedence: false,
    },
  ],
  'no-multi-str': 'warn',
  'no-native-reassign': 'warn',
  'no-negated-in-lhs': 'warn',
  'no-new-func': 'warn',
  'no-new-object': 'warn',
  'no-new-require': 'warn',
  'no-new-symbol': 'warn',
  'no-new-wrappers': 'warn',
  'no-obj-calls': 'warn',
  'no-octal': 'warn',
  'no-octal-escape': 'warn',
  'no-path-concat': 'warn',
  'no-proto': 'warn',
  'no-redeclare': 'warn',
  'no-regex-spaces': 'warn',
  'no-restricted-syntax': ['warn', 'LabeledStatement', 'WithStatement'],
  'no-return-assign': ['warn', 'except-parens'],
  'no-script-url': 'warn',
  'no-self-assign': 'warn',
  'no-self-compare': 'warn',
  'no-sequences': 'warn',
  'no-shadow-restricted-names': 'warn',
  'no-sparse-arrays': 'warn',
  'no-template-curly-in-string': 'warn',
  'no-this-before-super': 'warn',
  'no-throw-literal': 'warn',
  'no-trailing-spaces': 'warn',
  'no-undef': 'error',
  'no-undef-init': 'error',
  'no-unexpected-multiline': 'warn',
  'no-unneeded-ternary': ['warn', { defaultAssignment: false }],
  'no-unreachable': 'warn',
  'no-unsafe-finally': 'warn',
  'no-unsafe-negation': 'warn',
  'no-unused-expressions': [
    'warn',
    {
      allowTernary: true,
      allowShortCircuit: true,
    },
  ],
  'no-unused-labels': 'warn',
  'no-unused-vars': [
    'warn',
    {
      vars: 'local',
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_|...props|props',
      args: 'after-used',
      ignoreRestSiblings: true,
    },
  ],
  'no-use-before-define': ['warn', 'nofunc'],
  'no-useless-call': 'warn',
  'no-useless-computed-key': 'warn',
  'no-useless-concat': 'warn',
  'no-useless-constructor': 'warn',
  'no-useless-escape': 'warn',
  'no-useless-rename': [
    'warn',
    {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false,
    },
  ],
  'no-var': 'warn',
  'no-whitespace-before-property': 'warn',
  'no-with': 'error',
  'operator-assignment': ['warn', 'always'],
  'prefer-const': ['warn'],
  'quote-props': ['warn', 'as-needed', { numbers: true }],
  radix: 'warn',
  'require-yield': 'warn',
  strict: ['warn', 'never'],
  'unicode-bom': ['error', 'never'],
  'use-isnan': 'warn',
  'valid-typeof': 'warn',
  'wrap-iife': ['warn', 'any'],
  yoda: ['warn', 'never'],
  'unicorn/filename-case': [
    'error',
    {
      case: 'kebabCase',
    },
  ],
  'unicorn/no-array-instanceof': 'warn',
  'unicorn/no-new-buffer': 'warn',
  'unicorn/prefer-starts-ends-with': 'warn',
  'unicorn/prefer-type-error': 'warn',
  'linebreak-style': ['error', 'unix'],
}

const rules = Object.assign(
  ...keep([
    baseRules,
    hasA11y && a11yRules,
    hasFlow && flowRules,
    hasJest && jestRules,
    !hasPrettier && styleRules,
    hasPrettier && prettierRules,
    hasReact && reactRules,
  ])
)

const config = {
  parser: 'babel-eslint',
  extends: keep([
    'plugin:import/warnings',
    hasFlow && 'plugin:flowtype/recommended',
  ]),
  plugins: keep([
    'babel',
    'unicorn',
    hasA11y && 'jsx-a11y',
    hasFlow && 'flowtype',
    hasFlow && 'flowtype-errors',
    hasJest && 'jest',
    hasPrettier && 'prettier',
    hasReact && 'react',
  ]),
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: hasJest,
  },
  globals: { _jane: false },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: hasReact,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules,
}

module.exports = config
