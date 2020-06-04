(function ($) {
    "use strict";
    // Subpages resize
    function subpages_resize() {
        var subpagesHeight = $('.pt-page-current').height();
        $(".subpages").height(subpagesHeight + 50);
    }

    // Portfolio subpage filters
    function portfolio_init() {
        var portfolio_grid = $('#portfolio_grid'),
            portfolio_filter = $('#portfolio_filters');

        if (portfolio_grid) {

            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });

            $('.site-main-menu').on("click", "a", function (e) {
                portfolio_grid.shuffle('update');
            });


            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('#portfolio_filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
                setTimeout(function () {
                    subpages_resize();
                }, 500);
            });

        }
    }
    // /Portfolio subpage filters



    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            $('#site_header').addClass('mobile-menu-hide');
        }
    }
    // /Hide Mobile menu

    //On Window load & Resize
    $(window)
        .on('load', function () { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut("slow");

            // initializing page transition.
            var ptPage = $('.subpages');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.site-main-menu',
                });
            }
        })
        .on('resize', function () { //Resize
            mobileMenuHide();

            setTimeout(function () {
                subpages_resize();
            }, 500);
        })
        .scroll(function () {
            if ($(window).scrollTop() < 20) {
                $('.header').removeClass('sticked');
            } else {
                $('.header').addClass('sticked');
            }
        })
        .scrollTop(0);


    // On Document Load
    $(document).on('ready', function () {
        $(".agreement input").click(function () {
            if ($(this).prop("checked") == true) {
                $(".comparison-btn").removeClass("disabled");
            } else if ($(this).prop("checked") == false) {
                $(".comparison-btn").addClass("disabled");
            }
        })
        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').toggleClass('mobile-menu-hide');
        });

        // Mobile menu hide on main menu item click
        $('.site-main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
        });

        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 0,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 4200,
            animateOut: 'zoomOut',
            animateIn: 'zoomIn'
        });

        $('.ajax-page-load-link').magnificPopup({
            type: 'ajax',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
        });

        //Form Controls
        $('.form-control')
            .val('')
            .on("focusin", function () {
                $(this).parent('.form-group').addClass('form-group-focus');
            })
            .on("focusout", function () {
                if ($(this).val().length === 0) {
                    $(this).parent('.form-group').removeClass('form-group-focus');
                }
            });


    });

    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        }
    });


    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }


    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") {
            return;
        }

        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = "$" + left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = "$" + input_val;

            // final formatting
            if (blur === "blur") {
                input_val += ".00";
            }
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    $(".form-box a").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    })

    

})(jQuery);