function enableDebug() {
  // $('#debug').hide();
  $('li .enableDebug').hide();
  $('.enableDebug').on('click', function() {
    $('li .enableDebug').hide();
    $('li .disableDebug').show();
    $('#debug').toggle();
  });
  $('.disableDebug').on('click', function() {
    $('li .disableDebug').addClass('red');
    // $('li .disableDebug').hide();
    // $('li .enableDebug').show();
    $('#debug').toggle();
  });
}