function save() {
    function saveImageToPhone(url, success, error) {
        var canvas, context, imageDataUrl, imageData;
        var img = new Image();
        img.onload = function() {
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            try {
                imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
                cordova.exec(
                    success,
                    error,
                    'Canvas2ImagePlugin',
                    'saveImageDataToLibrary',
                    [imageData]
                );
            }
            catch(e) {
                error(e.message);
            }
        };
        try {
            img.src = url;
        }
        catch(e) {
            error(e.message);
        }
    }

    var success = function(msg){
        console.info(msg);
    };
    var error = function(err){
        console.error(err);
    };
    
    saveImageToPhone('image.jpg', success, error)
}