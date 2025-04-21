#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
//gl_FragCoord
//gl_FragColor


vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(2.0, 1.0, 0.0);
    vec3 d = vec3(0.5,0.2,0.25);

    return a + b*cos( 6.28*(c*t+d) );
}

void main(){
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;
    uv = fract(uv * 2.0) - .5;
    vec3 final = vec3(0.0);
    
    
    float d = length(uv);
    vec3 col = palette(length(uv0) + .2*u_time);
    
    d = cos(d*8. + u_time)/8.;
    //d = abs(d);
    d = .05/d;
    
    final += col * d;
    
    
    
    gl_FragColor = vec4(final, 1.0);
}