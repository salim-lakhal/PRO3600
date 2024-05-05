import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import FormData from 'form-data';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './depot.css';

const IPFS = create();

const Depot = () => {
  const [fileUploaded, setFileUploaded] = useState(null);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [jwtToken, setJwtToken] = useState('');

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
        const cid = res.data.IpfsHash;
        console.log('CID du fichier envoyé :', cid); // Renvoyer le CID dans la console
        return cid; // Retourne le CID
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
      await pinFileToIPFS();
      setFileUploaded(null); // Réinitialiser le fichier après le téléchargement
      console.log('Téléchargement et envoi du fichier terminés avec succès.');
      setIpfsLink(ipfsLink); // Mettez à jour l'état avec
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
              <button className="upload-button" onClick={handleUpload}>Upload File</button>
            </div>
          ) : (
            <span className="drop-zone__prompt">Drop file here or click to upload</span>
          )}
          <input type="file" name="myFile" className="drop-zone__input" />
        </div>
        {ipfsLink && (
  <div>
    <p>IPFS Link: {ipfsLink}</p>
    <p>CID du fichier envoyé : {ipfsLink.replace('https://ipfs.io/ipfs/', '')}</p>
  </div>
)}
        <Footer />
      </div>
    </div>
  );
};

export default Depot;
