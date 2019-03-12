import React from 'react';
import { Button } from "antd";
import styles from './index.css';
import logoPic from '@/assets/zhiSaiLogo.png'

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.logoBox}>
        <img className={styles.logo} src={logoPic} alt=" "/>

      </div>
      { props.children }
    </div>
  );
}

export default BasicLayout;
