var handlebars = require('handlebars');
var _ = require('underscore');
var $ = require('jquery');


  //(url: String, callback: Function) -> undefined

  //Execute a callback function with the JSON results from the url specified.

  //Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=clemson+tigers&includes=Images,Shop&sort_on=score";

      var source = $('#tile-template').html();
      var template = handlebars.compile(source);




      fetchJSONP(url, function(etsyData) {
            _.each(etsyData.results, function(product){
              console.log(product);
            var context = {
              imageOf: product.Images[0].url_170x135,
              title: product.title,
              priced: product.price,
              maker: product.Shop.shop_name
            }

            $('.product-contain').append(template(context));

            })
           });
     //
    //        // OR
     //
    //        function logData(data) {
    //
    //        }
     //
    //        fetchJSONP(url, logData);
    //  */

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
