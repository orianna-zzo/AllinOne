jQuery(document).ready(function($) {

    $('#mdw_main_search').keyup(function() {
        var query = $('#mdw_main_search').val();

        if (query != '') {
            var data = {
                'action': 'mdw_search',
                'query': query,
            };
            jQuery.post(mdw_search_object.ajaxurl, data,
                function(response) {
                    li = '<li>';
                    if (response.indexOf(li) !== -1) {
                        jQuery('.dropdown-wrapper').html(
                            response);
                    } else {
                        jQuery('.dropdown-wrapper').html('');
                    }
                });
        } else {
            jQuery('.dropdown-wrapper').html('');
        }

    });

    $('#mdw_main_search').click(function() {
        var query = $('#mdw_main_search').val();

        if (query != '') {
            var data = {
                'action': 'mdw_search',
                'query': query,
            };
            jQuery.post(mdw_search_object.ajaxurl, data,
                function(response) {
                    li = '<li>';
                    if (response.indexOf(li) !== -1) {
                        jQuery('.dropdown-wrapper').html(
                            response);
                    } else {
                        jQuery('.dropdown-wrapper').html('');
                    }
                });
        } else {
            jQuery('.dropdown-wrapper').html('');
        }

    });

    jQuery('.search-form').click(function(e){
    	e.stopPropagation();
    });

    jQuery('body').click(function(){
    	jQuery('.dropdown-wrapper').html('');
    });

});