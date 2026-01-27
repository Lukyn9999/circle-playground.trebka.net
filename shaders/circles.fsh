precision mediump float;

uniform vec4 uColor;

varying vec2 vPos;
varying vec2 vCenter;
varying float vRadius;

void main() {
    float d = distance(vPos, vCenter);

    if (d > vRadius) {
        discard;
    }

    gl_FragColor = uColor;
}