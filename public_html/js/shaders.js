var shaders = {
    shader_vertex_source: "\n\
        attribute vec3 position;\n\
        attribute vec2 uv;\n\
        uniform mat4 Pmatrix;\n\
        uniform mat4 Vmatrix;\n\
        uniform mat4 Mmatrix;\n\
        varying vec2 vUV;\n\
        void main(void) { //pre-built function\n\
            gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
            vUV = uv;\n\
        }",
    shader_fragment_source: "\n\
        precision mediump float;\n\
        uniform sampler2D sampler;\n\
        varying vec2 vUV;\n\
        void main(void) {\n\
            gl_FragColor = texture2D(sampler, vUV);\n\
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