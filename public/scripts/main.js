$(document).ready(function(e) {
  
  const test = true;
  const url = endpoint => {
    return test ? 'http://127.0.0.1:5500/public/' + endpoint + '.html' :
      'http://recordgreeting.com/' + endpoint;
  }

  $('.set-greeting').on('click', function(e) {
    $('.how-to').css('background-color', 'white');
    $('.how-to').css('color', 'rgb(2, 120, 255)');
    $('.set-greeting').css('background-color', 'rgb(2, 120, 255)');
    $('.set-greeting').css('color', 'white');
    $('.select').children('.selected').css('display', 'none').removeClass('selected');
    $('.home').css('display', 'flex').addClass('selected');
  })

  $('.how-to').on('click', function(e) {
    $('.set-greeting').css('background-color', 'white');
    $('.set-greeting').css('color', 'rgb(2, 120, 255)');
    $('.how-to').css('background-color', 'rgb(2, 120, 255)');
    $('.how-to').css('color', 'white');
    $('.select').children('.selected').css('display', 'none').removeClass('selected');
    $('.guide').css('display', 'inline').addClass('selected');
  })

  $('#individual-button').on('click', function(e) {
    $('.select').children('.selected').css('display', 'none').removeClass('selected');
    $('#individual-form').css('display', 'flex').addClass('selected');
  });

  $('#corporate-button').on('click', function(e) {
    $('.select').children('.selected').css('display', 'none').removeClass('selected');
    $('#corporate-form').css('display', 'inline').addClass('selected');
  });

  $('.cancel').on('click', function(e) {
    $('.select').children('.selected').css('display', 'none').removeClass('selected');
    $('.home').css('display', 'flex').addClass('selected');
  });
  
});