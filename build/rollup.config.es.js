import base from './rollup.config.base'

const config = Object.assign({}, base, {
	output: {
		file: 'dist/vue-progress-path.esm.js',
		format: 'es',
	},
})

export default config
