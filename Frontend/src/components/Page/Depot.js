import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './depot.css';

const Depot = () => {
  const [fileUploaded, setFileUploaded] = useState(null);

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

  function handleUpload() {
    if (fileUploaded) {
      const formData = new FormData();
      formData.append('file', fileUploaded);

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
          setFileUploaded(null); // Réinitialiser le fichier après le téléchargement
        } else {
          console.error('File upload failed');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
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
        <Footer />
      </div>
    </div>
  );
};

export default Depot;

