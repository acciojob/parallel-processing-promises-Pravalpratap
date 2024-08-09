// HTML element references
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to create an image element and handle loading
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    
    // Handle success
    img.onload = () => resolve(img);
    
    // Handle failure
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Event listener for the button click
btn.addEventListener('click', () => {
  // Clear the output div
  output.innerHTML = 'Loading images...';

  // Map each image object to a promise
  const promises = images.map(loadImage);

  // Use Promise.all to download all images in parallel
  Promise.all(promises)
    .then(imgElements => {
      // Clear the output div and add all loaded images
      output.innerHTML = ''; 
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      // Handle errors
      output.innerHTML = error;
    });
});
