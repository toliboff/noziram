//  AUTHENTENTICATION


const txtEmail = document.querySelector("#email");
const txtPassword = document.querySelector("#password");
const btnLogin = document.querySelector("#btnLogin");
const btnSignUp = document.querySelector("#btnSignUp");
const btnSignOut = document.querySelector("#btnSignOut");


// add login event
btnLogin.addEventListener('click', e => {
    // get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promice = auth.signInWithEmailAndPassword(email, pass);
    promice.catch(e => console.log(e.message))

})

// add SignUp event
btnSignUp.addEventListener('click', e => {
    // get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promice = auth.createUserWithEmailAndPassword(email, pass);
    promice.catch(e => console.log(e.message))

})

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser)
    } else {
        console.log('not logged in')
    }
})

// LOG OUT
btnSignOut.addEventListener('click', e => {
        firebase.auth().signOut();
    })
    // ------------- PUSH Notifications ----------------
const messaging = firebase.messaging();
messaging.requestPermission().then(function() {
    console.log('Have permission');
    return messaging.getToken();
}).then(function(token) {
    console.log(token);
}).catch(function(err) {
    console.log('Error Occured.')
})


// ///////////////////////////////////////////////////////////
// ------------------- GETTING COUNT OF CHILD NODES --------//
// ///////////////////////////////////////////////////////////

firebase.database().ref('products').on('value', (snap) => {
    var totalRecord = snap.numChildren();
    console.log("Total Record : " + totalRecord);
});
// ///////////////////////////////////////////////////////////
// ------------------RETRIEVE ALL DATA ---------------------//
// ///////////////////////////////////////////////////////////

var ref = firebase.database().ref("products");

ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        var childData = childSnapshot.val();
        let section = document.querySelector("#section");
        let product_card = document.createElement("div");
        product_card.className = "product-card";

        let img = document.createElement("img");
        img.src = childData.image;
        let div_image = document.createElement("div");
        div_image.className = "image-container";
        div_image.appendChild(img)
        product_card.appendChild(div_image);
        //-------------- Like and Comments section -------------
        let div_like = document.createElement("div");
        div_like.className = "like-comments";
        let heart = document.createElement("i");
        heart.className = "far fa-heart";
        let comments = document.createElement("i");
        comments.className = "far fa-comments";
        let price = document.createElement("span");
        price.className = "price";
        price.textContent = childData.price + "c.";
        div_like.appendChild(heart)
        div_like.appendChild(comments)
        div_like.appendChild(price)
        product_card.appendChild(div_like);
        //-------------- INFO section -------------
        let div_info = document.createElement("div");
        div_info.className = "info";
        product_card.appendChild(div_info);

        let h3 = document.createElement("h3");
        h3.textContent = childData.product_name;
        div_info.appendChild(h3);

        let description = document.createElement("p");
        let txt = document.createTextNode(childData.description);
        description.appendChild(txt);
        div_info.appendChild(description);

        let div_colors = document.createElement("div");
        div_colors.className = "colors";
        let available_colors = document.createElement("span");
        available_colors.className = "color";
        available_colors.textContent = "Доступные цвета";
        div_colors.appendChild(available_colors);
        // -------------Creating available colors -----
        let av_colors = childData.colors;
        av_colors = av_colors.split(" ");
        av_colors.forEach(a => {
            let div = document.createElement("div");
            div.className = a;
            div_colors.appendChild(div);
            div_info.appendChild(div_colors)
        });

        // let red_color = document.createElement("div");
        // red_color.className = "red";
        // div_colors.appendChild(red_color);
        // let blue_color = document.createElement("div");
        // blue_color.className = "blue";
        // div_colors.appendChild(blue_color);
        // let white_color = document.createElement("div");
        // white_color.className = "white";
        // div_colors.appendChild(white_color);


        product_card.appendChild(div_info);

        section.appendChild(product_card)














        // var id = childData.id;

        // console.log(childData);
        // for (items in childData) {
        //     console.log(items + ": " + childData[items])
        // }


    });
});