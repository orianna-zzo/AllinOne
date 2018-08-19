(function( $ ) {
    'use strict';

        // Animations init
        new WOW().init();

        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
      });

      // MDB Lightbox Init
      $(function () {
          $("#mdb-lightbox-ui").load("/wp-content/themes/mdbootstrap4/mdb-addons/mdb-lightbox-ui.html");
      });

      $(document).ready(function () {
          $("#license").addClass("mdb-select price-select");
          // $("#billing_country").addClass("mdb-select");
          $('.mdb-select').material_select();
          $("#license").hide();
          // $("#billing_country").hide();
      });

      // SideNav init
      $(".button-collapse").sideNav();
      var el = document.querySelector('.custom-scrollbar');
      Ps.initialize(el);

      $('body').scrollspy({
          target: '#scrollspy'
      })

      $(function () {
          $(".sticky").sticky({
              topSpacing: 90,
              zIndex: 2,
              stopper: "#footer"
          });
      });

      // Initialize material select for Contact Form
      $('#contactForm').on('show.bs.modal', function() {
          $('.wpcf7-select').material_select('destroy');
          $('.wpcf7-select').material_select();
      });

      // Destroy material select on modal close to prevent duplicates
      $('#contactForm').on('hide.bs.modal', function() {
           $('.wpcf7-select').material_select('destroy');
      });

      //Remove unsupported credit card
      // jQuery("img[src*='amex']").remove();

      // Remove dynamic content panel
      $("#dynamicContentWrapper-docsPanel").on("click", ".dc-panel-remove", function (e) {
          $("#dynamicContentWrapper-docsPanel").remove();
      });


      $("div[class*='woocommerce-MyAccount']").on("click", "#get-invoice-request", function(e){
        e.preventDefault();

        var self = $(this);

        var desination = $(this).attr("href");

        var orderId = $(this).attr("data-order-id");
        var data = {
            action: "requestInvoice",
            order_id: orderId
        };

        $.ajax({
            url: mdw_search_object.ajaxurl,
            method: "POST",
            data: data
        }).done(function(response){
            console.log(response);
            response = JSON.parse(response);

            if(response.status == "sent"){
                $("p", self).text(response.message);
            } else {
                window.location.replace(desination);
            }

        }).fail(function(err){
            console.log(err);
        });
      });

      $("div[class*='woocommerce-MyAccount']").on("click", "table #confirm-invoice", function(e){
        e.preventDefault();

        var self = $(this);

        self.html("<i class='fa fa-spinner fa-spin'></i> Processing...");

        var orderId = $(this).attr("data-order-id");
        var data = {
            action: "approveInvoiceRequest",
            order_id: orderId
        };

        $.ajax({
            url: mdw_search_object.ajaxurl,
            method: "POST",
            data: data
        }).done(function(response){
            console.log(response);

            self.html("<i class='fa fa-check'></i> Done").attr("class", "btn btn-success");
        }).fail(function(err){
            console.log(err);

            try {

              err = JSON.stringify(err);
            } catch (ex) {}

            self.html("<i class='fa fa-times'></i> Error").attr("class", "btn btn-danger");
            self.after("<b>Error:</b> " + err);
        });
      });

        $("#invoice-forms").on("click", function(e){
            e.preventDefault();

            $("nav[class*='woocommerce-MyAccount'] ul li").each(function(){
                $(this).removeClass("is-active");
            });

            $(this).parent().addClass("is-active");

            $(".woocommerce div[class*='woocommerce-MyAccount']").html( "<table></table>" );
            var invoiceRequestTable = $(".woocommerce div[class*='woocommerce-MyAccount'] table");

            invoiceRequestTable.attr("class", "shop_table shop_table_responsive");

            var thead = "<thead>" +
                            "<tr>" +
                                '<th><input placeholder="Order ID" id="toEditOrderIdInput" type="number" value=""></input><a id="confirm-edited-invoice" class="btn btn-primary" href="#">Confirm</a><a id="confirm-new-invoice" class="btn btn-primary" href="#">Blank</a></th>' +
                            "</tr>" +
                        "</thead>";
            var tbody = "<tbody>";
                tbody += "<tr><td>No new requests.</td><td></td></tr>";
                tbody += "</tbody>";

            invoiceRequestTable.append( thead );
            invoiceRequestTable.append( tbody );

        });

        $("div[class*='woocommerce-MyAccount']").on("click", "table #confirm-edited-invoice", function(e){
            e.preventDefault();
            var order_id = $('#toEditOrderIdInput').val();
            var data = {
                action: "getInvoiceRequestForm",
                order_id: order_id
            };

            $.ajax({
                url: mdw_search_object.ajaxurl,
                method: "POST",
                data: data
            }).done(function(response){
                response = JSON.parse(response);
                console.log(response);

                var requests = response.requests;

                var billing_invoice_checkbox = requests.meta_data.filter(function(o){ return o.key == '_billing_invoice_checkbox'});
                var billing_euvat_checkbox = requests.meta_data.filter(function(o){ return o.key == '_billing_euvat_checkbox'});
                var billing_euvat_val_checkbox = requests.meta_data.filter(function(o){ return o.key == '_billing_euvat_val_checkbox'});
                var billing_vat = requests.meta_data.filter(function(o){ return o.key == '_billing_vat'});
                var invoiceRequestForm = $("table.shop_table.shop_table_responsive tbody");

                var tbody = "<tr><td id='invoiceDataToInsert'><p><label for='invoice_id'>Order ID</label><input value='"+requests.id+"' type='text' name='invoice_id' id='invoice_id' /></p>";
                    tbody += "<p><label for='billing_invoice_checkbox'>billing_invoice_checkbox</label><input value='"+billing_invoice_checkbox[0].value+"' type='text' name='billing_invoice_checkbox' id='billing_invoice_checkbox' /></p>"
                    tbody += "<p><label for='billing_euvat_checkbox'>billing_euvat_checkbox</label><input value='"+billing_euvat_checkbox[0].value+"' type='text' name='billing_euvat_checkbox' id='billing_euvat_checkbox' /></p>"
                    tbody += "<p><label for='billing_euvat_val_checkbox'>billing_euvat_val_checkbox</label><input value='"+billing_euvat_val_checkbox[0].value+"' type='text' name='billing_euvat_val_checkbox' id='billing_euvat_val_checkbox' /></p>"
                    tbody += "<p><label for='payment_method'>payment_method</label><input value='"+requests.payment_method+"' type='text' name='payment_method' id='payment_method' /></p>"

                    tbody += "<p><label for='billing_vat'>billing_vat</label><input value='"+billing_vat[0].value+"' type='text' name='billing_vat' id='billing_vat' /></p>"
                    tbody += "<p><label for='billing_company'>billing_company</label><input value='"+requests.billing.company+"' type='text' name='billing_company' id='billing_company' /></p>"
                    tbody += "<p><label for='billing_address_1'>billing_address_1</label><input value='"+requests.billing.address_1+"' type='text' name='billing_address_1' id='billing_address_1' /></p>"
                    tbody += "<p><label for='billing_address_2'>billing_address_2</label><input value='"+requests.billing.address_2+"' type='text' name='billing_address_2' id='billing_address_2' /></p>"
                    tbody += "<p><label for='billing_city'>billing_city</label><input value='"+requests.billing.city+"' type='text' name='billing_city' id='billing_city' /></p>"
                    tbody += "<p><label for='customer_id'>customer_id</label><input value='"+requests.customer_id+"' type='text' name='customer_id' id='customer_id' /></p>"
                    tbody += "<a id='save-edited-invoice' class='btn btn-primary' href='#'>Save</a></td></tr>";

                invoiceRequestForm.empty();
                invoiceRequestForm.append( tbody );
            }).fail(function(err){
                console.log(err);
            });
        });

        $("div[class*='woocommerce-MyAccount']").on("click", "table #confirm-new-invoice", function(e){
            e.preventDefault();

            var invoiceRequestForm = $("table.shop_table.shop_table_responsive tbody");

            var tbody = "<tr><td id='invoiceDataToInsert'><p><label for='invoice_id'>Order ID</label><input disabled value='new order' type='text' name='invoice_id' id='invoice_id' /></p>";
                tbody += "<p><label for='billing_invoice_checkbox'>billing_invoice_checkbox</label><input value='' type='text' name='billing_invoice_checkbox' id='billing_invoice_checkbox' /></p>"
                tbody += "<p><label for='billing_euvat_checkbox'>billing_euvat_checkbox</label><input value='' type='text' name='billing_euvat_checkbox' id='billing_euvat_checkbox' /></p>"
                tbody += "<p><label for='billing_euvat_val_checkbox'>billing_euvat_val_checkbox</label><input value='' type='text' name='billing_euvat_val_checkbox' id='billing_euvat_val_checkbox' /></p>"
                tbody += "<p><label for='payment_method'>payment_method</label><input value='' type='text' name='payment_method' id='payment_method' /></p>"

                tbody += "<p><label for='billing_vat'>billing_vat</label><input value='' type='text' name='billing_vat' id='billing_vat' /></p>"
                tbody += "<p><label for='billing_company'>billing_company</label><input value='' type='text' name='billing_company' id='billing_company' /></p>"
                tbody += "<p><label for='billing_address_1'>billing_address_1</label><input value='' type='text' name='billing_address_1' id='billing_address_1' /></p>"
                tbody += "<p><label for='billing_address_2'>billing_address_2</label><input value='' type='text' name='billing_address_2' id='billing_address_2' /></p>"
                tbody += "<p><label for='billing_city'>billing_city</label><input value='' type='text' name='billing_city' id='billing_city' /></p>"
                tbody += "<p><label for='customer_id'>customer_id</label><input value='' type='text' name='customer_id' id='customer_id' /></p>"
                tbody += "<a id='save-edited-invoice' class='btn btn-primary' href='#'>Save</a></td></tr>";

            invoiceRequestForm.empty();
            invoiceRequestForm.append( tbody );
        });

        $("div[class*='woocommerce-MyAccount']").on("click", "table #save-edited-invoice", function(e){
            e.preventDefault();

            var new_order_meta_data = {
                _billing_invoice_checkbox: $('#billing_invoice_checkbox').val(),
                _billing_euvat_checkbox: $('#billing_euvat_checkbox').val(),
                _billing_euvat_val_checkbox: $('#billing_euvat_val_checkbox').val(),
                _billing_vat: $('#billing_vat').val()
            }
            var order_data = {
                payment_method: $('#payment_method').val(),
                billing_address_1: $('#billing_address_1').val(),
                billing_address_2: $('#billing_address_2').val(),
                billing_city: $('#billing_city').val(),
                billing_company: $('#billing_company').val()
            }
            var order_id = $('#invoice_id').val();
            var data = {
                action: "saveNewOrEditedOrder",
                order_id: order_id,
                new_order_meta_data : new_order_meta_data,
                order_data : order_data
            };

            $.ajax({
                url: mdw_search_object.ajaxurl,
                method: "POST",
                data: data
            }).done(function(response){
                response = JSON.parse(response);
                console.log(response);
                var invoiceRequestForm = $("table.shop_table.shop_table_responsive tbody");
                invoiceRequestForm.empty();
            }).fail(function(err){
                console.log(err);
            });

        })


      $("#invoice-requests-list").on("click", function(e){
        e.preventDefault();

        $("nav[class*='woocommerce-MyAccount'] ul li").each(function(){
            $(this).removeClass("is-active");
        });

        $(this).parent().addClass("is-active");

        var data = {
            action: "getInvoiceRequests"
        };

        $.ajax({
            url: mdw_search_object.ajaxurl,
            method: "POST",
            data: data
        }).done(function(response){
            response = JSON.parse(response);
            console.log(response);

            var requests = response.requests;

            $(".woocommerce div[class*='woocommerce-MyAccount']").html( "<table></table>" );
            var invoiceRequestsListTable = $(".woocommerce div[class*='woocommerce-MyAccount'] table");

            invoiceRequestsListTable.attr("class", "shop_table shop_table_responsive");

            var thead = "<thead>" +
                            "<tr>" +
                                "<th>Order</th>" +
                                "<th>Actions</th>" +
                            "</tr>" +
                        "</thead>";


            var tbody = "<tbody>";

            if(requests.length === 0){
                tbody += "<tr><td>No new requests.</td><td></td></tr>";
            } else {
                for(var i = 0; i < requests.length; i++) {
                    var order = requests[i];

                    tbody += "<tr>" +
                                "<td>" +
                                    "<ul style='list-style-type:none;'>" +
                                        "<li><b>Order ID:</b> " + order.order_id + "</li>" +
                                        "<li><b>Invoice Date:</b> " + order.invoice_date + "</li>" +
                                        "<li><b>VAT Number:</b> " + order.vat_number + "</li>" +
                                        "<li><b>Buyer Name:</b> " + order.buyer_name + "</li>" +
                                        "<li><b>Country:</b> " + order.country + "</li>" +
                                        "<li><b>Tax:</b> " + order.tax + "</li>" +
                                        "<li><b>Netto:</b> " + order.netto + "</li>" +
                                        "<li><b>Brutto:</b> " + order.brutto + "</li>" +
                                        "<li><b>EU:</b> " + order.eu_valid + "</li>" +
                                    "</ul>" +
                                "</td>" +
                                "<td>" +
                                    "<a id='confirm-invoice' class='btn btn-primary' data-order-id='" + order.order_id + "' href='#'>Confirm</a>" +
                                "</td>" +
                             "</tr>";
                }
            }


            tbody += "</tbody>";

            invoiceRequestsListTable.append( thead );
            invoiceRequestsListTable.append( tbody );

        }).fail(function(err){
            console.log(err);
        });
      });

      var commentsCounter = $('span.counter');
      commentsCounter.each(function(){
          if($(this).text() === 0 || $(this).text()===''){
              $(this).css('display', 'none');
          }
      })

    function init_media() {
        var vidDefer = document.getElementsByTagName('iframe');
        for (var i=0; i<vidDefer.length; i++) {
            if(vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
            }
        }
        // var imgDefer = document.getElementsByTagName('img');
        // for (var i=0; i<imgDefer.length; i++) {
        //     if(imgDefer[i].getAttribute('data-src')) {
        //     imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
        //     }
        // }
    }
    window.onload = init_media;

    //HIDE PAYPAL PAYMENT FOR INDIA

    function hidePayPalPaymentMethod(){
        $('li.wc_payment_method.payment_method_paypal').ready(function(e){
            $('li.wc_payment_method.payment_method_paypal').hide();
            setTimeout(function() {
                hidePayPalPaymentMethod();
            }, 0);
        })
    }
    var path = window.location.pathname;
    if(path === '/checkout/'){
        console.log($('#billing_country').val());
        if($('#billing_country').val() === 'IN'){
            setTimeout(function() {
                hidePayPalPaymentMethod();
            }, 0);
        }
        $('#billing_country').on('change', function() {
            if($('#billing_country').val() === 'IN'){
                setTimeout(function() {
                    hidePayPalPaymentMethod();
                }, 0);
            } else {
                $('li.wc_payment_method.payment_method_paypal').show();
            }
        })
    }

      get_social_counts();


})( jQuery );
