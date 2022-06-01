// console.log("Hola");

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=e5d342a6-0a3e-45b0-af35-692a7a700d6a";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?limit=3&api_key=e5d342a6-0a3e-45b0-af35-692a7a700d6a";

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM);
    let data = await res.json();

    console.log('Gatos aleatorios: ', data);

    if (res.status !== 200) {
        let errorSpan = document.getElementById('error');
        errorSpan.innerHTML = "Hubo un error al cargar los gatos aleatorios - Error: " + res.status + " " + data.message;
    } else {
        const img1 = document.getElementById('img1');
        img1.src = data[0].url;

        const img2 = document.getElementById('img2');
        img2.src = data[1].url;
    }
}

async function loadFavouritesCats() {
    const res = await fetch(API_URL_FAVOURITES);
    let data = await res.json();

    console.log('Gatos favoritos: ', data);


    if (res.status !== 200) {
        console.log(res);
        console.log(data.message);
        let errorSpan = document.getElementById('error');
        errorSpan.innerHTML = "Hubo un error al cargar los gatos favoritos - Error: " + res.status + " " + data.message;
    } else {
        console.log("Favoritos", data);
    }
}

async function saveFavouriteCat() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: '12'
        }),
    })
}

loadRandomCats();
loadFavouritesCats();