import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import FormData from 'form-data';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './depot.css';
import { mintNFTWithCID } from './Mint/mintnft';


const IPFS = create();

const Depot = () => {
  const [fileUploaded, setFileUploaded] = useState(null);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [jwtToken, setJwtToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NWZkMmY4ZS0xNmJiLTQ3NmQtOTIzNy1jYjE3ZjE2NWY1NGQiLCJlbWFpbCI6InNhbGltLmxha2hhbEB0ZWxlY29tLXN1ZHBhcmlzLmV1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQyZmVlNWQ0NWZmNTMzNDUxYzQwIiwic2NvcGVkS2V5U2VjcmV0IjoiYWQ1ZjI0MDJhZGQwYzNmODRhOGNiM2FlZTkxYTI2MzQ1NGNhZTk3NmEzNzhjM2NmMWU4MGNiNWFjOTlhZjU1NiIsImlhdCI6MTcxNDkwMzIzMn0.XBJenmYfjKsTVMW6GJ1iEh3L3OTE7_pGv29cAJGmIeU');

  const pinFileToIPFS = async () => {
    const formData = new FormData();
    formData.append('file', fileUploaded);

    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          // Assurez-vous de récupérer correctement le JWT pour l'authentification
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      console.log(res.data);
      if (res.data.IpfsHash) {
        const ipfsLink = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
        setIpfsLink(ipfsLink);
      } else {
        throw new Error('Aucun fichier n\'a été ajouté à IPFS.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!fileUploaded) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    if (!(fileUploaded instanceof File)) {
      console.error("Le fichier n'est pas valide.");
      return;
    }

    console.log("Fichier sélectionné :", fileUploaded);

    try {
      console.log("Tentative d'envoi du fichier à IPFS...");
      const ipfsLink = await pinFileToIPFS();
      setFileUploaded(null); // Réinitialiser le fichier après le téléchargement
      console.log('Téléchargement et envoi du fichier terminés avec succès.');
      // Extraire le CID du lien IPFS
      const cid = ipfsLink;
      // Appel de mintNFTWithCID avec le CID correspondant
      /*mintNFTWithCID(cid); */
    } catch (error) {
      console.error('Erreur lors du traitement du fichier :', error);
    }
    
  }
  

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

  return (
    <div>
  <Header />
  <div className="depot-container">
    <div className="botStyle1">
      {/* KryptoBot Logo */}
      <img className="logoStyle1" src="logopote.png" alt="KryptoBot" />
    </div>
    {/* Zone de dépôt de fichier */}
    <div className="drop-zone-container">
      <div className="drop-zone">
        {fileUploaded ? (
          <div>
            <div className="drop-zone__thumb" data-label={fileUploaded.name}></div>
            <button className="upload-button" onClick={handleUpload}>Upload File</button>
          </div>
        ) : (
          <span className="drop-zone__prompt">Drop file here or click to upload</span>
        )}
        <input type="file" name="myFile" className="drop-zone__input" />
      </div>
      {ipfsLink && (
        <div className="ipfs-link-container">
          <p>IPFS Link:</p>
          <p>{ipfsLink}</p>
        </div>
      )}
    </div>
    <Footer />
  </div>
</div>

  );
};

export default Depot;
