import React from 'react';
import { useSelector, useDispatch } from 'redux'

import Modal from '../../../components/dashboard/modal'
import Header from '../../../components/dashboard/header'
import Menu from '../../../components/dashboard/menu'
import Nav from '../../../components/dashboard/nav'
import Panels from '../../../components/dashboard/panels'
import Results from '../../../components/dashboard/results'


import styles from './style.css';

const Dashboard = () => {

    return (
        <div className={'wrap ' + styles.grid}>
            <Modal />
            <Header />
            <Menu />
            <Nav />
            <div className={styles.content}>
                <Panels />
                <Results />
            </div>
        </div>
    )
}

export default Dashboard;