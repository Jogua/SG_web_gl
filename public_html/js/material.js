
function Material(GL) {
    var ambiental = [1., 1., 1.];
    var difusa = [1., 1., 1];
    var especular = [0., 0., 0.];
    var brillo = 1;

    this.setAmbiental = function (r, g, b) {
        ambiental = [r, g, b];
    };

    this.setDifusa = function (r, g, b) {
        difusa = [r, g, b];
    };

    this.setEspecular = function (r, g, b) {
        especular = [r, g, b];
    };

    this.setBrillo = function (brillo_) {
        brillo = brillo_;
    };

    this.dibujar = function () {
        GL.uniform3fv(_matAmbientColor, ambiental);
        GL.uniform3fv(_matDiffuseColor, difusa);
        GL.uniform3fv(_matSpecularColor, especular);
        GL.uniform1f(_matShininess, brillo);
    };
}