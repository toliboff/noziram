// //////////////////////////////////////////////////////////
// ---------------- IMAGE UPLOAD --------------------------//
// //////////////////////////////////////////////////////////
let imageUrl;

function upload() {
    //get your selected image
    let image = document.querySelector("#image").files[0];

    //now get your image name
    let imageName = image.name;

    // firebase storage reference
    let storageRef = firebase.storage().ref('images/' + imageName);

    //upload image to selected storage reference
    let uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot) {
        // observe state change event such as progress, pause, resume
        // get task progress by including the number of bytes uploaded and total
        // number of bytes

        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar = document.querySelector(".progressBar");
        progressBar.style.width = progress + "%";
        progressBar.innerHTML = progress.toFixed() + "%";
        console.log("upload is " + progress + " done");


    }, function(error) {
        // handle error here
        console.log(error.message)
    }, function() {
        // handle succesfull uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(
            function(downloadURL) {
                // get your upload image url here ...
                imageUrl = downloadURL;

            }
        )
    })



}

// //////////////////////////////////////////////////////////
// --------------- INSERT DATA TO DATABASE ----------------//
// //////////////////////////////////////////////////////////

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const image = document.querySelector("#image");

const addbtn = document.querySelector("#addBtn");
const updbtn = document.querySelector("#updBtn");
const delbtn = document.querySelector("#delBtn");

const database = firebase.database();
addbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const colors = document.querySelectorAll(".available_colors");
    let selected_colors = [];
    colors.forEach(a => { if (a.checked) { selected_colors.push(a.value) } });
    selected_colors = selected_colors.join(" ");
    database.ref('/products/').push({
        product_name: name.value,
        description: description.value,
        price: price.value,
        colors: selected_colors,
        image: imageUrl,
        added: Date()
    }).then({
        function() {
            console.log('Added')
        }
    })
})

// ///////////////////////////////////////////////////////////
// ------------------- GETTING COUNT OF CHILD NODES --------//
// ///////////////////////////////////////////////////////////

// firebase.database().ref('products').on('value', (snap) => {
//     var totalRecord = snap.numChildren();
//     console.log("Total Record : " + totalRecord);
// });

// ///////////////////////////////////////////////////////////
// ------------------- Read List of Data -------------------//
// ///////////////////////////////////////////////////////////
// firebase.database().ref('products/' + 1).once('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//         var childKey = childSnapshot.key;
//         var childData = childSnapshot.val();
//         // ...
//         console.log(childKey + ": " + childData)
//     });
// });