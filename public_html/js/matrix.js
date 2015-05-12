var MATRIX = {
    stack: new Array(),
    size: 0,
    push: function (m){
        this.stack.push(new Array(m));
        this.size++;
    },
    pop: function (){
        var m = this.stack.pop();
        this.size--;
        return m;
    },
    
    matrix: LIBS.get_I4(),
    push2: function (m){
        this.matrix = LIBS.mult(this.matrix, m);
    },
    pop2: function (m){
        this.matrix = LIBS.mult(this.matrix, LIBS.inv(m));
    }
};