let { mat4, vec3 } = require('gl-matrix');
let bp = require('./boilerplate');

let canvas = bp.createCanvas();
let gl = bp.createWebGL(canvas);


// setup buffers
var vertices;

// TODO: precompile values? affects d/l size
var t = [];
for (var i = 0; i < 8 * Math.PI; i += 0.1) {
    t.push(i);
}
var triangleVertexPositionBuffer = bp.createBuffer(gl, t, 1);

vertices = [
     1.0,  1.0,  0.0,
    -1.0,  1.0,  0.0,
     1.0, -1.0,  0.0,
    -1.0, -1.0,  0.0
];
var squareVertexPositionBuffer = bp.createBuffer(gl, vertices);


// compile shaders
var program = bp.compileProgram(
    gl, require("./shaders/vert.glsl"), require("./shaders/frag.glsl"));


// prepare to draw stuff
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

// setup pMatrix and mvMatrix
let mvMatrix = mat4.create();
let pMatrix = mat4.create();
let aspect = gl.viewportWidth / gl.viewportHeight;
let fov = 45;
let near = 0.1;
let far = 100.0;
mat4.perspective(pMatrix, fov, aspect, near, far);

// prepare some more
gl.useProgram(program);
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);

// get attributes
let attribute = gl.getAttribLocation(program, "t");
let size = triangleVertexPositionBuffer.itemSize;
let type = gl.FLOAT;
let stride = 0;
let offset = 0;
let normalized = false;

// set attributes
gl.vertexAttribPointer(attribute, size, type, normalized, stride, offset);
gl.enableVertexAttribArray(attribute);

// get uniforms
let pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
let mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");

// set uniforms
let pos = vec3.fromValues(0.0, 0.0, -10.0);
mat4.translate(mvMatrix, mvMatrix, pos);

gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix);
gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix);

gl.drawArrays(gl.LINE_STRIP, 0, triangleVertexPositionBuffer.numItems);

let error = gl.getError();

console.log("error: %d", error);
