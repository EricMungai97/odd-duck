'use strict';

// *****WINDOWS*****
let imgcontainer = document.getElementById('img-container');

let resultscontainer = document.getElementById('results-container');

let showresultsbtn = document.getElementById('show-results-btn');

let imgone = document.getElementById('img-one');

let imgtwo = document.getElementById('img-two');

let imgthree = document.getElementById('img-three');

// ******GLOBALS******

let voteCount = 25;

let productArray = [];

// *****CONSTRUCTOR FUNCTION*******
function product(Name, fileExtension = 'jpg') {
  this.Name = Name;
  this.img = `img/${Name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);

}

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {
  let ImgIndexArr = [];
  while (ImgIndexArr.length < 3) {
    let randomNumber = randomIndex();
    if (ImgIndexArr.includes(randomNumber)) {
      randomNumber = randomIndex();
    }
    ImgIndexArr.push(randomNumber);

  }

  imgone.src = productArray[ImgIndexArr[0]].img;
  imgtwo.src = productArray[ImgIndexArr[1]].img;
  imgthree.src = productArray[ImgIndexArr[2]].img;

  productArray[ImgIndexArr[0]].views++;
  productArray[ImgIndexArr[1]].views++;
  productArray[ImgIndexArr[2]].views++;

  imgone.alt = productArray[ImgIndexArr[0]].Name;
  imgtwo.alt = productArray[ImgIndexArr[1]].Name;
  imgthree.alt = productArray[ImgIndexArr[2]].Name;
}

// ***** EVENT HANDLERS **********
function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  console.log( 'img.clicked >>', imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].Name === imgClicked) {
      // increase vote counts
      productArray[i].clicks++;
    }
  }


  voteCount--;


  renderImgs();


  if(voteCount === 0){
    imgcontainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  // TODO: Display results - once there are no more votes left
  if(voteCount === 0){
    for(let i = 0; i < productArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].Name} was viewed: ${productArray[i].views} and clicked: ${productArray[i].clicks}`;
      resultscontainer.appendChild(liElem);
    }
    showresultsbtn.removeEventListener('click', handleShowResults);
  }
}
new product('bag');
new product('banana');
new product('bathroom');
new product('boots');
new product('breakfast');
new product('bubblegum');
new product('chair');
new product('cthulhu');
new product('dog-duck');
new product('dragon');
new product('pen');
new product('pet-sweep');
new product('scissors');
new product('shark');
new product('sweep', 'png');
new product('tauntaun');
new product('unicorn');
new product('water-can');
new product('wine-glass');

renderImgs();

imgcontainer.addEventListener('click', handleClick);
showresultsbtn.addEventListener('click', handleShowResults);
