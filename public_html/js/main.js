
var main = function () {

    /*========================= GET WEBGL CONTEXT ========================= */
    var GL = getGLContext("canvas");

    /*========================= CAPTURE MOUSE EVENTS ========================= */

    var onClick = function (e) {
        MOUSE.click();
    };
    
    var distancia = -10;
    var zoom = function (e) {
        if (e.deltaY > 0 && distancia > -20) {
            distancia -= 0.5;
        } else if (e.deltaY < 0 && distancia < -6) {
            distancia += 0.5;
        }
    };

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mousewheel", zoom);

    /*========================= SHADERS AND PROGRAM ========================= */

    crearPrograma(GL);

    /*========================= MATRIX ========================= */

    var PROJMATRIX = LIBS.get_projection(40, canvas.width / canvas.height, 1, 100);
    var VIEWMATRIX = LIBS.get_I4();
    var MOVEMATRIX;

//    LIBS.translateZ(VIEWMATRIX, -6);

    /*========================= CREACIÓN ASTROS ========================= */

    var grupoOrbital = new GrupoOrbital(GL);  

    /*========================= DRAWING ========================= */
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    GL.clearDepth(1.0);


    var animate = function () {
        
        VIEWMATRIX = LIBS.get_I4();
        LIBS.translateZ(VIEWMATRIX, distancia);

        GL.viewport(0.0, 0.0, canvas.width, canvas.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
        GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
        
        MOVEMATRIX = LIBS.get_I4();

        grupoOrbital.dibujar(MOVEMATRIX);
        
        GL.flush();

        window.requestAnimationFrame(animate);
    };
    
    animate();
};