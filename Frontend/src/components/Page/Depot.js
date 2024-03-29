import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './depot.css';

const Depot = () => {
  useEffect(() => {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
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
        }

        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  }, []);

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
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
          <span className="drop-zone__prompt">Drop file here or click to upload</span>
          <input type="file" name="myFile" className="drop-zone__input" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Depot;
