var MOUSE = {
    pressed: false,
    click: function (){
        this.pressed = !this.pressed;
    },
    isPressed: function (){
        return this.pressed;
    }
};