

var gImgs = [{ id: 1, url: '/meme-imgs/9.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    line: 'We\'ll make theme learn REGEX',
    uppercase: false,
    stroke: true,
    size: 20,
    align: 'left',
    color: 'red'
}
    


function selectedMeme(img) {

    gMeme.selectedImgId = img.id;
    gCurrImg = img;


    renderCanvas(img)
}


