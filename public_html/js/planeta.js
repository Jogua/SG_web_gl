function Planeta(radio, GL, distanciaSol, vRot, vTras, nombreTextura) {
    var astro = new Astro(radio, GL, distanciaSol, vRot, vTras, nombreTextura);
   
    var satelites = [];

    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        
        astro.dibujar(_position, _uv, MOVEMATRIX);

        for (i = 0; i < satelites.length; i++) {
            satelites[i].dibujar(_position, _uv, MOVEMATRIX);
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
        astro.setPickableTras(pick);
    };
}