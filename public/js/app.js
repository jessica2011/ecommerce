const begin = () =>{
  const uploadCategories = () =>{
    $.getJSON('https://api.mercadolibre.com/sites/MPE/categories', function(response) {
      let idCategories = [];
      for (let i in response) {
        idCategories = response[i].id;
        // console.log(idCategories);
      }
      response.forEach((elem, i) => {
        const templateCategories = `<a href="/${elem.id}" class="list-group-item list-group-item-action">${elem.name}</a>`;
        $('#list-categories').append(templateCategories);
      });
    });
  };

  const uploadList = (ctx) => {
    $('#box-cards').html('');
    $.getJSON(`https://api.mercadolibre.com/sites/MPE/search?category=${ctx.params.listCategorie}`, function(response) {
      let listCard = response.results;
      console.log(response.results);
      listCard.forEach((elem) => {
        const templateList = `<div class="d-inline-block col-12 col-md-5 col-xl-4">
                                <div class="text-center bg-light mb-3">
                                  <img class="card-img-top img-card" src="${elem.thumbnail}" alt="Card image cap">
                                  <div class="card-body">
                                    <p class="card-title">${elem.title}</p>
                                    <p class="card-title">S/. ${elem.price}</p>                                  
                                    <input class="product btn btn-primary" type="button" precio=${elem.price} titulo=${elem.title} value="comprar"/>
                                  </div>
                                </div>
                              </div>`;
        $('#box-cards').append(templateList);
      });
      addProductsCar();
    });
  };

  let input = $('#searh-input');
  const uploadSearch = () => {
    $('#btn-search').click(function(event) {
      // event.preventDefault();
      $('#box-cards').html('');
      $('#box-cards2').html('');
      $('#carouselExampleSlidesOnly').html('');
      $.getJSON(`https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${input.val()}`, function(response) {
        let listCard = response.results;
        listCard.forEach((elem) => {
          const templateList = `<div class="col-md-4 d-inline-block">
                                 <div class="text-center bg-light mb-3">
                                   <img class="card-img-top img-card" src="${elem.thumbnail}" alt="Card image cap">
                                   <div class="card-body">
                                     <p class="card-title">${elem.title}</p>
                                     <p class="card-title">S/. ${elem.price}</p>                                  
                                     <input class="product btn btn-primary" type="button" precio=${elem.price} titulo=${elem.title} value="comprar"/>
                                   </div>
                                 </div>
                               </div>`;
          $('#box-cards2').append(templateList);
        });
        // input.val('');
        addProductsCar();
      });
    });
  };

  function addProductsCar() {
    paypal.minicart.render({
      strings: {
        button: 'Pagar'
        , buttonAlt: 'Total'
        , subtotal: 'Total:'
        , empty: 'No hay productos en el carrito'
      }
    });
    // Eventos para agregar productos al carrito
  
    $('.product').click(function(event) {
      event.stopPropagation();
      paypal.minicart.cart.add({
        business: 'anacarlavegam-facilitator@gmail.com',
        item_name: $(this).attr('titulo'),
        amount: $(this).attr('precio'),
        currency_code: 'USD',
      });
    });
  };
  
  page('/', uploadCategories);
  page('/:listCategorie', uploadList);
  // page('/:categories/:id', list);
  page('*', function() {
    $('#contente-search').html('No se ha encontrado la búsqueda');
  });
  page();
  uploadList();
  uploadCategories();
};

$(document).ready(begin);


