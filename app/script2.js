function updateCartUI(addToCartButton,symbol,note) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // const cart = document.querySelector('.cart');
 


    cart.innerHTML = '';

    cartItems.forEach(shoe => {
        addToCartButton.style.display = 'none';
        symbol.style.display = 'block';
        note.style.display = 'none';

        // Create the cart item HTML and append it to the cart
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
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
        `;
        cart.appendChild(cartItem);
        // console.log(shoe.name)
        // updateTotal(shoe.price * shoe.quantity)
    });

    const totalQuantity = calculateTotalQuantity(cartItems);
    console.log(totalQuantity)
    updateTotal(shoe.price * totalQuantity)

}

window.addEventListener('load', () => {
    updateCartUI();
});

function calculateTotalQuantity(cartItems) {
    let totalQuantity = 0;
    cartItems.forEach(item => {
        totalQuantity += item.quantity || 0;
    });
    return totalQuantity;
}