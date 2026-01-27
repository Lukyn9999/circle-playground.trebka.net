attribute vec2 aPosition; // quad vertex
attribute vec2 aCenter; // circle center
attribute float aRadius; // circle radius

uniform vec2 uResolution;

varying vec2 vPos;
varying vec2 vCenter;
varying float vRadius;

void main() {
    vec2 zeroToOne = aPosition / uResolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clip = zeroToTwo - 1.0;

    gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);

    vPos = aPosition;
    vCenter = aCenter;
    vRadius = aRadius;
}