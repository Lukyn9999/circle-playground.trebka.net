attribute vec2 aPosition; // quad vertex

uniform vec2 uResolution;
uniform vec4 uColor;

void main() {
    vec2 zeroToOne = aPosition / uResolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clip = zeroToTwo - 1.0;

    gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);
}