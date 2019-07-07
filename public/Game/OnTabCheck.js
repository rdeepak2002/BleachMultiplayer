var isTabActive;

window.onfocus = function () { 
  isTabActive = true; 
}; 

window.onblur = function () { 
  isTabActive = false; 
}; 