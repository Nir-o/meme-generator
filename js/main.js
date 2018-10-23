var canvas;
var ctx;
var gCurrImg;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    gCurrImg = document.getElementById('start-image');


}

function renderCanvas(img) {
    // canvas.width = img.width;
    // canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function createMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // gCurrImg = img

    // renderCanvas(gCurrImg);
    renderCanvas(gCurrImg);

    // Defaul style for text
    ctx.lineWidth = 5;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';

    // Draw the text
    var text = document.getElementById('custom-text').value;
    // text = text.toUpperCase();
    // x = canvas.width/2 - gCurrImg.width/2;
    // y = canvas.height/2 - gCurrImg.height/2;
    // ctx.drawImage(gCurrImg, 0, 0);
    // ctx.strokeText(text, 200, 50);
    ctx.fillText(text, 200, 50);
    // ctx.strokeText(text, x, y);
    // ctx.fillText(text, x, y);
}

// function styleText(changeToMake) {

//     switch (changeToMake) {
//         case 'erase':
//             renderCanvas(gCurrImg);
//             break;
//         case 'uppercase':
//         renderCanvas(gCurrImg);
//             var text = document.getElementById('custom-text').value;
//             text = text.toUpperCase();
//             // ctx.strokeText(text, 200, 50);
//             ctx.fillText(text, 200, 50);
//             break;
//         case 'stroke':
//         renderCanvas(gCurrImg);
//             var text = document.getElementById('custom-text').value;
//             ctx.strokeText(text, 200, 50);
//             ctx.fillText(text, 200, 50);
//             break;


//     }
// }


// function styleText(changeToMake) {

switch (changeToMake) {
    case 'erase':
        gMeme.line = '';
        break;
    case 'uppercase':
        if (gMeme.uppercase === false) {
            gMeme.line = gMeme.line.toUpperCase();
            gMeme.uppercase = true;
        } else {
            gMeme.line = gMeme.line.toLowerCase();
            gMeme.uppercase = false;
        }
        break;
    case 'stroke':
        if (gMeme.stroke === false) {
            gMeme.stroke = true;
        } else {
            gMeme.stroke = false;
        }
        break;
    case 'font-size-up':
        gMeme.size += 1;
        break;
    case 'font-size-down':
        gMeme.size -= 1;
        break;
    case 'align-txt-left':
        gMeme.align = 'left';
        break;
    case 'align-txt-center':
        gMeme.align = 'center';
        break;
    case 'align-txt-right':
        gMeme.align = 'right';
        break;
    case 'line-select':
        // To do- prep for optional 2nd line
        break;
    case 'color':
        // To do- add color selection to button
        break;
    //To do - add rendering function by Meme obj

}


// img.onload = function () {
//     // Work out where to center it
//     x = canvas.width / 2 - img.width / 2;
//     y = canvas.height / 2 - img.height / 2;

//     // Draw it
//     ctx.drawImage(img, x, y);
// }