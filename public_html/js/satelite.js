function Satelite(radio, GL, distanciaPlanet, vRot, vTras, nombreTextura) {
    var astro = new Astro(radio, GL, vRot, nombreTextura);
    var distanciaPlaneta = distanciaPlanet + radio;
    this.MOVEMATRIX = LIBS.get_I4();
    var giroTraslacion = 0;
    var incremento = LIBS.degToRad(vTras);
    var pickable = false;
    
    LIBS.translateX(this.MOVEMATRIX, distanciaPlaneta);

    this.dibujar = function (_position, _uv) {
        if (!pickable || !MOUSE.isPressed()) {
            giroTraslacion = incremento;
        } else {
            giroTraslacion = 0;
        }
        LIBS.rotateY2(this.MOVEMATRIX, giroTraslacion);
        astro.dibujar(_position, _uv, this.MOVEMATRIX);
    };

    this.addDistancia = function (radioPlaneta) {
        this.MOVEMATRIX = LIBS.get_I4();
        LIBS.translateX(this.MOVEMATRIX, distanciaPlaneta + radioPlaneta);
    };
    
    this.setPickableRot = function (pick){
        astro.setPickableRot(pick);
    };
    
    this.setPickableTras = function (pick){
        pickable = pick;
    };
}