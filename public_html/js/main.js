
var main = function () {

    /*========================= GET WEBGL CONTEXT ========================= */
    var GL = getGLContext("canvas");

    /*========================= CAPTURE MOUSE EVENTS ========================= */

    var onClick = function (e){
        MOUSE.click();
    }

    canvas.addEventListener("click", onClick);

    /*========================= SHADERS AND PROGRAM ========================= */

    crearPrograma(GL);

    /*========================= MATRIX ========================= */

    var PROJMATRIX = LIBS.get_projection(40, canvas.width / canvas.height, 1, 100);
    var VIEWMATRIX = LIBS.get_I4();
    var MOVEMATRIX;

    LIBS.translateZ(VIEWMATRIX, -15);

    /*========================= CREACIÓN ASTROS ========================= */

    //new Planeta/Satelite (radio, GL, distancia, grados de rotacion, grados de traslacion, nombre textura)
    var tierra = new Planeta(1, GL, 0, 1, 0, "textures/tierra.jpg");
    var luna = new Satelite(0.5, GL, 1, 0, 2, "textures/luna.jpg");
//    tierra.setPickableRot(true);
//    tierra.setPickableTras(true);
//    luna.setPickableRot(true);
    luna.setPickableTras(true);
    tierra.addSatelite(luna);

    /*========================= DRAWING ========================= */
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    GL.clearDepth(1.0);
    

    var animate = function () {

        GL.viewport(0.0, 0.0, canvas.width, canvas.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
        GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
        MOVEMATRIX = LIBS.get_I4();
        
        tierra.dibujar(_position, _uv, MOVEMATRIX);
        
        GL.flush();

        window.requestAnimationFrame(animate);
    };
    animate();
};