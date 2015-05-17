
function GrupoOrbital(GL) {
    var luz = new Luz(GL);
    luz.setDireccion(-1, 0, 1);

    var material = new Material(GL);
    material.setEspecular(0.3, 0.3, 0.3);
    
    //new Planeta/Satelite (radio, GL, distancia, velocidad rotacion, velocidad traslacion, nombre textura)
    var tierra = new Planeta(1, GL, 0, 1, 0, "textures/tierra.jpg");
    tierra.setMaterial(material);
    
    var luna = new Satelite(0.5, GL, 1, 0, 2, "textures/luna.jpg");
    luna.setMaterial(material);
    luna.setPickableTras(true);
    
    tierra.addSatelite(luna);

    var planetas = [];
    planetas.push(tierra);

    this.dibujar = function (MOVEMATRIX) {
        luz.dibujar();
        
        for (var i = 0; i < planetas.length; i++) {
            planetas[i].dibujar(MOVEMATRIX);
        }
    };
}