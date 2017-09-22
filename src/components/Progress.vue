<template>
	<div class="vue-progress">
		<svg :width="finalWidth" :height="finalHeight" viewBox="0 0 1 1">
			<g :transform="`translate(size, size)`">
				<g class="container">
					<path v-if="!hideBackground" class="path background" :d="path" />
					<path ref="path" class="path progress" :d="path" :stroke-dasharray="`${dasharray} ${dasharray}`" :stroke-dashoffset="dashoffset" />
				</g>
			</g>
		</svg>
	</div>
</template>

<script>
import shapes from '../shapes'
import { globalOptions } from '../'

export default {
	name: 'Progress',

	props: {
		height: {
			type: [String, Number],
			default: 0,
		},
		hideBackground: {
			type: Boolean,
			default: false,
		},
		indeterminate: {
			type: Boolean,
			default: false,
		},
		progress: {
			type: Number,
			default: 0,
			validate (value) {
				return value >= -1 && value <= 1
			},
		},
		shape: {
			type: String,
			default: null,
		},
		size: {
			type: [String, Number],
			required: true,
		},
		width: {
			type: [String, Number],
			default: 0,
		},
	},

	data () {
		return {
			dasharray: 0,
			rotation: 0,
		}
	},

	computed: {
		finalHeight () {
			return this.height || this.size
		},

		finalShape () {
			if (this.shape) {
				return this.shape
			} else {
				return globalOptions.defaultShape
			}
		},

		finalWidth () {
			return this.width || this.size
		},

		path () {
			let path = shapes[this.finalShape] || this.finalShape
			if (path) {
				if (typeof path === 'function') {
					path = path(this.size)
				}
				return path
			}
		},
	},

	watch: {
		path: {
			handler () {
				this.$nextTick(() => {
					this.dasharray = this.$refs.path.getTotalLength()
				})
			},
			immediate: true,
		},
	},
}
</script>

<style lang="stylus">
.vue-progress {
	.path {
		fill: none;
		stroke-width: 5;
		stroke-opacity: .5;
	}

	.background {
		stroke: #ddd;
	}

	.progress {
		stroke: #40b883;
	}
}
</style>
