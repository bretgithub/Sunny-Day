$(document).ready(function() {
  $("#product-search-result").hide();
  $("#products-table").hide();
  $("#seed-search-result").hide();
  $("#seeds-table").hide();

  $.get("/api/products", function(res) {
    $("#products-table").DataTable({
      createdRow: function(row, data, dataIndex) {
        if (data.quantity < 50 && data.quantity > 0) {
          $(row).addClass("addpink");
        } else if (data.quantity <= 0) {
          $(row).addClass("fade");
        }
      },
      // populate data packet into table (use object section from docs)
      data: res.data,
      columns: [
        {
          data: "id",
          render: function(data, type, row) {
            return '<a href="/update-product/' + data + '">' + data + "</a>";
          }
        },
        { data: "strain" },
        {
          data: 'price',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        },
        { data: "quantity" },
        { data: "packaging" },
        { data: "size" },
        { data: "thc" }
      ]
    });
  });

  $.get("/api/seeds", function(res) {
    $("#seeds-table").DataTable({
      // adding red to row if qty is low
      createdRow: function(row, data, dataIndex) {
        if (data.quantity < 6 && data.quantity > 0) {
          $(row).addClass("addpink");
        } else if (data.quantity <= 0) {
          $(row).addClass("fade");
        }
      },
      // populate data packet into table (use object section from docs)
      data: res.data,
      columns: [
        {
          data: "id",
          render: function(data, type, row) {
            return '<a href="/update-seed/' + data + '">' + data + "</a>";
          }
        },
        { data: "strain" },
        { data: "type" },
        { data: "quantity" },
        { data: "thc" },
        { data: "cbd" }
      ]
    });
  });
  // Button event listeners for routes:
  // ------------------------------------------------------------------
  // Homepage search and add buttons (first 4):

  // Search buttons have the function from datatables library to render data in the search table
  $("#products-btn").on("click", function(event) {
    event.preventDefault();
    $("#seed-search-result").hide();
    $("#seeds-table").hide();
    $("#product-search-result").show();
    $("#products-table").show();
  });

  $("#seeds-btn").on("click", function(event) {
    event.preventDefault();
    $("#product-search-result").hide();
    $("#products-table").hide();
    $("#seed-search-result").show();
    $("#seeds-table").show();
  });

  $("#add-product-btn").on("click", function(event) {
    console.log("i got here");
    event.preventDefault();
    // routes to add.handlebars with form to add product
    window.location.assign("/add-product");
    // $.get("/add/product");
  });

  $("#add-seed-btn").on("click", function(event) {
    event.preventDefault();
    // routes to add.handlebars with form to add seed
    window.location.assign("/add-seed");
  });

  // Return to homepage button; used on both update-del pages
  $(".home-btn").on("click", function (event) {
    event.preventDefault();
    // route to home.handlebars
    window.location.assign("/home");
  });

  // ------------------------------------------------------------------
  // Update  buttons for item detail pages
//==============================================================
// ============================================================
    //Adding event listeners
  $(document).on("click", "#update-product-btn", editProd)
      // event.preventDefault();

    function editProd() {
    
    let price = $('#price').val();
    let quantity = $('#product-quantity').val();    
    let id = $(this).data("id");
    
    let queryUrl = `/api/products/${id}`;
  
    console.log ("price= ", price)
    console.log ("quantity= ", quantity);
    console.log ("ID: ", id);


    $.ajax(queryUrl, {
      method: "PUT",
      data: {
        price:price,
        quantity:quantity
      },
    }).then(window.location.href="/home");
  };

    
//===============================================================

$(document).on("click", "#update-seed-btn", editSeed)

    function editSeed() {
    
    let quantity = $('#seed-quantity').val();    
    let id = $(this).data("id");
    
    let queryUrl = `/api/seeds/${id}`;
  
    console.log ("quantity= ", quantity);
    console.log ("ID: ", id);

    $.ajax(queryUrl, {
      method: "PUT",
      data: {
        quantity:quantity
      },
    }).then(window.location.href="/home");
  };
 

  // =========================================================
  //  Delete buttons
  //==========================================================

  // Before running functions for last 2 (delete) buttons: a confirm function!
  function confirmDelete() {
    let deleteCheck = confirm(
      "You are deleting this item from your database.  Are you sure?"
    );
    if (deleteCheck) {
      return true;
    } else {
      return false;
    }
  }

  $("#delete-product-btn").on("click", function(event) {
    event.preventDefault();
    let id = $(this).data("id");
    // add confirm before running delete request!!
    if (confirmDelete()) {
      // delete method ajax call for updating product in database
      let queryUrl = "/api/products/" + id;
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(window.location.href="/home");
    };
  });

  $("#delete-seed-btn").on("click", function(event) {
    event.preventDefault();
    let id = $(this).data("id");
    // add confirm before running delete request!!
    if (confirmDelete()) {
      // delete method ajax call for updating product in database
      let queryUrl = "/api/seeds/" + id;
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(window.location.href="/home");
    };
  });
});
