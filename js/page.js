$(document).ready(function(){
	$("#form-register").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 100
            },
            father_last_name: {
                required: true,
                minlength: 2,
                maxlength: 100
            },
            birth: {
                required: true
            },
            console: {
                required: true
            },
            version: {
                required: true
            },
            city: {
                required: true
            },
            roster: {
                required: true,
                minlength: 2,
                maxlength: 100
            },
            handle: {
                required: true,
                minlength: 2,
                maxlength: 100
            },
            email: {
                required: true,
                email: true
            },
        },
        errorPlacement: function( error, element ) {
            error.insertAfter(element);
        }
    });

    $('.window .close').click(function (e) {
        e.preventDefault();
        $('#mask, .window').hide();
    });

    $('#mask').click(function (){
        $(this).hide();
        $('.window').hide();
    });

    $('#button-send').click(function(e){
        e.preventDefault();
        $('#form-register').submit();
    });

    $('#form-register').submit(function(event) {
        event.preventDefault();

        if($(this).valid()){
            var formData = $(this).serialize();
       
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: formData,
                beforeSend: function(){
                    $('#form-loader').show();
                    $('#button-send').hide();
                }
            }).done(function(data) {
                var json = jQuery.parseJSON(data);
                if(json.error === undefined || json.error === ""){
                    showBox("¡Registro exitoso!");
                }else{
                    showBox("Invalid data, please try again.");
                }

                $('#form-loader').hide();
                $('#button-send').show();

                clearForm();
            });
        }
    });

    if(window.location.hash) {
      var hash = window.location.hash.substring(1); 
      console.log(hash);
        if(hash == "us"){
            var item = $(".top_bar .item_main")[1];
        }else if(hash == "content"){
            var item = $(".top_bar .item_main")[2];
        }else if(hash == "contact"){
            var item = $(".top_bar .item_main")[3];
        }

        $('.item_main').css({
                'border-bottom': '0px'
            });
            $('.item_main').find('a').css({
                'color': '#fff'
            });
            $(item).css({
                'border-bottom': '1px solid #e9c24e'
            });
            $(item).find('a').css({
                'color': '#e9c24e'
            });
        }

	function showBox(msg){
	    var id = $('#dialog');

	    $("#box-msg").text(msg);

	    var maskHeight = $(document).height();
	    var maskWidth = $(window).width();

	    $('#mask').css({'width':maskWidth,'height':maskHeight});

	    $('#mask').fadeTo("fast",0.8);
	    $('#mask').fadeIn();

	    var winH = $(window).height();
	    var winW = $(window).width();

	    $(id).css('top',  winH/2-$(id).height()/2);
	    $(id).css('left', winW/2-$(id).width()/2);

	    $(id).fadeIn();
	}

	function clearForm(){
	    $("input[name='name']").val("");
	    $("input[name='company']").val("");
	    $("input[name='mail']").val("");
	    $("input[name='phone']").val("");
	    $("textarea[name='msj']").val("");
	}
});