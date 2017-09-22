# vue-progress

[![npm](https://img.shields.io/npm/v/vue-progress.svg) ![npm](https://img.shields.io/npm/dm/vue-progress.svg)](https://www.npmjs.com/package/vue-progress)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Progress bars and loading indicators

> This library is Work In Progress.

## Installation

```
npm i -S vue-progress
```

```
yarn add vue-progress
```

## Usage

```js
import 'vue-progress/dist/vue-progress.css'
import VueProgress from 'vue-progress'

Vue.use(VueProgress, {
  // defaultShape: 'circle',
})
```

You can now use the `<loading-progress>` component.

## CSS customization example

```css
.vue-progress path {
	stroke-width: 12;
}

.vue-progress .progress {
	stroke: red;
}

.vue-progress .background {
	stroke: #edd;
}
```

## Examples

```html
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
```

```html
<loading-progress
  :progress="progress"
  :indeterminate="indeterminate"
  :counter-clockwise="counterClockwise"
  :hide-background="hideBackground"
  shape="semicircle"
  size="64"
/>
```

```html
<loading-progress
  :progress="progress"
  :indeterminate="indeterminate"
  :counter-clockwise="counterClockwise"
  :hide-background="hideBackground"
  shape="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
  size="180"
  fill-duration="2"
/>
```
