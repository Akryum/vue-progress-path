<template>
	<div
		class="vue-progress-path"
		:class="cssClass"
		:style="style">
		<svg
			:width="finalWidth"
			:height="finalHeight"
			:viewBox="`0 0 ${finalWidth} ${finalHeight}`">
			<g :transform="`translate(${(finalWidth - size) / 2}, ${(finalHeight - size) / 2}) rotate(${finalRotation}, ${size / 2}, ${size / 2})`">
				<g class="container">
					<path
						v-if="!hideBackground"
						class="background"
						:d="path"
					/>
					<path
						ref="path"
						class="progress"
						:d="path"
						:stroke-dasharray="`${finalDasharray} ${finalDasharray}`"
						:stroke-dashoffset="finalDashoffset"
					/>
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
		counterClockwise: {
			type: Boolean,
			default: false,
		},
		fillDuration: {
			type: [String, Number],
			default: 1,
		},
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
		rotate: {
			type: Boolean,
			default: false,
		},
		rotationDuration: {
			type: [String, Number],
			default: 1,
		},
		shape: {
			type: String,
			default: null,
		},
		size: {
			type: [String, Number],
			default: 100,
		},
		staticPath: {
			type: Boolean,
			default: false,
		},
		width: {
			type: [String, Number],
			default: 0,
		},
	},

	data () {
		return {
			dasharray: 0,
			dashoffset: 0,
			rotation: 0,
			animating: false,
		}
	},

	computed: {
		cssClass () {
			return {
				'indeterminate': this.indeterminate,
			}
		},

		finalDasharray () {
			return (this.finalDashoffset === 0 ||
				this.finalDashoffset === this.dasharray * 2)
				? 0 : this.dasharray
		},

		finalDashoffset () {
			if (this.animating) {
				return this.dashoffset
			} else {
				if (this.finalProgress < 0) {
					return -this.dasharray * this.finalProgress + this.dasharray
				} else {
					return (1 - this.finalProgress) * this.dasharray
				}
			}
		},

		finalHeight () {
			return this.height || parseFloat(this.size) + 50
		},

		finalProgress () {
			if (this.counterClockwise) {
				return -this.progress
			} else {
				return this.progress
			}
		},

		finalRotation () {
			return this.animating ? this.rotation : 0
		},

		finalShape () {
			if (this.shape) {
				return this.shape
			} else {
				return globalOptions.defaultShape
			}
		},

		finalWidth () {
			return this.width || parseFloat(this.size) + 50
		},

		style () {
			return {
				width: `${this.finalWidth}px`,
				height: `${this.finalHeight}px`,
			}
		},

		svgStyle () {
			return {

			}
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
		indeterminate: {
			handler (value) {
				if (value) {
					this.startAnimation()
				} else {
					this.stopAnimation()
				}
			},
			immediate: true,
		},

		path: {
			handler () {
				this.$nextTick(() => {
					this.dasharray = this.$refs.path.getTotalLength()
				})
			},
			immediate: true,
		},
	},

	methods: {
		frame (timestamp) {
			const time = (timestamp - this._animationLastFrame)
			this._animationLastFrame = timestamp

			if (this.rotate) {
				const direction = this.counterClockwise ? -1 : 1
				const d = time * 360 / (parseFloat(this.rotationDuration) * 1000)
				this.rotation += d * direction
				if (this.counterClockwise) {
					if (this.rotation < 0) {
						this.rotation += 360
					}
				} else {
					if (this.rotation > 360) {
						this.rotation -= 360
					}
				}
			}

			if (!this.staticPath) {
				const range = this.dasharray * 2
				const direction = this.counterClockwise ? 1 : -1
				const d = time * range / (parseFloat(this.fillDuration) * 1000)
				this.dashoffset += d * direction
				if (this.counterClockwise) {
					if (this.dashoffset < 0) {
						this.dashoffset += range
					}
				} else {
					if (this.dashoffset > range) {
						this.dashoffset -= range
					}
				}
			}

			if (this.animating) {
				requestAnimationFrame(this.frame)
			}
		},

		startAnimation () {
			this.dashoffset = this.dasharray
			this.rotation = 0
			this.animating = true
			this._animationLastFrame = performance.now()
			requestAnimationFrame(this.frame)
		},

		stopAnimation () {
			this.animating = false
		},
	},

	beforeDestroy () {
		this.stopAnimation()
	},
}
</script>

<style lang="stylus">
.vue-progress-path {
	display: inline-block;

	path {
		fill: none;
		stroke-width: 6;
		transition: stroke-dashoffset .3s ease-in-out;
	}

	.background {
		stroke: #ddd;
	}

	.progress {
		stroke: #40b883;
	}

	&.indeterminate {
		path {
			transition: none;
		}
	}
}
</style>
