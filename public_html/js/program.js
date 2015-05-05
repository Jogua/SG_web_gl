var _Pmatrix;
var _Vmatrix;
var _Mmatrix;
var _position;
var _uv;

function crearPrograma(GL) {
    var shader_vertex = shaders.get_vertex_shader(GL);
    var shader_fragment = shaders.get_fragment_shader(GL);

    var SHADER_PROGRAM = GL.createProgram();
    GL.attachShader(SHADER_PROGRAM, shader_vertex);
    GL.attachShader(SHADER_PROGRAM, shader_fragment);

    GL.linkProgram(SHADER_PROGRAM);

    _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
    _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
    _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

    var _sampler = GL.getUniformLocation(SHADER_PROGRAM, "sampler");
    _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
    _uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");

    GL.enableVertexAttribArray(_position);
    GL.enableVertexAttribArray(_uv);

    GL.useProgram(SHADER_PROGRAM);
    GL.uniform1i(_sampler, 0);
}