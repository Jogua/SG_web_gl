var _Pmatrix;
var _Vmatrix;
var _Mmatrix;
var _position;
var _uv;
var _normal;

//Fuente de luz
var _sourceAmbientColor;
var _sourceDiffuseColor;
var _sourceSpecularColor;
var _sourceDirection;

//Materiales
var _matAmbientColor;
var _matDiffuseColor;
var _matSpecularColor;
var _matShininess;

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
    _normal = GL.getAttribLocation(SHADER_PROGRAM, "normal");

    GL.enableVertexAttribArray(_position);
    GL.enableVertexAttribArray(_uv);
    GL.enableVertexAttribArray(_normal);
    
    //Fuente de luz
    _sourceAmbientColor = GL.getUniformLocation(SHADER_PROGRAM, "sourceAmbientColor");
    _sourceDiffuseColor = GL.getUniformLocation(SHADER_PROGRAM, "sourceDiffuseColor");
    _sourceSpecularColor = GL.getUniformLocation(SHADER_PROGRAM, "sourceSpecularColor");
    _sourceDirection = GL.getUniformLocation(SHADER_PROGRAM, "sourceDirection");
    
    //Materiales
    _matAmbientColor = GL.getUniformLocation(SHADER_PROGRAM, "matAmbientColor");
    _matDiffuseColor = GL.getUniformLocation(SHADER_PROGRAM, "matDiffuseColor");
    _matSpecularColor = GL.getUniformLocation(SHADER_PROGRAM, "matSpecularColor");
    _matShininess = GL.getUniformLocation(SHADER_PROGRAM, "matShininess");

    GL.useProgram(SHADER_PROGRAM);
    GL.uniform1i(_sampler, 0);
}