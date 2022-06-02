// console.log("Hola");

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=e5d342a6-0a3e-45b0-af35-692a7a700d6a";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?limit=100&api_key=e5d342a6-0a3e-45b0-af35-692a7a700d6a";

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
        const btn1 = document.getElementById('btn-add-favourites-1');
        btn1.onclick = () => saveFavouriteCat(data[0].id);

        const img2 = document.getElementById('img2');
        img2.src = data[1].url;
        const btn2 = document.getElementById('btn-add-favourites-2');
        btn2.onclick = () => saveFavouriteCat(data[1].id);

        // console.log('Botton 2: ', btn2);
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
        data.forEach(cat => {
            const section = document.getElementById('favourites-cats-grid');

            const article = document.createElement('article');
            article.classList.add('card', 'favourite-card');

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = cat.image.url;
            figure.appendChild(img);

            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-remove');
            const btnText = document.createTextNode('Quitar de los favoritos');
            btn.appendChild(btnText);

            article.appendChild(figure, btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteCat(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    const data = await res.json();
    if (res.status !== 200) {
        let errorSpan = document.getElementById('error');
        errorSpan.innerHTML = "Hubo un error al guardar el gato - Error: " + res.status + " " + data.message;
    }
    console.log('Respuesta: ', data.message);
}

loadRandomCats();
loadFavouritesCats();