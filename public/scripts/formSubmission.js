const domainName = 'https://recordgreeting.herokuapp.com';

$(function() {
    $('.submit').on('click', function(e) {
      $('.set-voicemail').load(domainName + '/processing');
      let voicemailType = $(this).hasClass('individual') ? 'individual' : 'corporate';
      const formElement = document.getElementById(voicemailType + '-form');

      let number = $(`#${voicemailType}-form .cphone`).val();
      const regex = /\(\d\d\d\)\s\d\d\d-\d\d\d\d/;

      if (regex.test(number)) { // Test that phone number is valid
        const XHR= new XMLHttpRequest();
        const FD = new FormData(formElement);
        
        // Server endpoint handles data from form and makes call through twilio API
        XHR.open('POST', domainName + '/set-voicemail/' + voicemailType);

        XHR.onreadystatechange = function() {
          if (XHR.readyState === XMLHttpRequest.DONE) {
            var status = XHR.status;

            if (status === 0 || (status >= 200 && status < 400)) {
              // On successful request redirects to call page
              window.location.href = domainName + '/call';
            } else {
              // On error displays error page and error status + description
              $('body').load(domainName + '/error', function() {
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
        alert('invalid phone number');
      }
    });

    $('.cphone').inputmask('(999) 999-9999');
});