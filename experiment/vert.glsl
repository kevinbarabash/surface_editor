attribute float t;

uniform float a;
uniform float b;

void main() {
    vec3 position = vec3(a * cos(t), a * sin(t), b * t);

    gl_Position = projectionMatrix *
                  modelViewMatrix * vec4(position, 1.0 );
}
