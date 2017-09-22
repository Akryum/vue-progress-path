var shapes = {
  circle: function circle(size) {
    return "\n  \tM " + size + ", " + size + "\n    m 0, -" + size + "\n    a " + size + "," + size + " 0 1 1 0," + 2 * size + "\n    a " + size + "," + size + " 0 1 1 0,-" + 2 * size + "\n  ";
  },
  semicircle: function semicircle(size) {
    return "\n  \tM " + size + ", " + size + "\n    m -" + size + ", 0\n    a " + size + "," + size + " 0 1 1 " + 2 * size + ",0\n  ";
  },
  line: function line(size) {
    return "\n  \tM 0," + size + "\n    L " + 2 * size + "," + size + "\n  ";
  },
  square: function square(size) {
    return "\n  \tM 0,0\n    L " + 2 * size + ",0\n    L " + 2 * size + "," + 2 * size + "\n    L 0," + 2 * size + "\n    Z\n\t";
  }
};

var Progress$$1 = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vue-progress" }, [_c('svg', { attrs: { "width": _vm.finalWidth, "height": _vm.finalHeight, "viewBox": "0 0 1 1" } }, [_c('g', { attrs: { "transform": 'translate(size, size)' } }, [_c('g', { staticClass: "container" }, [!_vm.hideBackground ? _c('path', { staticClass: "path background", attrs: { "d": _vm.path } }) : _vm._e(), _c('path', { ref: "path", staticClass: "path progress", attrs: { "d": _vm.path, "stroke-dasharray": _vm.dasharray + ' ' + _vm.dasharray, "stroke-dashoffset": _vm.dashoffset } })])])])]);
	}, staticRenderFns: [],
	name: 'Progress',

	props: {
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
		shape: {
			type: String,
			default: null
		},
		size: {
			type: [String, Number],
			required: true
		},
		width: {
			type: [String, Number],
			default: 0
		}
	},

	data: function data() {
		return {
			dasharray: 0,
			rotation: 0
		};
	},


	computed: {
		finalHeight: function finalHeight() {
			return this.height || this.size;
		},
		finalShape: function finalShape() {
			if (this.shape) {
				return this.shape;
			} else {
				return globalOptions.defaultShape;
			}
		},
		finalWidth: function finalWidth() {
			return this.width || this.size;
		},
		path: function path() {
			var path = shapes[this.finalShape] || this.finalShape;
			if (path) {
				if (typeof path === 'function') {
					path = path(100);
				}
				return path;
			}
		}
	},

	watch: {
		path: {
			handler: function handler() {
				var _this = this;

				this.$nextTick(function () {
					_this.dasharray = _this.$refs.path.getTotalLength();
				});
			},

			immediate: true
		}
	}
};

// import { setOptions } from './options'

var globalOptions = {};

function registerComponents(Vue, prefix) {
	Vue.component(prefix + 'progress', Progress$$1);
}

var plugin = {
	// eslint-disable-next-line no-undef
	version: "0.0.1",
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
