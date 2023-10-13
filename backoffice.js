//ho provato precedentemente a creare la funzione modifica ma non so perché le altre cose andavano in conflitto quindi nada :)

const address = new URLSearchParams(location.search)
const productId = address.get('eventId')
console.log(productId)

if (productId) {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDJhZDEzOWM0MzAwMTg4MTQ1YjciLCJpYXQiOjE2OTcxODY0NzcsImV4cCI6MTY5ODM5NjA3N30.hZuujHf_b77dfPmoEMyAHf6D_plyV-bQ77ryZnVZ910"
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Errore')
            }
        })
        .then((productDetail) => {

            const nameInput = document.getElementById('name')
            const descriptionInput = document.getElementById('description')
            const brandInput = document.getElementById('brand')
            const UrlImgInput = document.getElementById('imgUrl')
            const priceInput = document.getElementById('price')

            nameInput.value = productDetail.name
            descriptionInput.value = productDetail.description
            brandInput.value = productDetail.brand
            UrlImgInput.value = productDetail.imageUrl
            priceInput.value = productDetail.price
        }
        )
        .catch((err) => {
            console.log('errore', err)
        })
}



const form = document.getElementById('form')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const nameInput = document.getElementById('name')
    const descriptionInput = document.getElementById('description')
    const brandInput = document.getElementById('brand')
    const UrlImgInput = document.getElementById('imgUrl')
    const priceInput = document.getElementById('price')


    const newProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: UrlImgInput.value,
        price: priceInput.value,
    }

    fetch('https://striveschool-api.herokuapp.com/api/product/', {

        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDJhZDEzOWM0MzAwMTg4MTQ1YjciLCJpYXQiOjE2OTcxODY0NzcsImV4cCI6MTY5ODM5NjA3N30.hZuujHf_b77dfPmoEMyAHf6D_plyV-bQ77ryZnVZ910"
        },
    })

        .then((res) => {
            console.log('andato', res)

            if (res.ok) {
                console.log('ok', res)
                if (window.confirm("Vuoi aggiungere il prodotto?")) {
                    location.assign('./index.html')
                }
            }
            else {
                throw new Error
            }
        })
        .catch((err) => {
            console.log('errore', err)
        })
})