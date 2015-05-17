
function GrupoOrbital(GL) {
    var luz = new Luz(GL);
//    luz.setEspecular(1,0,0);
    luz.setDireccion(-1, 0, 1);

    var material = new Material(GL);
    material.setEspecular(0.3, 0.3, 0.3);
    
    var material2 = new Material(GL);
    material2.setDifusa(1,0,0);
    
    //new Planeta/Satelite (radio, GL, distancia, velocidad rotacion, velocidad traslacion, nombre textura)
    var tierra = new Planeta(1, GL, 5, 1, 1, "textures/tierra.jpg");
    tierra.setMaterial(material2);
    var luna = new Satelite(0.5, GL, 0, 0, 2, "textures/luna.jpg");
    luna.setMaterial(material);
    
//    var t = new Satelite(2, GL, 0, -10, 2, "textures/tierra.jpg");
    
    luna.setPickableTras(true);
    tierra.addSatelite(luna);
//    tierra.addSatelite(t);
    
    var sol = new Astro(2, GL, 1, "textures/sol.jpg");
    
//    var sol = new Planeta(2, GL, 0, 1, 0, "textures/sol.jpg");

    var planetas = [];
    planetas.push(tierra);
    planetas.push(sol);

    this.dibujar = function (MOVEMATRIX) {
        luz.dibujar();
        
        for (var i = 0; i < planetas.length; i++) {
            planetas[i].dibujar(MOVEMATRIX);
        }
    };
}