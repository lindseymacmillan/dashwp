import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../../components/options/header'
import Menu from '../../../components/options/menu'
import Layout from '../../../components/options/layout'

import styles from './style.css'

const Options = () => {

    const dispatch = useDispatch()

    return (
        <div className={'wrap ' + styles.grid}>
            <Header />
            <Menu />
            <Layout />
        </div>
    )
}

export default Options