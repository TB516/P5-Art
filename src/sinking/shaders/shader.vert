precision highp float;

attribute vec3 aPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float u_time;
uniform float u_frameNoiseValue;

void main() {
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

  viewModelPosition.x += 10.0 * sin(u_time * 0.01 + viewModelPosition.y * 0.1);
  viewModelPosition.y += 10.0 * cos(u_time * 0.01 + viewModelPosition.x * 0.1);
  viewModelPosition.z += 2.0 * cos(u_time) * sin(u_frameNoiseValue * viewModelPosition.w * 10.0);

  gl_Position = uProjectionMatrix * viewModelPosition;
}