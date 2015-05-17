function Satelite(radio, GL, distanciaPlanet, vRot, vTras, nombreTextura) {
    
    var astro = new Astro(radio, GL, vRot, nombreTextura);
    
    var distanciaPlaneta = distanciaPlanet + radio;
    var giroTraslacion = 0;
    var incremento = LIBS.degToRad(vTras);
    
    if (distanciaPlanet == 0){
        distanciaPlaneta = 0;
        incremento = 0;
    }
    var pickableTraslacion = false;

    this.dibujar = function (MOVEMATRIX) {
        if (!pickableTraslacion || !MOUSE.isPressed()) {
            giroTraslacion += incremento;
        }

        var matrixRot = LIBS.get_I4();
        LIBS.rotateY(matrixRot, giroTraslacion);
        var matrixTras = LIBS.get_I4();
        LIBS.translateX(matrixTras, distanciaPlaneta);

        var modelMatrix = LIBS.mult(matrixRot, MOVEMATRIX);
        modelMatrix = LIBS.mult(matrixTras, modelMatrix);

        astro.dibujar(modelMatrix);
    };

    this.addDistancia = function (radioPlaneta) {
        distanciaPlaneta = radioPlaneta + radio + distanciaPlanet;
    };

    this.setPickableRot = function (pick) {
        astro.setPickableRot(pick);
    };

    this.setPickableTras = function (pick) {
        pickableTraslacion = pick;
    };
    
    this.setMaterial = function (material){
        astro.setMaterial(material);
    };
}