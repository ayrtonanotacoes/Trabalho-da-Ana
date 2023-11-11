window.onload = function() {
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var ctx = document.getElementById('histogramCanvas').getContext('2d');

    var grayscaleButton = document.getElementById('grayscaleButton');
    var imageCanvas = document.getElementById('imageCanvas');
    var imgCtx = document.getElementById('imageCanvas').getContext('2d');
    var img = new Image();
    var originalImageData = null;
    var isGrayscale = false;
    grayscaleButton.addEventListener('click', toggleGrayscale, false);

    function toggleGrayscale() {
        if (!originalImageData) return;
        
        var histCanvas = document.getElementById('histogramCanvas'); // Certifique-se de que este é o ID do seu canvas de histograma

        if (isGrayscale) {
            // Se já está em escala de cinza, restaurar para a imagem original
            console.log("Hey")
            imgCtx.putImageData(originalImageData, 0, 0);
            histCanvas.getContext('2d').clearRect(0, 0, histCanvas.width, histCanvas.height);
            isGrayscale = false;
            drawHistogram(img)
        } else {
            // Converter para escala de cinza e exibir
            console.log("Hello")
            var temp = convertToGrayscale();
            isGrayscale = true;
            var temp2 = calculateGrayscaleHistogram(temp);
            drawHistogram2(temp2, histCanvas);
        }
    }

    function calculateGrayscaleHistogram(imageData) {
        var histogram = new Array(256).fill(0);
        var data = imageData.data;
    
        for (var i = 0; i < data.length; i += 4) {
            // Como a imagem já está em escala de cinza, você pode pegar qualquer canal de cor.
            histogram[data[i]]++;
        }
    
        return histogram;
    }

    function convertToGrayscale() {
        var imageData = imgCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
            var gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
            data[i] = data[i + 1] = data[i + 2] = gray;
        }

        imgCtx.putImageData(imageData, 0, 0);
        return imageData;

    }

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            img.onload = function() {
                var maxWidth = 250; // por exemplo, 500 pixels de largura
                var maxHeight = 250; // por exemplo, 500 pixels de altura
                var ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                var newWidth = img.width * ratio;
                var newHeight = img.height * ratio;
                var imageCanvas = document.getElementById('imageCanvas');
                var imgCtx = imageCanvas.getContext('2d');
                imageCanvas.width = newWidth;
                imageCanvas.height = newHeight;
                imgCtx.drawImage(img, 0, 0, newWidth, newHeight);
                originalImageData = imgCtx.getImageData(0, 0, newWidth, newHeight);
                isGrayscale = false;
                drawHistogram(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    }

    function drawHistogram(img) {
        var canvas = document.createElement('canvas');
        var ctxImg = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctxImg.drawImage(img, 0, 0);

        var imageData = ctxImg.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var rHist = new Array(256).fill(0);
        var gHist = new Array(256).fill(0);
        var bHist = new Array(256).fill(0);
        var grayHist = new Array(256).fill(0);

        for (var i = 0; i < data.length; i += 4) {
            rHist[data[i]]++;
            gHist[data[i+1]]++;
            bHist[data[i+2]]++;
            var gray = Math.round((data[i] + data[i+1] + data[i+2]) / 3);
            grayHist[gray]++;
        }

        var maxHistValue = Math.max(...rHist, ...gHist, ...bHist, ...grayHist);
        var histHeight = 62;
        var histWidth = 250;
        var barWidth = histWidth / 256;

        ctx.clearRect(0, 0, histWidth, histHeight * 4);

        drawHistBar(ctx, rHist, 0, 'red');
        drawHistBar(ctx, gHist, histHeight, 'green');
        drawHistBar(ctx, bHist, histHeight * 2, 'blue');
        drawHistBar(ctx, grayHist, histHeight * 3, 'gray');

        function drawHistBar(ctx, hist, yOffset, color) {
            ctx.fillStyle = color;
            for (var i = 0; i < hist.length; i++) {
                var barHeight = (hist[i] / maxHistValue) * histHeight;
                ctx.fillRect(i * barWidth, yOffset + histHeight - barHeight, barWidth, barHeight);
            }
        }
    }

    function drawHistogram2(histogram, histCanvas) {
        var ctx = histCanvas.getContext('2d');
        var histMax = Math.max(...histogram);
    
        ctx.clearRect(0, 0, histCanvas.width, histCanvas.height);
        ctx.fillStyle = 'black';
    
        for (var i = 0; i < histogram.length; i++) {
            var barHeight = (histogram[i] / histMax) * histCanvas.height;
            ctx.fillRect(i, histCanvas.height - barHeight, 1, barHeight);
        }
    }
    
   
}