export default {
	circle: size => `
  	M ${size}, ${size}
    m 0, -${size}
    a ${size},${size} 0 1 1 0,${2 * size}
    a ${size},${size} 0 1 1 0,-${2 * size}
  `,
	semicircle: size => `
  	M ${size}, ${size}
    m -${size}, 0
    a ${size},${size} 0 1 1 ${2 * size},0
  `,
	line: size => `
  	M 0,${size}
    L ${2 * size},${size}
  `,
	square: size => `
  	M 0,0
    L ${2 * size},0
    L ${2 * size},${2 * size}
    L 0,${2 * size}
    Z
	`,
}
