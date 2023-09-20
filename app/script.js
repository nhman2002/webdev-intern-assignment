fetch('./data/shoes.json')
    .then(response => response.json())
    .then(data => {
        const shoes = data.shoes;
        const shoeContainer = document.getElementById('display-product');
        const cart = document.querySelector('.cart');

        function createCartItemHTML(shoe) {
            return `
            <div class="cart-container">
                <div class="cart-item">
                    <div class="wrap-bg" style="background-color:${shoe.color}">
                        <div class="item-image">
                            <img src="${shoe.image}">
                        </div>
                    </div>
                    <div class="cart-description">
                        <h3>${shoe.name}</h3>
                        <div class="item-price" style="font-weight: 600">$${shoe.price}</div>
                    </div>
                </div>
                <div class="quantity-container">
                    <div class="quantity-buttons">
                        <button class="quantity-btn decrease-btn">
                            <img class="cart-symbol" src="./assets/minus.png" alt="Symbol" style="display: block">
                        </button>
                        <div class="quantity-value" data-quantity="${shoe.quantity || 1}">
                            ${shoe.quantity || 1}
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
            `;
        }


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

                const cartItemHTML = createCartItemHTML(shoe);
                cart.innerHTML += cartItemHTML;

                const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

                // Check if the item already exists in the cart by its name
                const existingItem = cartItems.find(item => item.name === shoe.name);

                if (!existingItem) {
                    // If it doesn't exist, add it to the cart with a quantity of 1
                    shoe.quantity = 1;
                    cartItems.push(shoe);
                }

                // Update local storage with the updated cartItems
                localStorage.setItem('cart', JSON.stringify(cartItems));



                // // cart.appendChild(shoeCartItem);
                // cart.innerHTML += rev2;


                // Update the total value of the cart
                const totalElement = document.querySelector('.total');
                const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
                const newTotal = currentTotal + shoe.price;
                totalElement.textContent = '$' + newTotal.toFixed(2);
                Change()


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
                        const cartContainer = desc.closest('.cart-container');

                        let quantity = parseInt(quantityValueElement.dataset.quantity);
                        if (quantity > 1) {
                            quantity--;
                            quantityValueElement.dataset.quantity = quantity;
                            quantityValueElement.textContent = quantity.toString();

                            const itemPrice = parseFloat(cartContainer.querySelector('.item-price').textContent.replace('$', ''));

                            // Calculate the new total price for the item based on the updated quantity and item price
                            updateTotal(-itemPrice); // Decrease the total by itemPrice
                        }
                    });
                });

                increaseBtn.forEach(insc => {
                    insc.addEventListener('click', () => {
                        const quantityValueElement = insc.parentElement.querySelector('.quantity-value');
                        const cartContainer = insc.closest('.cart-container');
                        let quantity = parseInt(quantityValueElement.dataset.quantity);
                        quantity++;
                        quantityValueElement.dataset.quantity = quantity;
                        quantityValueElement.textContent = quantity.toString();

                        // Calculate the new total price for the item based on the updated quantity and shoe price
                        const itemPrice = parseFloat(cartContainer.querySelector('.item-price').textContent.replace('$', ''));

                        // Calculate the new total price for the item based on the updated quantity and item price
                        const newTotalPrice = itemPrice;

                        // Update the total price
                        updateTotal(newTotalPrice);
                    });
                });

                removeBtns.forEach(removeBtn => {
                    removeBtn.addEventListener('click', () => {
                        addToCartButton.style.display = 'block';
                        symbol.style.display = 'none';
                        note.style.display = 'none';

                        const cartContainer = removeBtn.closest('.cart-container');
                        cartContainer.style.display = 'none';


                        const itemPrice = parseFloat(cartContainer.querySelector('.item-price').textContent.replace('$', ''));
                        const quantity = parseInt(cartContainer.querySelector('.quantity-value').dataset.quantity);

                        // Calculate the total price for the removed item
                        const totalPrice = itemPrice * quantity;

                        // Update the total price displayed in .total
                        updateTotal(-totalPrice);

                        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                        const itemname = cartContainer.querySelectorAll('h3')

                        // Find the index of the item you want to remove
                        const itemIndex = cartItems.findIndex(item => item.name === itemname);

                        // Remove the item from the array if it exists
                        if (itemIndex !== -1) {
                            cartItems.splice(itemIndex, 1);
                            localStorage.setItem('cart', JSON.stringify(cartItems));
                        }
                    });
                });
            }
            // function updateTotal(price) {
            //     const totalElement = document.querySelector('.total');
            //     const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
            //     const newTotal = currentTotal + price;
            //     totalElement.textContent = '$' + newTotal.toFixed(2);
            // }
            // updateCartUI()






        });

        function updateCartUI() {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            



            cart.innerHTML = '';

            cartItems.forEach(shoe => {


                // Create the cart item HTML and append it to the cart
                const cartItemHTML = createCartItemHTML(shoe);
                cart.innerHTML += cartItemHTML;
                // cart.appendChild(cartItem);
                // console.log(shoe.name)
                // updateTotal(shoe.price * shoe.quantity)
            });

            const totalQuantity = calculateTotalQuantity(cartItems);
            console.log(parseInt(totalQuantity));
            updateTotal(parseInt(totalQuantity));
            Change()
        }

        // window.addEventListener('load', () => {
        //     updateCartUI();
        // });

        function calculateTotalQuantity(cartItems) {
            let totalQuantity = 0;
            cartItems.forEach(item => {
                totalQuantity += item.quantity || 0;
            });
            return totalQuantity;
        }
        function updateTotal(price) {
            const totalElement = document.querySelector('.total');
            const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
            const newTotal = currentTotal + price;
            totalElement.textContent = '$' + newTotal.toFixed(2);
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });

