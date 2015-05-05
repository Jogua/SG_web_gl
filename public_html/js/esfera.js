function Esfera(radio, resolucion, GL) {

    var radio = radio;
    var resolucion = resolucion;

    var vertices = [];
    var caras = [];
    var bufferVertices = GL.createBuffer();
    var bufferCaras = GL.createBuffer();

    var imagen;
    
    this.crearEsfera = function () {
        var i, j;
        var incremento = Math.PI / resolucion;
        for (i = 0; i <= resolucion; i++) {
            var radI = i * incremento;
            var sinRadI = Math.sin(radI);
            var cosRadI = Math.cos(radI);
            for (j = 0; j <= resolucion; j++) {
                var radJ = j * incremento * 2;
                var sinRadJ = Math.sin(radJ);
                var cosRadJ = Math.cos(radJ);

                var x = radio * sinRadI * sinRadJ;
                var y = radio * cosRadI;
                var z = radio * sinRadI * cosRadJ;
                var u = (j / resolucion);
                var v = 1 - (i / resolucion);

                vertices.push(x);
                vertices.push(y);
                vertices.push(z);

                vertices.push(u);
                vertices.push(v);
            }
        }

        GL.bindBuffer(GL.ARRAY_BUFFER, bufferVertices);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);

        for (i = 0; i < resolucion; i++) {
            for (j = 0; j < resolucion; j++) {
                var first = (i * (resolucion + 1)) + j;
                var second = first + resolucion + 1;
                caras.push(first);
                caras.push(second);
                caras.push(first + 1);

                caras.push(second);
                caras.push(second + 1);
                caras.push(first + 1);
            }
        }

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, bufferCaras);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(caras), GL.STATIC_DRAW);

    };

    this.cargarTextura = function (nombreTextura) {
        imagen = new Image();
        imagen.src = nombreTextura;
        imagen.webglTexture = false;

        imagen.onload = function (e) {
            var texture = GL.createTexture();
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            GL.bindTexture(GL.TEXTURE_2D, texture);
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, imagen);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
            GL.generateMipmap(GL.TEXTURE_2D);
            GL.bindTexture(GL.TEXTURE_2D, null);
            imagen.webglTexture = texture;
        };
    };

    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
        if (imagen !== null && imagen.webglTexture) {
            GL.activeTexture(GL.TEXTURE0);
            GL.bindTexture(GL.TEXTURE_2D, imagen.webglTexture);
        }
        GL.bindBuffer(GL.ARRAY_BUFFER, bufferVertices);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 4 * (3 + 2), 0);
        GL.vertexAttribPointer(_uv, 2, GL.FLOAT, false, 4 * (3 + 2), 3 * 4);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, bufferCaras);
        GL.drawElements(GL.TRIANGLES, caras.length, GL.UNSIGNED_SHORT, 0);
    };
}
;