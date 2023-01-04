$(document).ready(function() {
  console.log('form sub');
  const location = window.location.href;
  const split = location.split('/');
  const form = split[split.length - 1];
  const formElement = document.getElementById(form + '-info');

  const test = true;
  const url = endpoint => {
    return test ? 'http://127.0.0.1:5500/public/' + endpoint + '.html' :
      'http://recordgreeting.com/' + endpoint;
  }

  $('.submit').on('click', function(e) {
    
  });

  $('#submit').on('click', function(e) {
    $('body').load('http://recordgreeting.com/set-voicemail/processing');
    let number = $('#cphone').val();
    const regex = /\(\d\d\d\)\s\d\d\d-\d\d\d\d/
    if (regex.test(number)) {
      const XHR= new XMLHttpRequest();
      const FD = new FormData(formElement);

      XHR.open('POST', 'http://recordgreeting.com/set-voicemail/' + form);

      XHR.onreadystatechange = function() {
        if (XHR.readyState === XMLHttpRequest.DONE) {
          var status = XHR.status;
          console.log(status);
          if (status === 0 || (status >= 200 && status < 400)) {
            console.log(XHR.responseText);
            $('body').load('http://recordgreeting.com/set-voicemail/success', function() {
              $('#return').on('click', function(e) {
                window.location.href = 'http://www.recordgreeting.com/set-voicemail/' + form;
              });

              $('#finish').on('click', function(e) {
                window.location.href = 'http://www.recordgreeting.com';
              });
            });
          } else {
            $('body').load('http://recordgreeting.com/error', function() {
              $('#error').html(function(idx, html) {
                return html + ' ' + status;
              });
              $('#message').html(XHR.responseText);
            });
          }
        }
      }
      XHR.send(FD);
    } else {
      alert('Invalid phone number');
    }
  });

  const max_chars = 50;

  $('#password').keydown(function(e) {
    if ($(this).val().length >= max_chars) {
        $(this).val($(this).val().substr(0, max_chars));
    }
  });

  $('#password').keyup(function(e) {
    if ($(this).val().length >= max_chars) {
        $(this).val($(this).val().substr(0, max_chars));
    }
  });

  if ($('#extension').length) {
    $('#extension').keydown(function(e) {
      if ($(this).val().length >= max_chars) {
          $(this).val($(this).val().substr(0, max_chars));
      }
    });

    $('#extension').keyup(function(e) {
      if ($(this).val().length >= max_chars) {
          $(this).val($(this).val().substr(0, max_chars));
      }
    });
  }

  $('#mp3').on('change', function() {
    const fileSize = this.files[0].size;
    if(fileSize > 20971520){
      alert('file too big');
    }
  });

  $('.cphone').inputmask('(999) 999-9999');
});
