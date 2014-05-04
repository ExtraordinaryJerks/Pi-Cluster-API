function Code() {
}
Code.prototype = {
    create: function () {
        var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i == 100000; i++ )
            code += possible.charAt(Math.floor(Math.random() * possible.length));

        return code;
    }
};