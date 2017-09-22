var shapes = {
  circle: function circle(size) {
    return "\n  \tM " + size / 2 + ", " + size / 2 + "\n    m 0, -" + size / 2 + "\n    a " + size / 2 + "," + size / 2 + " 0 1 1 0," + size + "\n    a " + size / 2 + "," + size / 2 + " 0 1 1 0,-" + size + "\n  ";
  },
  semicircle: function semicircle(size) {
    return "\n  \tM " + size / 2 + ", " + size / 2 + "\n    m -" + size / 2 + ", 0\n    a " + size / 2 + "," + size / 2 + " 0 1 1 " + size + ",0\n  ";
  },
  line: function line(size) {
    return "\n  \tM 0," + size / 2 + "\n    L " + size + "," + size / 2 + "\n  ";
  },
  square: function square(size) {
    return "\n  \tM 0,0\n    L " + size + ",0\n    L " + size + "," + size + "\n    L 0," + size + "\n    Z\n\t";
  }
};

var Progress$$1 = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vue-progress-path", class: _vm.cssClass, style: _vm.style }, [_c('svg', { attrs: { "width": _vm.finalWidth, "height": _vm.finalHeight, "viewBox": '0 0 ' + _vm.finalWidth + ' ' + _vm.finalHeight } }, [_c('g', { attrs: { "transform": 'translate(' + (_vm.finalWidth - _vm.size) / 2 + ', ' + (_vm.finalHeight - _vm.size) / 2 + ') rotate(' + _vm.finalRotation + ', ' + _vm.size / 2 + ', ' + _vm.size / 2 + ')' } }, [_c('g', { staticClass: "container" }, [!_vm.hideBackground ? _c('path', { staticClass: "background", attrs: { "d": _vm.path } }) : _vm._e(), _c('path', { ref: "path", staticClass: "progress", attrs: { "d": _vm.path, "stroke-dasharray": _vm.finalDasharray + ' ' + _vm.finalDasharray, "stroke-dashoffset": _vm.finalDashoffset } })])])])]);
	}, staticRenderFns: [],
	name: 'Progress',

	props: {
		counterClockwise: {
			type: Boolean,
			default: false
		},
		fillDuration: {
			type: [String, Number],
			default: 1
		},
		height: {
			type: [String, Number],
			default: 0
		},
		hideBackground: {
			type: Boolean,
			default: false
		},
		indeterminate: {
			type: Boolean,
			default: false
		},
		progress: {
			type: Number,
			default: 0,
			validate: function validate(value) {
				return value >= -1 && value <= 1;
			}
		},
		rotate: {
			type: Boolean,
			default: false
		},
		rotationDuration: {
			type: [String, Number],
			default: 1
		},
		shape: {
			type: String,
			default: null
		},
		size: {
			type: [String, Number],
			default: 100
		},
		staticPath: {
			type: Boolean,
			default: false
		},
		width: {
			type: [String, Number],
			default: 0
		}
	},

	data: function data() {
		return {
			dasharray: 0,
			dashoffset: 0,
			rotation: 0,
			animating: false
		};
	},


	computed: {
		cssClass: function cssClass() {
			return {
				'indeterminate': this.indeterminate
			};
		},
		finalDasharray: function finalDasharray() {
			return this.finalDashoffset === 0 || this.finalDashoffset === this.dasharray * 2 ? 0 : this.dasharray;
		},
		finalDashoffset: function finalDashoffset() {
			if (this.animating) {
				return this.dashoffset;
			} else {
				if (this.finalProgress < 0) {
					return -this.dasharray * this.finalProgress + this.dasharray;
				} else {
					return (1 - this.finalProgress) * this.dasharray;
				}
			}
		},
		finalHeight: function finalHeight() {
			return this.height || parseFloat(this.size) + 50;
		},
		finalProgress: function finalProgress() {
			if (this.counterClockwise) {
				return -this.progress;
			} else {
				return this.progress;
			}
		},
		finalRotation: function finalRotation() {
			return this.animating ? this.rotation : 0;
		},
		finalShape: function finalShape() {
			if (this.shape) {
				return this.shape;
			} else {
				return globalOptions.defaultShape;
			}
		},
		finalWidth: function finalWidth() {
			return this.width || parseFloat(this.size) + 50;
		},
		style: function style() {
			return {
				width: this.finalWidth + 'px',
				height: this.finalHeight + 'px'
			};
		},
		svgStyle: function svgStyle() {
			return {};
		},
		path: function path() {
			var path = shapes[this.finalShape] || this.finalShape;
			if (path) {
				if (typeof path === 'function') {
					path = path(this.size);
				}
				return path;
			}
		}
	},

	watch: {
		indeterminate: {
			handler: function handler(value) {
				if (value) {
					this.startAnimation();
				} else {
					this.stopAnimation();
				}
			},

			immediate: true
		},

		path: {
			handler: function handler() {
				var _this = this;

				this.$nextTick(function () {
					_this.dasharray = _this.$refs.path.getTotalLength();
				});
			},

			immediate: true
		}
	},

	methods: {
		frame: function frame(timestamp) {
			var time = timestamp - this._animationLastFrame;
			this._animationLastFrame = timestamp;

			if (this.rotate) {
				var direction = this.counterClockwise ? -1 : 1;
				var d = time * 360 / (parseFloat(this.rotationDuration) * 1000);
				this.rotation += d * direction;
				if (this.counterClockwise) {
					if (this.rotation < 0) {
						this.rotation += 360;
					}
				} else {
					if (this.rotation > 360) {
						this.rotation -= 360;
					}
				}
			}

			if (!this.staticPath) {
				var range = this.dasharray * 2;
				var _direction = this.counterClockwise ? 1 : -1;
				var _d = time * range / (parseFloat(this.fillDuration) * 1000);
				this.dashoffset += _d * _direction;
				if (this.counterClockwise) {
					if (this.dashoffset < 0) {
						this.dashoffset += range;
					}
				} else {
					if (this.dashoffset > range) {
						this.dashoffset -= range;
					}
				}
			}

			if (this.animating) {
				requestAnimationFrame(this.frame);
			}
		},
		startAnimation: function startAnimation() {
			this.dashoffset = this.dasharray;
			this.rotation = 0;
			this.animating = true;
			this._animationLastFrame = performance.now();
			requestAnimationFrame(this.frame);
		},
		stopAnimation: function stopAnimation() {
			this.animating = false;
		}
	},

	beforeDestroy: function beforeDestroy() {
		this.stopAnimation();
	}
};

// import { setOptions } from './options'

var globalOptions = {};

function registerComponents(Vue, prefix) {
	Vue.component(prefix + 'progress', Progress$$1);
}

var plugin = {
	// eslint-disable-next-line no-undef
	version: "0.0.2",
	install: function install(Vue, options) {
		globalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'loading-',
			defaultShape: 'circle'
		}, options);

		if (globalOptions.installComponents) {
			registerComponents(Vue, globalOptions.componentsPrefix);
		}
	}
};

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export { globalOptions, Progress$$1 as Progress };
export default plugin;
