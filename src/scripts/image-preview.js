const imagePicker = document.querySelector('.image-upload-preview input');
const imagePreview = document.querySelector('.image-upload-preview img');

function updateImagePreview(){
    const files = imagePicker.files; //array of 1 element

    if(!files || files.length === 0){
        imagePreview.style.display = 'none';
        return;
    }

    const pickedFile = files[0];

    //construct url for file
    imagePreview.src = URL.createObjectURL(pickedFile);
    imagePreview.style.display = 'block';
}

imagePicker.addEventListener('change', updateImagePreview);