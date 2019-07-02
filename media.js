function loadImage(path) {
	var image = new Image();   // Create new img element

  image.src = path; // Set source path

  return image
}

function preloadImages() {
	images = {
							"ichigoStandRight" : loadImage("resources/ichigo/ichigor.png")
							
					  };
}

function getImage(path) {
	return images["ichigoStandRight"];
}

preloadImages();