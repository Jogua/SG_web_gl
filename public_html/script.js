
var main = function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /*========================= CAPTURE MOUSE EVENTS ========================= */

    var pulsado = false;

    var onClick = function (e) {
        pulsado = !pulsado;
    };

    canvas.addEventListener("click", onClick);

    /*========================= GET WEBGL CONTEXT ========================= */
    var GL;
    try {
        GL = canvas.getContext("experimental-webgl", {antialias: true});
    } catch (e) {
        alert("You are not webgl compatible :(");
        return false;
    }

    /*========================= SHADERS ========================= */
    /*jshint multistr: true */

    var shader_vertex_source = "\n\
attribute vec3 position;\n\
attribute vec2 uv;\n\
uniform mat4 Pmatrix;\n\
uniform mat4 Vmatrix;\n\
uniform mat4 Mmatrix;\n\
varying vec2 vUV;\n\
void main(void) { //pre-built function\n\
gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
vUV=uv;\n\
}";

    var shader_fragment_source = "\n\
precision mediump float;\n\
uniform sampler2D sampler;\n\
varying vec2 vUV;\n\
void main(void) {\n\
gl_FragColor = texture2D(sampler, vUV);\n\
}";

    var get_shader = function (source, type, typeString) {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
            alert("ERROR IN " + typeString + " SHADER : " + GL.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    };

    var shader_vertex = get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
    var shader_fragment = get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

    var SHADER_PROGRAM = GL.createProgram();
    GL.attachShader(SHADER_PROGRAM, shader_vertex);
    GL.attachShader(SHADER_PROGRAM, shader_fragment);

    GL.linkProgram(SHADER_PROGRAM);

    var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
    var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
    var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

    var _sampler = GL.getUniformLocation(SHADER_PROGRAM, "sampler");
    var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
    var _uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");

    GL.enableVertexAttribArray(_position);
    GL.enableVertexAttribArray(_uv);

    GL.useProgram(SHADER_PROGRAM);
    GL.uniform1i(_sampler, 0);


    /*========================= MATRIX ========================= */

    var PROJMATRIX = LIBS.get_projection(40, canvas.width / canvas.height, 1, 100);
    var MOVEMATRIX = LIBS.get_I4();
    var VIEWMATRIX = LIBS.get_I4();

    LIBS.translateZ(VIEWMATRIX, -5);


    var tierra = new Esfera(1, 50, GL, "luna.gif");
    tierra.position = _position;
    tierra.uv = _uv;
    tierra.crearEsfera();

    /*========================= DRAWING ========================= */
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    GL.clearDepth(1.0);


    var time_old = 0;
    var animate = function (time) {
        if (!pulsado) {
            var dAngle = 0.005 * (time - time_old);
            LIBS.rotateY(MOVEMATRIX, dAngle);
            time_old = time;
        }
//        LIBS.set_I4(MOVEMATRIX);
//        LIBS.rotateY(MOVEMATRIX, THETA);
//        LIBS.rotateX(MOVEMATRIX, PHI);

        GL.viewport(0.0, 0.0, canvas.width, canvas.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
        GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
        GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);

//        GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
//        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 4 * (3 + 3), 0);
//        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 4 * (3 + 3), 3 * 4);
//
//        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
//        GL.drawElements(GL.TRIANGLES, 6 * 2 * 3, GL.UNSIGNED_SHORT, 0);
        tierra.dibujar();

        GL.flush();
//        animate();
        window.requestAnimationFrame(animate);
    };
    animate(0);
};