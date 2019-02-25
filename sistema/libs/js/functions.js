
function suggetion() {

     $('#sug_input').keyup(function(e) {

         var formData = {
             'product_name' : $('input[name=title]').val()
         };

         if(formData['product_name'].length >= 1){

           // process the form
           $.ajax({
               type        : 'POST',
               url         : 'ajax.php',
               data        : formData,
               dataType    : 'json',
               encode      : true
           })
               .done(function(data) {
                   //console.log(data);
                   $('#result').html(data).fadeIn();
                   $('#result li').click(function() {
 total();
                     $('#sug_input').val($(this).text());
                     $('#result').fadeOut(500);

                   });

                   $("#sug_input").blur(function(){
                     $("#result").fadeOut(500);
                   });

               });

         } else {

           $("#result").hide();

         };

         e.preventDefault();
     });

     $('#sug_input2').keyup(function(e) {

         var formData = {
             'client_name' : $('input[name=title2]').val()
         };
         console.log(formData['client_name']);
         if(formData['client_name'].length >= 1){

           // process the form
           $.ajax({
               type        : 'POST',
               url         : 'ajax.php',
               data        : formData,
               dataType    : 'json',
               encode      : true
           })
               .done(function(data) {
                   //console.log(data);
                   console.log(formData['client_name']);
                   $('#result2').html(data).fadeIn();
                   $('#result2 li').click(function() {

                     $('#sug_input2').val($(this).text());
                     console.log($('#sug_input2').val($(this).text()));
                     $('#result2').fadeOut(500);
                    // total();
                   });

                   $("#sug_input2").blur(function(){
                     $("#result2").fadeOut(500);
                   });

               });

         } else {

           $("#result2").hide();

         };
          e.preventDefault();
 });

 }
  $('#sug-form').submit(function(e) {
      var formData = {
          'p_name' : $('input[name=title]').val()
      };
        // process the form
        $.ajax({
            type        : 'POST',
            url         : 'ajax.php',
            data        : formData,
            dataType    : 'json',
            encode      : true
        })
            .done(function(data) {
                console.log(data);
                console.log("bandera");
                $('#product_info').html(data).show();
                total();
                $('.datePicker').datepicker('update', new Date());

            }).fail(function() {
                $('#product_info').html(data).show();
            });
      e.preventDefault();
  });
  function total(){
    $('#product_info input').change(function(e)  {
      var position=0;
      var price = +$('input[name=price'+position+']').val() || 0;
      while(price!=0){
        console.log("hola");
        console.log("El precio es: "+price);
        var qty   = +$('input[name=quantity'+position+']').val() || 0;
        console.log("La cantidad es: "+qty);
        var imp   = +$('input[name=imp'+position+']').val() || 0;
        var total = qty * price ;
        var total2 = total+(total*(imp/100));
        $('input[name=total'+position+']').val(total.toFixed(2));
        $('input[name=totalA'+position+']').val(total2.toFixed(2));
        position++;
        price = +$('input[name=price'+position+']').val() || 0;
      }        
    });
  }

  $(document).ready(function() {

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $('.submenu-toggle').click(function () {
       $(this).parent().children('ul.submenu').toggle(200);
    });
    //suggetion for finding product names
    suggetion();
    // Callculate total ammont
    total();

    $('.datepicker')
        .datepicker({
            format: 'yyyy-mm-dd',
            todayHighlight: true,
            autoclose: true
        });
  });
