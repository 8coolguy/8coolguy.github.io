#ifdef GL_ES
precision mediump float;
#endif
uniform vec2        u_resolution;
uniform float       u_time;
uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution; 

uniform sampler2D   u_logo;
uniform vec2        u_logoResolution;
//gl_FragCoord.xy
//gl_FragColor
void main(){
    gl_FragColor = vec4(sin(u_time),cos(u_time),1.0,.3);
}