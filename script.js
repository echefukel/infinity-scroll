const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;



let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'VxFeaXlwAY9EjJq2EVu5dBAIqWuAqzIRlnCsIvqiYCw';
// unsplash API URL
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded(){
    
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        
    }
}


// Helper Function to set attributes on DOM elements
const setAttributes = (element,attributes) =>{
    for (const key in attributes){
        element.setAttribute(key,attributes[key])
    }


}

// create elements for links and photos , add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    //run a forEach
     photosArray.forEach((photo) =>{
        // create an anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{        
            href:photo.links.html,
            target:'_blank',
        })

        // Craete <img> for photo
        const img = document.createElement('img');
        
          setAttributes(img,{
              'src': photo.urls.regular,
              'alt': photo.alt_description,
              'title': photo.alt_description,
          })
            // event listener , check when it has finished loading
            img.addEventListener('load',imageLoaded);





        // put <img> inside <a> then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);


     })
}







//Get photos from unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray= await response.json();
        displayPhotos();

    } catch(error){

    }
}


// check to see if scrolling near bottom of page
window.addEventListener('scroll', () =>{
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
         ready = false;
         getPhotos();
         
     }

})


// on load
getPhotos();
