function Planeta(radio, GL, distanciaAlSol, vRot, vTras, nombreTextura) {
    var astro = new Astro(radio, GL, vRot, nombreTextura);
    var giroTraslacion = 0;
    var incremento = LIBS.degToRad(vTras);
    if (distanciaAlSol == 0) {
        distanciaSol = 0;
        incremento = 0;
    }else{
        distanciaSol = distanciaAlSol + radio;
    }
    
    var pickable = false;
    
    var satelites = [];

    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        if (!pickable || !MOUSE.isPressed()) {
            giroTraslacion += incremento;
        }

        var matrixRot = LIBS.get_I4();
        LIBS.rotateY(matrixRot, giroTraslacion);
        var matrixTras = LIBS.get_I4();
        LIBS.translateX(matrixTras, distanciaSol);

        var modelMatrix = LIBS.mult(matrixRot, MOVEMATRIX);
        modelMatrix = LIBS.mult(matrixTras, modelMatrix);

        astro.dibujar(_position, _uv, modelMatrix);

        for (i = 0; i < satelites.length; i++) {
            satelites[i].dibujar(_position, _uv, modelMatrix);
        }
    };

    this.addSatelite = function (satelite) {
        satelite.addDistancia(radio);
        satelites.push(satelite);
    };

    this.setPickableRot = function (pick) {
        astro.setPickableRot(pick);
    };

    this.setPickableTras = function (pick) {
        pickable = pick;
    };
}