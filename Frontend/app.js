
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const img = document.getElementById('image').files[0];
    // Get form data
    const form = new FormData();
    form.append('name',name);
    form.append('pic', img);
    
    fetch('http://localhost:8080/api/picupload', {
        method: 'POST',
        body: form
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        // Handle any errors that occur during submission
        console.error('Error:', error);
    });
});


document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    // Check if a file was selected
    if (file) {
        // Show image preview
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewImage = document.getElementById('previewImage');
            const imageName = document.getElementById('imageName');
            const imagePreview = document.getElementById('imagePreview');
            
            previewImage.src = e.target.result;
            imageName.textContent = `Name: ${file.name}`;
            imagePreview.style.display = 'block';
        }
        
        reader.readAsDataURL(file);
    }
});

const getImgs = async()=>{
        await fetch("http://localhost:8080/api/getimg").then(response=>response.json())
        .then(data=>{
            const imgs = data.imgs;
            const cardCon = document.getElementById('card-container');
            imgs.forEach(element => {
                let card = document.createElement('div');
            let img = document.createElement('img');
            let cardText = document.createElement('div');
            let name = document.createElement('h3');
            let button = document.createElement('button');

            card.className = 'card';
            img.src = element.src;
            img.className = 'card-image';
            cardText.className = "card-content";
            name.innerText = element.name;
            name.className = 'card-title';
            button.id = 'delete';
            button.innerText = "Delete"

            button.addEventListener('click', () => deleteImage(element.src));

            cardText.append(name);
            cardText.append(button);
            card.append(img);
            card.append(cardText);

            cardCon.append(card);
            });
            
        })
        .catch((err)=>
        console.log(err));
}
getImgs();

const deleteImage = async(imgurl)=>{
    await fetch(`http://localhost:8080/api/picdelete?url=${imgurl}`,{
        method: 'DELETE'
    }).then(response=> response.json())
    .then(data=>{
        console.log(data);
    }).catch(err=>{
        console.log(err);
    })
    window.location.reload();
}
