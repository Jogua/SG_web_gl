function Esfera(radio, resolucion, GL, nombreTextura) {

    var radio = radio;
    var resolucion = resolucion;

    var vertices = [];
    var caras = [];
    var coordTextura = [];
    var bufferVertices = GL.createBuffer();
    var bufferCaras = GL.createBuffer();
    var bufferCoordTextura = GL.createBuffer();
    var position;
    var uv;

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
                var u = 1 - (j / resolucion);
                var v = 1 - (i / resolucion);
                
                vertices.push(x);
                vertices.push(y);
                vertices.push(z);

                coordTextura.push(u);
                coordTextura.push(v);
            }
        }

        GL.bindBuffer(GL.ARRAY_BUFFER, bufferVertices);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);

        GL.bindBuffer(GL.ARRAY_BUFFER, bufferCoordTextura);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(coordTextura), GL.STATIC_DRAW);

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

        imagen = new Image();
        imagen.webglTexture = false;
        
        imagen.onload = function () {
            var textura = GL.createTexture();
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            GL.bindTexture(GL.TEXTURE_2D, textura);
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, imagen);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
            GL.bindTexture(GL.TEXTURE_2D, null);
            imagen.webglTexture = textura;
        };

        imagen.src = nombreTextura;
        imagen.onload();

    };

    this.dibujar = function () {
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, imagen.webglTexture);
        
        GL.bindBuffer(GL.ARRAY_BUFFER, bufferVertices);
        GL.vertexAttribPointer(position, 3, GL.FLOAT, false, 4 * 3, 0);
        
        GL.bindBuffer(GL.ARRAY_BUFFER, bufferCoordTextura);
        GL.vertexAttribPointer(uv, 2, GL.FLOAT, false, 4 * 2, 0);
        
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, bufferCaras);
        GL.drawElements(GL.TRIANGLES, caras.length, GL.UNSIGNED_SHORT, 0);
    };
}