import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import nftContractAbi from '../back/NFTMinter';

const DocApp = () => {

    const getPreviewImageByExtension = (cid) => {
      if (!cid) {
        return;  // ou retournez une URL d'image par défaut
      }
      
      // Extrayez l'extension du fichier de la fin de l'ID IPFS (cid)
      const extension = cid.split('.').pop();
    
      switch (extension) {
        case 'pdf':
          return '/pdf-preview.png';
        case 'mp3':
          return '/mp3-preview.png';
        default:
          // Si l'extension n'est ni PDF ni MP3, retournez l'URL IPFS
          return `https://ipfs.io/ipfs/${cid}`;
      }

      const getPreviewImage = (fileType) => {
        switch (fileType) {
          case 'pdf':
            return '/pdf-preview.png';
          case 'mp3':
            return '/mp3-preview.png';
          default:
            return null;
        }
      };
    }
}      
