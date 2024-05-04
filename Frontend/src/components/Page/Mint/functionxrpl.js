import xrpl from 'xrpl';

// Définissez la fonction getNet
function getNet() {
    let net;
    const tnCheckbox = document.getElementById("tn");
    const dnCheckbox = document.getElementById("dn");
    
    if (tnCheckbox && tnCheckbox.checked) net = "wss://s.altnet.rippletest.net:51233";
    if (dnCheckbox && dnCheckbox.checked) net = "wss://s.devnet.rippletest.net:51233";
    
    return net;
  }
  export { getNet };