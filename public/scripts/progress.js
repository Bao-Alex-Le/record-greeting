const domainName = 'https://recordgreeting.herokuapp.com';

$(function() {
    if (!!window.EventSource) {
        const splitURL = window.location.href.split('/');
        const callId = splitURL[splitURL.length-1];
        console.log('processing id: ' + callId);
        const source = new EventSource(domainNamme + '/call/events/' + callId);

        source.addEventListener('message', function(e) {
          console.log('Message Event Data: \n' + e.data);
          document.getElementById('status').innerHTML = e.data
        }, false);
        
        source.addEventListener('error', function(e) {
          console.log('Event Error');
          //const id_state = document.getElementById('state')
          if (e.eventPhase == EventSource.CLOSED)
            console.log('closing');
            //source.close()
          if (e.target.readyState == EventSource.CLOSED) {
            console.log('disconnected');
            //id_state.innerHTML = "Disconnected"
          }
          else if (e.target.readyState == EventSource.CONNECTING) {
            console.log('connecting..');
            //id_state.innerHTML = "Connecting..."
          }
        }, false);
    } else {
        console.log("Your browser doesn't support SSE");
    }
});