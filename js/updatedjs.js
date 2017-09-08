// Write the jQuery required to add packs to the orders table and update the subtotal
$(document).ready(() => {
  //cart starts as empty array
  let cart = []

  // $('.card .btn').click((event) => {
  $('.addbtn').click((event) => {
    //this is so the page doesn't fly up to the top
    event.preventDefault()
    let card = $(event.target).parent().parent()
    let price = card.find('.price').text()
    let title = card.find('.card-title').text()
    var item = {
      price,
      title
    }
    addToCart(item)


  })

  //remove from cart
  $('#orders').click('.remove', function(event) {
    let title = $(event.target).data("title")
    removeFromCart(title)
  })

//open modal
$('.modal-trigger').leanModal();


  function removeFromCart(title) {
    let existingItem = findInCart(title)
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
    }
    renderCart()
  }

  function addToCart(item) {
    // console.log("item is ", item)
    let existingItem = findInCart(item.title)
    if (existingItem) {
      existingItem.quantity++
    } else {
      item.quantity = 1
      cart.push(item)
    }
    //  console.log('cart', cart)
    renderCart()
  }

  function findInCart(title) {
    let existingItem = null
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingItem = cart[i]
      }
    }
    return existingItem
  }

  function renderCart() {
    // find table
    let tbody = $('#orders tbody')

    // clear out all order data
    tbody.children().remove()

    // re-render tbody
    let subtotal = 0
    for (item of cart) {
      let price = parsePrice(item.price)

      tbody.append(`<tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>${formatPrice(price)}</td>
        <td><a class="btn btn-primary remove-item" data-title="${item.title}">Remove</a></td>
      </tr>`)

      subtotal += price * item.quantity;

      var tax = subtotal * 0.08;
      var total = subtotal + tax;
      // console.log(total)
    }

    // do calculate
    // console.log("subtotal", subtotal)
    $('#subtotal').text(formatPrice(subtotal))
    $('#tax').text(formatPrice(tax))
    $('#total').text(formatPrice(total))
  }

  function parsePrice(price) {
    return parseFloat(price.replace(/\$/, ''))
  }

  function formatPrice(price) {
    // console.log("formatPrice price is", price)
    return '$' + price.toFixed(2)
  }

  // $('.modal').modal({
  //   ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
  //     alert("Ready");
  //     console.log(modal, trigger);
  //   },
  //   complete: function() {
  //     alert('Closed');
  //   } // Callback for Modal close
  // })



})
