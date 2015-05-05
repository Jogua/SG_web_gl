function Astro(radio, GL, vRot, nombreTextura) {
    var esfera = new Esfera(radio, 50, GL);
    esfera.crearEsfera();
    esfera.cargarTextura(nombreTextura);
    var giroRotacion = 0;
    var incremento = LIBS.degToRad(vRot);
    var pickable = false;

    this.dibujar = function (_position, _uv, MOVEMATRIX) {
        if (!pickable || !MOUSE.isPressed()) {
            giroRotacion = incremento;
        } else {
            giroRotacion = 0;
        }
        LIBS.rotateY(MOVEMATRIX, giroRotacion);
        esfera.dibujar(_position, _uv, MOVEMATRIX);
    };
    
    this.setPickableRot = function (pick){
        pickable = pick;
    };
}