function Satelite(radio, GL, distanciaPlanet, vRot, vTras, nombreTextura) {
    var astro = new Astro(radio, GL, vRot, nombreTextura);
    var distanciaPlaneta = distanciaPlanet + radio;
    var giroTraslacion = 0;
    var incremento = LIBS.degToRad(vTras);
    if (distanciaPlanet == 0){
        incremento = 0;
    }
    var pickable = false;
    var primera = true;
    var giro = 0;


    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        giroTraslacion += incremento;
        
        var matrixRot = LIBS.get_I4();
        
        if (!pickable || !MOUSE.isPressed()) {
            primera = true;
            LIBS.rotateY(matrixRot, giroTraslacion);
        }else{
            if(primera){
                giro = giroTraslacion;
                primera = false;
            }
            LIBS.rotateY(matrixRot, giro);
        }

        var matrixTras = LIBS.get_I4();
        LIBS.translateX(matrixTras, distanciaPlaneta);

        var modelMatrix = LIBS.mult(matrixRot, MOVEMATRIX);
        modelMatrix = LIBS.mult(matrixTras, modelMatrix);

        astro.dibujar(_position, _uv, modelMatrix);
    };


//    this.dibujar = function (_position, _uv, MOVEMATRIX) {
//        if (!pickable || !MOUSE.isPressed()) {
//            giroTraslacion += incremento;
//        }
//
//        var matrixRot = LIBS.get_I4();
//        LIBS.rotateY(matrixRot, giroTraslacion);
//        var matrixTras = LIBS.get_I4();
//        LIBS.translateX(matrixTras, distanciaPlaneta);
//
//        var modelMatrix = LIBS.mult(matrixRot, MOVEMATRIX);
//        modelMatrix = LIBS.mult(matrixTras, modelMatrix);
//
//        astro.dibujar(_position, _uv, modelMatrix);
//    };

    this.addDistancia = function (radioPlaneta) {
        distanciaPlaneta += radioPlaneta;
//        this.MOVEMATRIX = LIBS.get_I4();
//        LIBS.translateX(this.MOVEMATRIX, distanciaPlaneta + radioPlaneta);
    };

    this.setPickableRot = function (pick) {
        astro.setPickableRot(pick);
    };

    this.setPickableTras = function (pick) {
        pickable = pick;
    };
}