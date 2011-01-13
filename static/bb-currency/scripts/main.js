require(["jquery", "order!/bb-currency/scripts/common/underscore.js", "order!/bb-currency/scripts/common/backbone.js"  ], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        require(["collections/currency_list"], function() {

          console.log('loaded');
        });
    });
});
