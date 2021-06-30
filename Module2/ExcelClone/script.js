let topLeftCell = document.querySelector(".top-left-cell");
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");

cellsContainer.addEventListener("scroll" , function(e){
  let topOffSet = e.target.scrollTop;
  let leftOffSet = e.target.scrollLeft;
  
  topRow.style.top = topOffSet + "px";
  topLeftCell.style.top = topOffSet + "px";
  topLeftCell.style.left = leftOffSet + "px";
  leftCol.style.left = leftOffSet + "px";
});