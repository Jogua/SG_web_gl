function getGLContext(id) {
    var canvas = document.getElementById(id);
    if (canvas == null) {
        alert("No hay canvas");
        return null;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var gl = null;
    var i = 0;
    while (gl == null && i < names.length)
    {
        try {
            gl = canvas.getContext(names[i]);
        }
        catch (e) {
        }
        i++;
    }
    if (gl == null) {
        alert("Tu navegador no soporta WebGL ");
    }
    return gl;
}
;