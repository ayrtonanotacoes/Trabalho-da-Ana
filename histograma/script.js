window.onload = function() {
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var ctx = document.getElementById('histogramCanvas').getContext('2d');

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
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
        var histHeight = 50;
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
}
