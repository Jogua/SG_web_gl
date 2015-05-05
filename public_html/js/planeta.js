function Planeta(radio, GL, distanciaSol, vRot, vTras, nombreTextura) {
    var astro = new Astro(radio, GL, vRot, nombreTextura);
    var distanciaSol = distanciaSol;
    this.MOVEMATRIX = LIBS.get_I4();
    var giroTraslacion = 0;
    var incremento = LIBS.degToRad(vTras);
    if(distanciaSol == 0){
        incremento = 0;
    }
    var satelites = [];

    var pickable = false;

    LIBS.translateX(this.MOVEMATRIX, distanciaSol);

    this.dibujar = function (_position, _uv) {
        if (!pickable || !MOUSE.isPressed()) {
            giroTraslacion = incremento;
        } else {
            giroTraslacion = 0;
        }
        LIBS.rotateY2(this.MOVEMATRIX, giroTraslacion);
        astro.dibujar(_position, _uv, this.MOVEMATRIX);

        for (i = 0; i < satelites.length; i++) {
            satelites[i].dibujar(_position, _uv);
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