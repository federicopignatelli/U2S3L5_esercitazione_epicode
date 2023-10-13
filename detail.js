const address = new URLSearchParams(location.search)
const productId = address.get('productId')


const deleteProduct = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDJhZDEzOWM0MzAwMTg4MTQ1YjciLCJpYXQiOjE2OTcxODY0NzcsImV4cCI6MTY5ODM5NjA3N30.hZuujHf_b77dfPmoEMyAHf6D_plyV-bQ77ryZnVZ910"
        }
    })
        .then((res) => {
            if (res.ok) {
                if (window.confirm("Vuoi davvero cancellare il prodotto?")) {
                    location.assign('./index.html')
                }

                console.log('prodotto eliminato')
            } else {
                throw new Error('errore')
            }
        })
        .catch((err) => {
            console.log('errore', err)
        })
}



const generateProductDetails = function (detail) {
    const row = document.getElementById('product-details')
    row.innerHTML = `
          <div class="col col-12 col-lg-6">
              <img
                src="${detail.imageUrl}"
                class="w-100 my-4"
                alt="product img"
              />
              <h3 class="text-center my-4">${detail.name} - ${detail.brand}</h3>
              <p>
                ${detail.description}
              </p>
              <p>Prezzo: ${detail.price}€</p>
              <button class="btn btn-dark" onclick="deleteProduct()">Elimina</button>
              <button type="button" class="btn btn-secondary">
              <a class="text-white" style="text-decoration: none;" href="./backoffice.html?eventId=${detail._id}">Modifica</a>
              </button>
          </div>
      `// non sono riuscito a far funzionare il bottone modifica
}


const getProductDetails = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDJhZDEzOWM0MzAwMTg4MTQ1YjciLCJpYXQiOjE2OTcxODY0NzcsImV4cCI6MTY5ODM5NjA3N30.hZuujHf_b77dfPmoEMyAHf6D_plyV-bQ77ryZnVZ910"
        }
    })
        .then((res) => {
            if (res.ok) {
                // abbiamo ottenuto i dettagli del singolo evento su cui abbiamo cliccato
                // recuperiamo il suo JSON
                return res.json()
            } else {
                throw new Error('Errore nel caricamento dei dettagli')
            }
        })
        .then((productDetail) => {
            // eventData è UN OGGETTO! sono i singoli dettagli dell'evento, il suo name, il suo price, etc.
            generateProductDetails(productDetail)
        })
        .catch((err) => console.log('ERRORE', err))
}

getProductDetails()