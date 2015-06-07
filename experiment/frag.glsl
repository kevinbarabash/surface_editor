uniform vec3 color;

void main(void) {
//    float opacity = 1.0;
//    vec2 uv = 0.5 * vec2(vNormal) + 0.5;
//    gl_FragColor = vec4( 0.5 * vNormal + 0.5, opacity );
    gl_FragColor = vec4(color, 1.0);
}
