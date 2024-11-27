function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
  
  let grid;
  let cols, rows;
  let w = 5;
  let hueValue = 200;
  
  function setup() {
    createCanvas(1520, 720);
    colorMode(HSB, 360, 255, 255);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    }
  
  function mouseDragged() {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);
  
    let matrix = 3; // Size of the brush
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) {
          let col = mouseCol + i;
          let row = mouseRow + j;
          if (col >= 0 && col < cols && row >= 0 && row < rows) {
            grid[col][row] = hueValue; // Set hue value
          }
        }
      }
    }
    hueValue = (hueValue + 1) % 360; // Cycle hue value
  }
  
  function draw() {
    background(0);
  
    // Draw current grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        noStroke();
        if (grid[i][j] > 0) { // Check for non-zero values (hues)
          fill(grid[i][j], 255, 255);
          let x = i * w;
          let y = j * w;
          square(x, y, w);
        }
      }
    }
  
    // Create next generation grid
    let nextGrid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        if (state > 0) {
          let below = j + 1 < rows ? grid[i][j + 1] : 1;
  
          let dir = random(1) > 0.5 ? 1 : -1;
  
          let belowA = (i + dir >= 0 && i + dir < cols && j + 1 < rows) ? grid[i + dir][j + 1] : 1;
          let belowB = (i - dir >= 0 && i - dir < cols && j + 1 < rows) ? grid[i - dir][j + 1] : 1;
  
          if (below === 0) {
            nextGrid[i][j + 1] = state; // Preserve hue value
          } else if (belowA === 0) {
            nextGrid[i + dir][j + 1] = state;
          } else if (belowB === 0) {
            nextGrid[i - dir][j + 1] = state;
          } else {
            nextGrid[i][j] = state;
          }
        }
      }
    }
  
    grid = nextGrid; // Update the grid
  }   