#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){
    for(float i,z,d,j; i++<5e1; gl_FragColor+=(sin(z/3.+vec4(7,2,3,0))+1.1)/d){
        vec3 p=z*normalize(gl_FragCoord.rgb*2.-u_resolution.xyy);
        p.z+=5.+cos(u_time);
        p.xz*=mat2(cos(u_time+p.y*.5+vec4(0,33,11,0)))/max(p.y*.1+1.,.1);
        for(j=2.0;j<15.0; j/=0.6){
            p+=cos((p.yzx-vec3(u_time,0,0)/.1)*j+u_time)/j;
        }
        z+=d=.01+abs(length(p.xz)+p.y*.3-.5)/7.;
    gl_FragColor=tan(gl_FragColor/1e3);
    }
}