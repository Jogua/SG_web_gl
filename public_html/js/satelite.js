function Satelite(radio, GL, distanciaPlaneta, vRot, vTras, nombreTextura) {
    var astro = new Astro(radio, GL, distanciaPlaneta, vRot, vTras, nombreTextura);

    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        
        astro.dibujar(_position, _uv, MOVEMATRIX);
    };

    this.addDistancia = function (radioPlaneta) {
        astro.addDistancia(radioPlaneta);
//        this.MOVEMATRIX = LIBS.get_I4();
//        LIBS.translateX(this.MOVEMATRIX, distanciaPlaneta + radioPlaneta);
    };

    this.setPickableRot = function (pick) {
        astro.setPickableRot(pick);
    };

    this.setPickableTras = function (pick) {
        astro.setPickableTras(pick);
    };
}