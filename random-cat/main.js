// console.log("Hola");

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3";

async function reload() {
    const res = await fetch(API_URL);
    let data = await res.json();

    console.log(data);

    const img1 = document.getElementById('img1');
    img1.src = data[0].url; 

    const img2 = document.getElementById('img2');
    img2.src = data[1].url; 

    const im32 = document.getElementById('img3');
    img3.src = data[2].url; 
}

reload();