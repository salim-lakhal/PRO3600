import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// La clé de chiffrement, doit être de 128, 192, ou 256 bits pour l'AES
let key = "12345678123456781234567812345678"; // une clé de 256 bits

function EncryptionPage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  function encrypt() {
    let encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    setResult(encryptedMessage);
  }

  function decrypt() {
    let bytes = CryptoJS.AES.decrypt(result, key);
    let originalMessage = bytes.toString(CryptoJS.enc.Utf8);
    setResult(originalMessage);
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  return (
    <div>
      <h2>Encryption and Decryption with CryptoJS</h2>
      <input type="text" value={message} onChange={handleChange} placeholder="Enter your message here" />
      <button onClick={encrypt}>Encrypt</button>
      <button onClick={decrypt}>Decrypt</button>
      <p>{result}</p>
    </div>
  );
}

export default EncryptionPage;