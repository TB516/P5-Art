interface Window {
  setup: VoidFunction;
  draw: VoidFunction;
  preload?: VoidFunction;
  windowResized?: VoidFunction;
  mousePressed?: VoidFunction;
  keyPressed?: VoidFunction;
  touchStarted?: VoidFunction;
  touchMoved?: VoidFunction;
  touchEnded?: VoidFunction;
  p5: typeof import("p5");
}
