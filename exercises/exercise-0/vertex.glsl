attribute vec3 position;

void main() {
    gl_Position = vec4(position, 2.0);
}