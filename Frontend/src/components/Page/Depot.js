import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './depot.css';






const IPFS = create();


const Depot = () => {
const [fileUploaded, setFileUploaded] = useState(null);
const [ipfsLink, setIpfsLink] = useState(null);




useEffect(() => {
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");




    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });




    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
        setFileUploaded(inputElement.files[0]);
      }
    });




    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });




    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });




    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();




      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        setFileUploaded(e.dataTransfer.files[0]);
      }




      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
}, []);




function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");




  if (thumbnailElement) {
    thumbnailElement.dataset.label = file.name;




    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
}




async function uploadFileToIPFS(file) {
 try {
   const formData = new FormData();
   formData.append('file', file);
   console.log('Envoi du fichier sur IPFS...');


   // Utilisation directe de IPFS comme instance
   const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
   const infuraProjectId = process.env.INFURA_PROJECT_ID;
   const response = await ipfs.addAll(formData, {
     headers: {
       authorization: `Bearer ${infuraProjectId}`
     }
   });
  
   if (response && response[0]) {
     const ipfsHash = response[0].cid.toString();
     const ipfsLink = `https://ipfs.io/ipfs/${ipfsHash}`;
     console.log('Fichier ajouté sur IPFS :', ipfsLink);
     setIpfsLink(ipfsLink);
     return ipfsLink;
   } else {
     throw new Error('Aucun fichier n\'a été ajouté à IPFS.');
   }
 } catch (error) {
   console.error('Erreur lors de l\'ajout du fichier sur IPFS :', error);
   throw error;
 }
}




async function sendIPFSTransaction(ipfsLink) {
  try {
    // Ici, vous pouvez ajouter le code pour créer une transaction XRPL avec le lien IPFS dans le champ Memo
    console.log('Transaction XRPL envoyée avec succès avec le lien IPFS :', ipfsLink);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la transaction XRPL :', error);
    throw error;
  }
}




async function handleUpload() {
  if (fileUploaded) {
    try {
      const ipfsLink = await uploadFileToIPFS(fileUploaded);
      await sendIPFSTransaction(ipfsLink);
      setFileUploaded(null); // Réinitialiser le fichier après le téléchargement
      console.log('Téléchargement et envoi du fichier terminés avec succès.');
    } catch (error) {
      console.error('Erreur lors du traitement du fichier :', error);
    }
  }
}




return (
  <div >
    <Header />
    <div className="depot-container">
      <div className="botStyle1">
        {/* KryptoBot Logo */}
        <img className="logoStyle1" src="logopote.png" alt="KryptoBot" />
      </div>
      {/* Zone de dépôt de fichier */}
      <div className="drop-zone">
        {fileUploaded ? (
          <div>
            <div className="drop-zone__thumb" data-label={fileUploaded.name}></div>
          </div>
        ) : (
          <span className="drop-zone__prompt">Drop file here or click to upload</span>
        )}
        <input type="file" name="myFile" className="drop-zone__input" />
        </div>
      <button className="upload-button" onClick={handleUpload}>Upload File</button>
      {ipfsLink && <p>IPFS Link: {ipfsLink}</p>}
      <Footer />
    </div>
  </div>
);
};




export default Depot;













