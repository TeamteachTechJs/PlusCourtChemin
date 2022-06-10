/**
 * @param {Node} node
 * @return {Array<Array<number>>}
 */
function backtrace(node) {
    var path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent;
        path.push([node.x, node.y]);
    }
    return path.reverse();
}

/**
 * @param {Node}
 * @param {Node}
 */
function biBacktrace(nodeA, nodeB) {
    var pathA = backtrace(nodeA),
        pathB = backtrace(nodeB);
    return pathA.concat(pathB.reverse());
}

/**
 * @param {Array<Array<number>>} path
 * @return {number}
 */
 function pathLength(path) {
    var i, sum = 0, a, b, dx, dy;
    for (i = 1; i < path.length; ++i) {
        a = path[i - 1];
        b = path[i];
        dx = a[0] - b[0];
        dy = a[1] - b[1];
        sum += Math.sqrt(dx * dx + dy * dy);
    }
    return sum;
}


/**
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @return {Array<Array<number>>}
 */
function interpolate(x0, y0, x1, y1) {
    var abs = Math.abs,
        line = [],
        sx, sy, dx, dy, err, e2;

    dx = abs(x1 - x0);
    dy = abs(y1 - y0);

    sx = (x0 < x1) ? 1 : -1;
    sy = (y0 < y1) ? 1 : -1;

    err = dx - dy;

    while (true) {
        line.push([x0, y0]);

        if (x0 === x1 && y0 === y1) {
            break;
        }
        
        e2 = 2 * err;
        if (e2 > -dy) {
            err = err - dy;
            x0 = x0 + sx;
        }
        if (e2 < dx) {
            err = err + dx;
            y0 = y0 + sy;
        }
    }

    return line;
}


/**
 * @param {Array<Array<number>>} path
 * @return {Array<Array<number>>}
 */
function expandPath(path) {
    var expanded = [],
        len = path.length,
        coord0, coord1,
        interpolated,
        interpolatedLen,
        i, j;

    if (len < 2) {
        return expanded;
    }

    for (i = 0; i < len - 1; ++i) {
        coord0 = path[i];
        coord1 = path[i + 1];

        interpolated = interpolate(coord0[0], coord0[1], coord1[0], coord1[1]);
        interpolatedLen = interpolated.length;
        for (j = 0; j < interpolatedLen - 1; ++j) {
            expanded.push(interpolated[j]);
        }
    }
    expanded.push(path[len - 1]);

    return expanded;
}


/**
 * @param {PF.Grid} grid
 * @param {Array<Array<number>>} path
 */
function smoothenPath(grid, path) {
    var len = path.length,
        x0 = path[0][0],        
        y0 = path[0][1],        
        x1 = path[len - 1][0],  
        y1 = path[len - 1][1],  
        sx, sy,                
        ex, ey,               
        newPath,
        i, j, coord, line, testCoord, blocked;

    sx = x0;
    sy = y0;
    newPath = [[sx, sy]];

    for (i = 2; i < len; ++i) {
        coord = path[i];
        ex = coord[0];
        ey = coord[1];
        line = interpolate(sx, sy, ex, ey);

        blocked = false;
        for (j = 1; j < line.length; ++j) {
            testCoord = line[j];

            if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
                blocked = true;
                break;
            }
        }
        if (blocked) {
            lastValidCoord = path[i - 1];
            newPath.push(lastValidCoord);
            sx = lastValidCoord[0];
            sy = lastValidCoord[1];
        }
    }
    newPath.push([x1, y1]);

    return newPath;
}


/**
 * @param {Array<Array<number>>} path
 * @return {Array<Array<number>>}
 */
function compressPath(path) {

    if(path.length < 3) {
        return path;
    }

    var compressed = [],
        sx = path[0][0], 
        sy = path[0][1], 
        px = path[1][0], 
        py = path[1][1], 
        dx = px - sx, 
        dy = py - sy, 
        lx, ly,
        ldx, ldy,
        sq, i;


    sq = Math.sqrt(dx*dx + dy*dy);
    dx /= sq;
    dy /= sq;


    compressed.push([sx,sy]);

    for(i = 2; i < path.length; i++) {


        lx = px;
        ly = py;


        ldx = dx;
        ldy = dy;


        px = path[i][0];
        py = path[i][1];


        dx = px - lx;
        dy = py - ly;


        sq = Math.sqrt(dx*dx + dy*dy);
        dx /= sq;
        dy /= sq;


        if ( dx !== ldx || dy !== ldy ) {
            compressed.push([lx,ly]);
        }
    }


    compressed.push([px,py]);

    return compressed;
}

export default {
    backtrace,
    biBacktrace,
    pathLength,
    interpolate,
    expandPath,
    smoothenPath,
    compressPath,
}
