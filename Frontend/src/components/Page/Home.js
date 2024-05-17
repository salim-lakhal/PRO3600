// Home.js
import React from 'react';
import styles from './home.css'; // Importez les styles CSS appropriés
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Home = () => {
  return (

    <div>
      <Header />
      <Container>
        <Row>
        <Col>
      <div className={styles.roundedRectangle} style={{ marginLeft: '20px' }}>
        <h1>À propos de l'IPFS</h1>
        <p className={styles.aboutText}>
          IPFS (InterPlanetary File System) est un système de fichiers distribué qui vise à connecter tous les appareils de calcul avec le même système de fichiers. En quelques termes, cela pourrait être vu comme un seul BitTorrent fusionné avec Git.
        </p>
        <p className={styles.aboutText}>
          Les fichiers et les objets ajoutés à IPFS sont adressables par leur empreinte numérique (hash), ce qui signifie que lorsqu'un fichier est recherché, on ne recherche pas le lieu où il est stocké, mais plutôt on cherche l'empreinte numérique du contenu. C'est ce qu'on appelle l'adressage par le contenu.
        </p>
      </div>
      <div className={styles.roundedRectangle} style={{ marginLeft: '20px' }}>
        <h2>L'intérêt de stocker des documents sur IPFS</h2>
        <p className={styles.aboutText}>
          Stocker des documents sur IPFS présente plusieurs avantages, parmi lesquels :
        </p>
        <ul className={styles.bulletPoints}>
          <li>Pérennité : Les documents sont résistants à la censure et peuvent être rendus permanents.</li>
          <li>Performance : IPFS peut être plus rapide que les réseaux centralisés traditionnels sous certaines conditions.</li>
          <li>Distribué : IPFS est un système de fichiers distribué, il n'y a donc pas de point unique de défaillance.</li>
        </ul>
      </div>
      <div className={styles.roundedRectangle} style={{ marginLeft: '20px' }}>
        <h2>Garder une trace sur la Blockchain</h2>
        <p className={styles.aboutText}>
          En utilisant la blockchain en conjonction avec IPFS, il est possible de créer un système de preuve d'existence pour les documents. Cela signifie que vous pouvez prouver qu'un certain document existait à un certain moment sans avoir à révéler le contenu du document lui-même.
        </p>
        <p className={styles.aboutText}>
          En stockant le hash IPFS d'un document sur la blockchain, vous créez une référence immuable et horodatée à ce document. Cela pourrait être utilisé pour prouver la propriété intellectuelle, la conformité, ou même dans le cadre de la chaîne de blocs de la chaîne d'approvisionnement.
        </p>
      </div>
      <div className={styles.roundedRectangle} style={{ marginLeft: '20px' }}>
        <p className={styles.aboutText}>
          Il est important de noter que tout en fournissant de nombreux avantages, IPFS et la blockchain sont des technologies relativement nouvelles et en développement. Il est essentiel de comprendre leurs limites et leurs défis avant de les utiliser dans des applications critiques.
        </p>
      </div>
    </Col>

        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
