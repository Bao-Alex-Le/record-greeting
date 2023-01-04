import {phoneSystems} from './utils/phoneSystems.js';
window.addEventListener('load', function() {
    const individualSelect = document.querySelector('.individual-systems');
    const corporateSelect  = document.querySelector('.corporate-systems');
    phoneSystems.populateNode(individualSelect, 'individual-systems');
    phoneSystems.populateNode(corporateSelect, 'corporate-systems');
  }
);

//http://www.recordgreeting.com/phone-systems