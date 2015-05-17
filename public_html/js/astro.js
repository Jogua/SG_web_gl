function Astro(radio, GL, vRot, nombreTextura) {
    
    var esfera = new Esfera(radio, 100, GL);
    esfera.cargarTextura(nombreTextura);
    
    var giroRotacion = 0;
    var incremento = LIBS.degToRad(vRot);
    
    var pickableRot = false;
    
    this.dibujar = function (MOVEMATRIX) {
        if (!pickableRot || !MOUSE.isPressed()) {
            giroRotacion += incremento;
        }
        
        var matrixRot = LIBS.get_I4();
        LIBS.rotateY(matrixRot, giroRotacion);
        
        var modelMatrix = LIBS.mult(matrixRot, MOVEMATRIX);
        
        esfera.dibujar(modelMatrix);
    };
    
    this.setPickableRot = function (pick){
        pickableRot = pick;
    };
    
    this.setMaterial = function (material){
        esfera.setMaterial(material);
    };
}