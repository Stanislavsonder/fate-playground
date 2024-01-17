module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaVersion: 'latest'
	},
	extends: ['plugin:vue/vue3-recommended', 'prettier'],
	rules: {
		//"prettier/prettier": "warn",
		'vue/x-invalid-end-tag': 'off',
		'no-tabs': 'off',
		'no-undef': 'off',
		'vue/no-undef': 'off',
		'no-console': [
			'warn',
			{
				allow: ['warn', 'error']
			}
		],
		'no-debugger': 'warn',
		'vue/v-on-event-hyphenation': ['warn', 'always'],
		'vue/require-explicit-emits': 'off',
		'vue/no-empty-component-block': 'warn',
		'vue/no-multiple-objects-in-class': 'warn',
		'vue/no-duplicate-attr-inheritance': 'off',
		//'vue/no-required-prop-with-default': 'warn',
		//'vue/v-on-handler-style': 'warn',
		'vue/no-static-inline-styles': 'warn',
		'vue/no-template-target-blank': 'warn',
		'vue/no-this-in-before-route-enter': 'error',
		'vue/no-unsupported-features': [
			'error',
			{
				version: '^3.4.14'
			}
		],
		'vue/v-for-delimiter-style': 'warn',
		'vue/no-setup-props-destructure': 'off',
		'vue/require-name-property': 'warn',
		'vue/require-direct-export': 'warn',
		'vue/prefer-true-attribute-shorthand': 'warn',
		'vue/prefer-prop-type-boolean-first': 'warn',
		'vue/padding-line-between-blocks': 'warn',
		'vue/no-useless-v-bind': 'warn',
		'vue/multi-word-component-names': 'off',
		'vue/match-component-file-name': [
			'warn',
			{
				extensions: ['jsx', 'vue'],
				shouldMatchCase: true
			}
		],
		'vue/component-definition-name-casing': 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/no-bare-strings-in-template': [
			process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			{
				allowlist: [
					'(',
					')',
					',',
					'.',
					'&',
					'+',
					'-',
					'=',
					'*',
					'/',
					'#',
					'%',
					'!',
					'?',
					':',
					'[',
					']',
					'{',
					'}',
					'<',
					'>',
					'\u00b7',
					'\u2022',
					'\u2010',
					'\u2013',
					'\u2014',
					'\u2212',
					'|'
				],
				attributes: {
					'/.+/': ['title', 'aria-label', 'aria-placeholder', 'aria-roledescription', 'aria-valuetext'],
					input: ['placeholder'],
					img: ['alt']
				},
				directives: ['v-text']
			}
		],
		'vue/next-tick-style': ['error', 'promise'],
		'vue/define-macros-order': [
			'warn',
			{
				order: ['defineProps', 'defineEmits']
			}
		],
		'vue/custom-event-name-casing': ['warn', 'camelCase', { ignores: [] }],
		'vue/block-tag-newline': [
			'warn',
			{
				singleline: 'always',
				multiline: 'always',
				maxEmptyLines: 0
			}
		],
		'vue/block-lang': ['warn', { script: { lang: 'ts' } }]
	}
}
