export default {
	circle: size => `
  	M ${size / 2}, ${size / 2}
    m 0, -${size / 2}
    a ${size / 2},${size / 2} 0 1 1 0,${size}
    a ${size / 2},${size / 2} 0 1 1 0,-${size}
  `,
	semicircle: size => `
  	M ${size / 2}, ${size / 2}
    m -${size / 2}, 0
    a ${size / 2},${size / 2} 0 1 1 ${size},0
  `,
	line: size => `
  	M 0,${size / 2}
    L ${size},${size / 2}
  `,
	square: size => `
  	M 0,0
    L ${size},0
    L ${size},${size}
    L 0,${size}
    Z
	`,
}
