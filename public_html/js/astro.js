function Astro(radio, GL, distanciaOtroAstro, vRot, vTras,  nombreTextura) {
    var esfera = new Esfera(radio, 50, GL);
    esfera.crearEsfera();
    esfera.cargarTextura(nombreTextura);
    var giroRotacion = 0;
    var incrementoRotacion = LIBS.degToRad(vRot);
    var distancia = distanciaOtroAstro;
    var giroTraslacion = 0;
    var incrementoTraslacion = LIBS.degToRad(vTras);
    if (distancia == 0) {
        incrementoTraslacion = 0;
    }
    var pickableRot = false;
    var pickableTras = false;

    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        if (!pickableRot || !MOUSE.isPressed()) {
            giroRotacion += incrementoRotacion;
        }
        
        if (!pickableTras || !MOUSE.isPressed()) {
            giroTraslacion += incrementoTraslacion;
        }

        var matrixRotEje = LIBS.get_I4();
        LIBS.rotateY(matrixRotEje, giroRotacion);
        
        var matrixRotOtroAstro = LIBS.get_I4();
        LIBS.rotateY(matrixRotOtroAstro, giroTraslacion);
        var matrixTras = LIBS.get_I4();
        LIBS.translateX(matrixTras, distancia);

        var modelMatrix = LIBS.mult(MOVEMATRIX, matrixRotEje);
        modelMatrix = LIBS.mult(modelMatrix, matrixTras);
        modelMatrix = LIBS.mult(modelMatrix, matrixRotOtroAstro);

        esfera.dibujar(_position, _uv, modelMatrix);
    };
    
    this.addDistancia = function (dist){
        distancia += dist;
    };

    this.setPickableRot = function (pick) {
        pickableRot = pick;
    };

    this.setPickableTras = function (pick) {
        pickableTras = pick;
    };
}