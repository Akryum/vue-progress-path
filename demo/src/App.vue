<template>
	<div id="app">
		<h1>vue-progress</h1>

		<pre>{{ installCode }}</pre>
		<pre>{{ usageCode }}</pre>

		<div class="view">
			<loading-progress
				:progress="progress"
				:indeterminate="indeterminate"
				:counter-clockwise="counterClockwise"
				:hide-background="hideBackground"
				size="64"
				rotate
				fillDuration="2"
				rotationDuration="1"
			/>

			<loading-progress
				:progress="progress"
				:indeterminate="indeterminate"
				:counter-clockwise="counterClockwise"
				:hide-background="hideBackground"
				shape="semicircle"
				size="64"
			/>
			
			<loading-progress
				:progress="progress"
				:indeterminate="indeterminate"
				:counter-clockwise="counterClockwise"
				:hide-background="hideBackground"
				shape="line"
				size="200"
				width="200"
				height="6"
			/>

			<loading-progress
				:progress="progress"
				:indeterminate="indeterminate"
				:counter-clockwise="counterClockwise"
				:hide-background="hideBackground"
				shape="square"
				size="64"
				fill-duration="2"
			/>

			<loading-progress
				:progress="progress"
				:indeterminate="indeterminate"
				:counter-clockwise="counterClockwise"
				:hide-background="hideBackground"
				shape="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
				size="180"
				fill-duration="2"
			/>

			<loading-progress
				:progress="progress"
				:indeterminate="indeterminate"
				:counter-clockwise="counterClockwise"
				:hide-background="hideBackground"
				shape="M50,3l12,36h38l-30,22l11,36l-31-21l-31,21l11-36l-30-22h38z"
				size="100"
				fill-duration="2"
			/>
		</div>

		<div class="settings">
			<div>
				<input
					type="range"
					v-model="progressModel"
					min="-100"
					max="100"
				/>
				<button @click="progress = 0">reset</button>
				<span>progress {{progressDisplay}}</span>
			</div>

			<div>
				<label>
					<input
						type="checkbox"
						v-model="indeterminate"
					/>
					indeterminate
				</label>
			</div>

			<div>
				<label>
					<input
						type="checkbox"
						v-model="counterClockwise"
					/>
					counter clockwise
				</label>
			</div>

			<div>
				<label>
					<input
						type="checkbox"
						v-model="hideBackground"
					/>
					hide background
				</label>
			</div>
		</div>
	</div>
</template>

<script>
const installCode = `npm i -S vue-progress
yarn add vue-progress`

const usageCode = `import Vue from 'vue'
import VueProgress from 'vue-progress'
Vue.use(VueProgress)`

export default {
	data () {
		return {
			indeterminate: true,
			progress: 0,
			counterClockwise: false,
			hideBackground: false,
			installCode,
			usageCode,
		}
	},

	computed: {
		progressModel: {
			get () {
				return this.progress * 100
			},
			set (value) {
				this.progress = value / 100
			},
		},

		progressDisplay () {
			return `${Math.round(this.progress * 100)}%`
		},
	},
}
</script>

<style lang="stylus">
@import '../../dist/vue-progress.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

pre {
	background: #eee;
	padding: 12px;
}

h1,
h2,
pre,
.view,
.settings {
	margin: 32px;
}

.view {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.settings {
	padding-top: 32px;
	border-top: solid 1px #eee;
}

input[type="range"] {
	width: calc(100vw - 300px);
}
</style>
