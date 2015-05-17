
function Luz(GL) {
    var ambiental = [0.3, 0.3, 0.3];
    var difusa = [0.75, 0.75, 0.75];
    var especular = [1., 1., 1.];
    var direccion = [0, 0, 1];

    this.setAmbiental = function (r, g, b) {
        ambiental = [r, g, b];
    };

    this.setDifusa = function (r, g, b) {
        difusa = [r, g, b];
    };

    this.setEspecular = function (r, g, b) {
        especular = [r, g, b];
    };

    this.setDireccion = function (x, y, z) {
        direccion = [x, y, z];
    };

    this.dibujar = function () {
        GL.uniform3fv(_sourceAmbientColor, ambiental);
        GL.uniform3fv(_sourceDiffuseColor, difusa);
        GL.uniform3fv(_sourceSpecularColor, especular);
        GL.uniform3fv(_sourceDirection, direccion);
    };
}