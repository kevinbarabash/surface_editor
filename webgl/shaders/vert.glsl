#version 100

attribute float t;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
    float a = 1.0;
    float b = 0.2;
    vec3 pos = vec3(a * cos(t), a * sin(t), b * t);
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}
