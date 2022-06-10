import Grid from './grid/Grid.class.js'
import gridConfig from './config/grid.config.js'

alert('Drag the blue grid to change the beginning of path or the red grid to change the end of path')
alert('Click the grid to make obstacle')
const grid = new Grid( gridConfig )

grid.build()
grid.draw()

