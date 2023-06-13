fetch('./data/shoes.json')
    .then(response => response.json())
    .then(data => {
        const shoes = data.shoes;
        const shoeContainer = document.getElementById('display-product');
        const cart = document.querySelector('.cart');


        shoes.forEach(shoe => {
            const shoeDiv = document.createElement('div');
            shoeDiv.classList.add('shoe-item');

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('shoe-backgr');
            imageDiv.style.backgroundColor = shoe.color;
            imageDiv.style.borderRadius = '5%';

            const image = document.createElement('img');
            image.src = shoe.image;
            image.alt = shoe.name;
            image.classList.add('shoe-image');
            imageDiv.appendChild(image)

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
                        <img class="symbol" src="./assets/check.png" alt="Symbol" style="display: none">
                    </div>
                </div>
            `
            const rev1 = document.createElement('div')
            rev1.innerHTML = rev

            shoeDiv.appendChild(imageDiv);
            shoeDiv.appendChild(name);
            shoeDiv.appendChild(description);
            shoeDiv.appendChild(rev1);

            shoeContainer.appendChild(shoeDiv);

            const addToCartButton = shoeDiv.querySelector('.add-to-cart');
            const symbol = shoeDiv.querySelector('.symbol');
            const note = document.querySelector('#note');



            addToCartButton.addEventListener('click', () => {
                addToCartButton.style.display = 'none';
                symbol.style.display = 'block';
                note.style.display = 'none';

                const rev2 = `
                <div class="cart-container">
                    <div class="cart-item">
                        <div class="wrap-bg" style="background-color:${shoe.color}">
                            <div class="item-image">
                                <img src="${shoe.image}">
                            </div>
                        </div>
                        <div class="cart-description">
                            <h3>${shoe.name}</h3>
                            <div class="item-price">$${shoe.price}</div>
                        </div>
                    </div>
                    <div class="quantity-container">
                        <div class="quantity-buttons">
                            <button class="quantity-btn decrease-btn">
                                <img class="cart-symbol" src="./assets/minus.png" alt="Symbol" style="display: block">
                            </button>
                            <div class="quantity-value" data-quantity="1">
                                1
                            </div>
                            <button class="quantity-btn increase-btn">
                                <img class="cart-symbol" src="./assets/plus.png" alt="Symbol" style="display: block">
                            </button>
                            <button class="remove-item">
                                <img class="cart-symbol" src="./assets/trash.png" alt="Symbol" style="display: block">
                            </button>
                        </div>
                    </div>
                </div>
                `



                // cart.appendChild(shoeCartItem);
                cart.innerHTML += rev2;

                Change();

                // cartLsit.appendChild(cartDetail);
                // Update the total value of the cart
                const totalElement = document.querySelector('.total');
                const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
                const newTotal = currentTotal + shoe.price;
                totalElement.textContent = '$' + newTotal.toFixed(2);
            });


        });

    })
    .catch(error => {
        console.error('Error:', error);
    });

function Change() {
    const decreaseBtn = document.querySelectorAll('.decrease-btn');
    const increaseBtn = document.querySelectorAll('.increase-btn');
    const removeBtns = document.querySelectorAll('.remove-item');

    const addToCartButton = shoeDiv.querySelector('.add-to-cart');
    const symbol = shoeDiv.querySelector('.symbol');
    const note = document.querySelector('#note');

    decreaseBtn.forEach(desc => {
        desc.addEventListener('click', () => {
            const quantityValueElement = desc.parentElement.querySelector('.quantity-value');
            let quantity = parseInt(quantityValueElement.dataset.quantity);
            if (quantity > 1) {
                quantity--;
                quantityValueElement.dataset.quantity = quantity;
                quantityValueElement.textContent = quantity.toString();

                const itemPrice = parseFloat(desc.closest('.cart-item').querySelector('.item-price').textContent.replace('$', ''));
                updateTotal(-itemPrice); // Decrease the total by itemPrice
            }
        });
    });

    increaseBtn.forEach(insc => {
        insc.addEventListener('click', () => {
            const quantityValueElement = insc.parentElement.querySelector('.quantity-value');
            let quantity = parseInt(quantityValueElement.dataset.quantity);
            quantity++;
            quantityValueElement.dataset.quantity = quantity;
            quantityValueElement.textContent = quantity.toString();

            const itemPrice = parseFloat(insc.closest('.cart-item').querySelector('.item-price').textContent.replace('$', ''));
            updateTotal(itemPrice); // Increase the total by itemPrice
        });
    });

    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            addToCartButton.style.display = 'block';
            symbol.style.display = 'none';
            note.style.display = 'none';

            const cartItem = removeBtn.closest('.cart-item');
            const itemPrice = parseFloat(cartItem.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(cartItem.querySelector('.quantity-value').dataset.quantity);
            const totalPrice = itemPrice * quantity;

            cartItem.remove();
            updateTotal(-totalPrice); // Decrease the total by totalPrice
        });
    });
}

function updateTotal(price) {
    const totalElement = document.querySelector('.total');
    const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
    const newTotal = currentTotal + price;
    totalElement.textContent = '$' + newTotal.toFixed(2);
}