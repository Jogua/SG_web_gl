var shaders = {
    
    shader_vertex_source: "\n\
        attribute vec3 position;\n\
        attribute vec2 uv;\n\
        attribute vec3 normal;\n\
        \n\
        uniform mat4 Pmatrix;\n\
        uniform mat4 Vmatrix;\n\
        uniform mat4 Mmatrix;\n\
        \n\
        varying vec2 vUV;\n\
        varying vec3 vNormal;\n\
        varying vec3 vView;\n\
        \n\
        void main(void) { //pre-built function\n\
            gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
            vNormal=vec3(Mmatrix*vec4(normal, 0.));\n\
            vView=vec3(Vmatrix*Mmatrix*vec4(position, 1.));\n\
            vUV=uv;\n\
        }",
    
    shader_fragment_source: "\n\
        precision mediump float;\n\
        uniform sampler2D sampler;\n\
        \n\
        varying vec2 vUV;\n\
        varying vec3 vNormal;\n\
        varying vec3 vView;\n\
        \n\
        uniform vec3 sourceAmbientColor;\n\
        uniform vec3 sourceDiffuseColor;\n\
        uniform vec3 sourceSpecularColor;\n\
        uniform vec3 sourceDirection;\n\
        \n\
        uniform vec3 matAmbientColor;\n\
        uniform vec3 matDiffuseColor;\n\
        uniform vec3 matSpecularColor;\n\
        uniform float matShininess;\n\
         \n\
        void main(void) {\n\
            vec3 color=vec3(texture2D(sampler, vUV));\n\
            \n\
            vec3 I_ambient=sourceAmbientColor*matAmbientColor;\n\
            vec3 I_diffuse=sourceDiffuseColor*matDiffuseColor*max(0., dot(vNormal, sourceDirection));\n\
            \n\
            vec3 V=normalize(vView);\n\
            vec3 R=reflect(sourceDirection, vNormal);\n\
            \n\
            vec3 I_specular=sourceSpecularColor*matSpecularColor*pow(max(dot(R,V),0.), matShininess);\n\
            \n\
            vec3 I=I_ambient+I_diffuse+I_specular;\n\
            \n\
            gl_FragColor = vec4(I*color, 1.);\n\
        }",
    get_shader: function (source, GL, type, typeString) {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
            alert("ERROR IN " + typeString + " SHADER : " + GL.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    },
    get_vertex_shader: function (GL) {
        return this.get_shader(this.shader_vertex_source, GL, GL.VERTEX_SHADER, "VERTEX");
    },
    get_fragment_shader: function (GL) {
        return this.get_shader(this.shader_fragment_source, GL, GL.FRAGMENT_SHADER, "FRAGMENT");
    }
};