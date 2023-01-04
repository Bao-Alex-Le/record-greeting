export const phoneSystems = {
  personalSystems: [
    'Toshiba',
    'Panasonic',
    'Bell',
    'Rogers',
    'Samsung',
    'Mitel',
    'Nortel',
    'Telstra',
    'Vodafone1',
    'Vodafone2'
  ],
  corporateSystems: [
    'Toshiba',
    'Panasonic',
    'Bell',
    'Rogers',
    'Samsung'
  ],
  populateNode(parentNode, systemClass) {
    const systems = (systemClass === 'corporate-systems') ? this.corporateSystems : this.personalSystems;
    systems.forEach((system) => {
      let selectItem = document.createElement('option');
      selectItem.value = system.toLowerCase();
      selectItem.innerHTML = system;
      parentNode.appendChild(selectItem);
    });
  }
};
