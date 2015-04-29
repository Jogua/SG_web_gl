function Esfera(radio, resolucion, GL, SHADER_PROGRAM) {

    var radio = radio;
    var resolucion = resolucion;
    var vertices = [];
    var caras = [];
    var bufferVertices = GL.createBuffer();
    var bufferCaras = GL.createBuffer();
    var _position;
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

                vertices.push(x);
                vertices.push(y);
                vertices.push(z);
            }
        }
        
        GL.bindBuffer(GL.ARRAY_BUFFER, bufferVertices);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
        
        _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
        GL.enableVertexAttribArray(_position);

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

    this.dibujar = function () {
        GL.bindBuffer(GL.ARRAY_BUFFER, bufferVertices);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 4 * (3 + 0), 0);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, bufferCaras);
        GL.drawElements(GL.TRIANGLES, caras.length, GL.UNSIGNED_SHORT, 0);
    };
}