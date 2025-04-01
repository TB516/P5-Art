precision highp float;

uniform float u_time;
uniform float u_frameNoiseValue;

void main() {
  float red = cos(u_time / 180.0);
  float green = sin(u_time * (u_frameNoiseValue + 0.005));
  float blue = cos(u_frameNoiseValue * u_time * 10.0);

  vec4 myColor = vec4(red, green, blue, 1.0);
  gl_FragColor = myColor;
}