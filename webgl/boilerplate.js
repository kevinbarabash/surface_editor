let createCanvas = function() {
    let canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    document.body.style.margin = 0;
    return canvas;
};

let createWebGL = function(canvas) {
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    return gl;
};

let createBuffer = function(gl, data, itemSize = 3) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    // possible usage values
    // gl.STATIC_DRAW  The data store contents are modified once, and used many
    //                 times as the source for WebGL drawing commands.
    // gl.DYNAMIC_DRAW The data store contents are repeatedly respecified, and
    //                 used many times as the source for WebGL drawing commands.
    // gl.STREAM_DRAW  The data store contents are specified once, and used
    //                 occasionally as the source of a WebGL drawing command.

    buffer.itemSize = itemSize;
    buffer.numItems = data.length / itemSize;

    return buffer;
};

let compileShader = function(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
};

let compileProgram = function(gl, vertSource, fragSource) {
    var vert = compileShader(gl, vertSource, gl.VERTEX_SHADER);
    var frag = compileShader(gl, fragSource, gl.FRAGMENT_SHADER);

    var program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Could not initialise shaders");
        return null;
    }

    return program;
};

module.exports = {
    createCanvas: createCanvas,
    createWebGL: createWebGL,
    createBuffer: createBuffer,
    compileShader: compileShader,
    compileProgram: compileProgram
};
