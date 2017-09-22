import base from './rollup.config.base'

const config = Object.assign({}, base, {
	exports: 'name',
	output: {
		file: 'dist/vue-progress-path.umd.js',
		format: 'umd',
	},
})

export default config
