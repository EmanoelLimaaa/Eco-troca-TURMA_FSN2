import React from 'react';
import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h3>Ecotroca</h3>
          <p>
            Promovendo trocas conscientes para um mundo mais sustentável. <br />
            Junte-se a nós e faça parte dessa mudança!
          </p>
        </div>

        <div className={styles.section}>
          <h3>Contato</h3>
          <p>📧 Equipe3_FSN2@gmail.com</p>
          <p>📞 (85) 4002-8922</p>
        </div>

        <div className={styles.section}>
          <h3>Redes Sociais</h3>
          <p><FaInstagram /> Instagram</p>
          <p><FaFacebook /> Facebook</p>
          <p><FaLinkedin /> Linkedin</p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Ecotroca. Todos os direitos reservados.</p>
        <p>Feito com <span className={styles.heart}>💚</span> pela equipe Ecotroca.</p>
      </div>
    </footer>
  );
}

export default Footer;
