fetch('./data/shoes.json')
    .then(response => response.json())
    .then(data => {
        const shoes = data.shoes;
        const shoeContainer = document.getElementById('display-product');

        shoes.forEach(shoe => {
            const shoeDiv = document.createElement('div');
            shoeDiv.classList.add('shoe-item');

            const image = document.createElement('img');
            image.src = shoe.image;
            image.alt = shoe.name;
            image.style.backgroundColor = shoe.color;
            image.classList.add('shoe-image');

            const name = document.createElement('h3');
            name.textContent = shoe.name;

            const description = document.createElement('p');
            description.textContent = shoe.description;
            description.classList.add('shoe-des');

            const rev = `
                <div class="buy_item">
                    <div class="shoe-price"> Price: $${shoe.price} </div>
                    <div class="buy_btn">
                        <p class="add-to-cart"> ADD TO CART </p>
                        <img class="symbol" src="./assets/check.png" alt="Symbol" style="display: none;">
                    </div>
                </div>
            `
            const rev1 = document.createElement('div')
            rev1.innerHTML = rev
            
            const addToCart = rev1.querySelector('.add-to-cart');
            const symbol = rev1.querySelector('.symbol');
            
            addToCart.addEventListener('click', () => {
                addToCart.style.display = 'none';
                symbol.style.display = 'block';
                // symbol.style.boxSizing = 'border-box';
                // symbol.style.height = '46px';
                // symbol.style.minWidth = '46px';
            });
            
            symbol.addEventListener('click', () => {
                addToCart.style.display = 'block';
                symbol.style.display = 'none';
            });

            shoeDiv.appendChild(image);
            shoeDiv.appendChild(name);
            shoeDiv.appendChild(description);
            shoeDiv.appendChild(rev1);

            shoeContainer.appendChild(shoeDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });