'use strict';

// *****WINDOWS*****
let imgcontainer = document.getElementById('img-container');

let showresultsbtn = document.getElementById('show-results-btn');

let imgone = document.getElementById('img-one');

let imgtwo = document.getElementById('img-two');

let imgthree = document.getElementById('img-three');

// Canvas element for chart to render to
let canvasElem = document.getElementById('my-chart').getContext('2d');

// ******GLOBALS******

let voteCount = 25;

let productArray = [];

// *****CONSTRUCTOR FUNCTION*******
function Product(Name, fileExtension = 'jpg') {
  this.Name = Name;
  this.img = `img/${Name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);

}

// ****** HELPER FUNTCION / UTILITIES ******
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

// let prevImgIndexArr = [];
function renderImgs() {
  let ImgIndexArr = [];
  while (ImgIndexArr.length < 6) {
    let randomNumber = randomIndex();
    if (!ImgIndexArr.includes(randomNumber)) {
      ImgIndexArr.push(randomNumber);
    }
  }
  console.log('current', ImgIndexArr);
  // console.log('previous', prevImgIndexArr);
  // prevImgIndexArr = [ImgIndexArr[0], ImgIndexArr[1], ImgIndexArr[2]];


  let imgoneIndex = ImgIndexArr.shift();
  let imgtwoIndex = ImgIndexArr.shift();
  let imgthreeIndex = ImgIndexArr.shift();

  imgone.src = productArray[imgoneIndex].img;
  imgtwo.src = productArray[imgtwoIndex].img;
  imgthree.src = productArray[imgthreeIndex].img;

  productArray[imgoneIndex].views++;
  productArray[imgtwoIndex].views++;
  productArray[imgthreeIndex].views++;

  imgone.alt = productArray[imgoneIndex].Name;
  imgtwo.alt = productArray[imgtwoIndex].Name;
  imgthree.alt = productArray[imgthreeIndex].Name;
}


function renderChart() {

  // TODO: Create arrays that will hold our dynamic data for the chart obj
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  // TODO: Loop through our goatArray and pull out the necessary information for our data arrays
  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].Name);
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
  }

  // TODO: create a chart object to pass into the Chart constructor call to populate the chart
  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        data: productVotes,
        label: '# of Votes',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'

        ],
        borderWidth: 10
      },
      {
        data: productViews,
        label: '# of Views',
        backgroundColor: [
          'blue'

        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // TODO: call the Chart constructor. It takes in 2 args, the canvas element and the object with data
  new Chart(canvasElem, myChartObj);
}

// ***** EVENT HANDLERS **********
function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  console.log('img.clicked >>', imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].Name === imgClicked) {
      // increase vote counts
      productArray[i].clicks++;
    }
  }


  voteCount--;


  renderImgs();


  if (voteCount === 0) {
    imgcontainer.removeEventListener('click', handleClick);
  }
}



function handleShowResults() {
  // TODO: Display results - once there are no more votes left
  if (voteCount === 0) {
    renderChart();
    showresultsbtn.removeEventListener('click', handleShowResults);
  }
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dragon');
new Product('dog-duck');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

renderImgs();

imgcontainer.addEventListener('click', handleClick);
showresultsbtn.addEventListener('click', handleShowResults);
