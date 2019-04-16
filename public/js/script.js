$(document).ready(function() {
  $("#product-search-result").hide();
  $("#products-table").hide();
  $("#seed-search-result").hide();
  $("#seeds-table").hide();
  
  // Button event listeners for routes:
  // ------------------------------------------------------------------
  // Homepage search and add buttons (first 4):

  // Search buttons have the function from datatables library to render data in the search table
  $("#products-btn").on("click", function (event) {
    event.preventDefault();
    console.log('I clicked here')
    $.get("/api/products", function(res) {
      $("#seed-search-result").hide();
      $("#seeds-table").hide();
      $("#product-search-result").show();
      $("#products-table").show();

      $("#products-table").DataTable({
        // populate data packet into table (use object section from docs)
        data: res.data,
        columns: [
          { data: "id",
            render: function(data, type, row) {
              return '<a href="/update-product/'+data+'">'+data+'</a>';
            }
          },
          { data: "strain" },
          { data: "price" },
          { data: "quantity" },
          { data: "packaging" },
          { data: "size" },
          { data: "thc" }
        ]
      });

    });
  });

  $("#seeds-btn").on("click", function (event) {
    event.preventDefault();
    $.get("/api/seeds", function(res) {
      $("#product-search-result").hide();
      $("#products-table").hide();
      $("#seed-search-result").show();
      $("#seeds-table").show();
      
      $("#seeds-table").DataTable({
        // populate data packet into table (use object section from docs)
        data: res.data,
        columns: [
          { 
            data: "id",
            render: function(data, type, row) {
              return '<a href="/update-seed/'+data+'">'+data+'</a>';
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
  });

  $("#add-product-btn").on("click", function (event) {
    console.log('i got here')
    event.preventDefault();
    // routes to add.handlebars with form to add product
    window.location.assign("/add-product");
    // $.get("/add/product");
  });

  $("#add-seed-btn").on("click", function (event) {
    event.preventDefault();
    // routes to add.handlebars with form to add seed
    window.location.assign("/add-seed");
  });

  // Return to homepage button; used on both update-del pages
  $("#home-btn").on("click", function (event) {
    event.preventDefault();
    // route to home.handlebars
    window.location.assign("/home");
  });

  // ------------------------------------------------------------------
  // Update and delete buttons for item detail pages (next 4):
//==============================================================
// ============================================================
  $("#update-product-btn").on("click", function (event) {

    // window.location.assign("/update-product");
    event.preventDefault();

    app.post("api/update/:product"), function(req,res){
      // let product{};
      product.packaging = req.body.packaging;
      product.size = req.body.size;
      product.thc = req.body.thc;
      product.cbd = req.body.cbd;
      product.type = req.body.type;
      product.strain_type = req.body.strain_type;
      product.genetics = req.body.genetics;
      product.flavor = req.body.flavor;
      product.feelings = req.body.feelings;
      product.alleviates = req.body.alleviates;
      product.comments = req.body.comments;
    }

    let query = {_product:req.params.product}

    Product.update(query, product, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect("/");
      
      }
    });

    // let price = $("#price").val().trim();
    // let quantity = $("#product-quantity").val().trim();
    // // put method ajax call for updating product in database
    // let queryUrl = "/api/update/product/1" 
    // $.ajax(queryUrl, {
    //   type: "PUT"


      // data: {
      //   quantity:quantity,
      //   price: price  
      // } 
  //   }).then(
  //     function () {

  //     }
  //   );
  // });

  $("#update-seed-btn").on("click", function (event) {
    window.location.assign("/update-seed");

    event.preventDefault();
    let quantity = $("#seed-quantity").val().trim();
    // put method ajax call for updating seed in database
    let queryUrl = "/api/seeds/:seedId";
    $.ajax(queryUrl, {
      type: "PUT",
      data: {
        quantity:quantity,
        price: price  
      } 
    }).then(
      function () {

      }
    );
  });

  // =========================================================
  //==========================================================

  // Before running functions for last 2 (delete) buttons: a confirm function!
  function confirmDelete() {
    let deleteCheck = confirm("You are deleting this item from your database.  Are you sure?");
    if (deleteCheck) {
      return true;
    } else {
      return false;
    }
  };

  $("#delete-product-btn").on("click", function (event) {
    event.preventDefault();
    // add confirm before running delete request!!
    if (confirmDelete) {
      // delete method ajax call for updating product in database
      let queryUrl = "#";
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(
        function () {
        }
      );
    };
  });

  $("#delete-seed-btn").on("click", function (event) {
    event.preventDefault();
    // add confirm before running delete request!!
    if (confirmDelete) {
      // delete method ajax call for updating product in database
      let queryUrl = "#";
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(
        function () {

        }
      );
    };
    window.location
  });
});
})
