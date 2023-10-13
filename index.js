const renderProduct = function (everyProduct) {
    const row = document.getElementById('row')

    everyProduct.forEach(product => {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')

        newCol.innerHTML = `
    <div class="card mb-4">
        <img src="${product.imageUrl}" class="card-img-top" alt="product picture">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.brand}</p>
            <p class="card-text">${product.price}€</p>
            <a href="./detail.html?productId=${product._id}" class="btn btn-dark">Scopri di più</a>
        </div>
    </div>
    `

        row.appendChild(newCol)
    })
}

const hideSpinner = function () {
    const spinner = document.getElementById('spin')
    spinner.classList.add('d-none')
}


const getProduct = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDJhZDEzOWM0MzAwMTg4MTQ1YjciLCJpYXQiOjE2OTcxODY0NzcsImV4cCI6MTY5ODM5NjA3N30.hZuujHf_b77dfPmoEMyAHf6D_plyV-bQ77ryZnVZ910"
        }
    })
        .then((res) => {
            hideSpinner()

            console.log('ok', res)
            if (res.ok) {
                return res.json()
            }
            else {
                throw new Error('ce un errore')
            }
        })
        .then(product => {
            console.log('events', product)
            renderProduct(product)
        })

        .catch(err => {
            console.log('err', err)
            hideSpinner()
        })
}

getProduct()



