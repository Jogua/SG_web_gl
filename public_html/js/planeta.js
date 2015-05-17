function Planeta(radio, GL, distanciaAlSol, vRot, vTras, nombreTextura) {
    
    var astro = new Astro(radio, GL, vRot, nombreTextura);
    
    var distanciaSol = distanciaAlSol + radio;
    var giroTraslacion = 0;
    var incremento = LIBS.degToRad(vTras);
    
    if (distanciaAlSol == 0) {
        distanciaSol = 0;
        incremento = 0;
    }
    
    var pickableTrasalacion = false;
    
    var satelites = [];

    this.dibujar = function (MOVEMATRIX) {
        if (!pickableTrasalacion || !MOUSE.isPressed()) {
            giroTraslacion += incremento;
        }

        var matrixRot = LIBS.get_I4();
        LIBS.rotateY(matrixRot, giroTraslacion);
        var matrixTras = LIBS.get_I4();
        LIBS.translateX(matrixTras, distanciaSol);

        var modelMatrix = LIBS.mult(matrixRot, MOVEMATRIX);
        modelMatrix = LIBS.mult(matrixTras, modelMatrix);

        astro.dibujar(modelMatrix);

        for (i = 0; i < satelites.length; i++) {
            satelites[i].dibujar(modelMatrix);
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
        pickableTrasalacion = pick;
    };
    
    this.setMaterial = function (material){
        astro.setMaterial(material);
    };
};