import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './views/home'
import AddEmployee from './views/addEmployee'

import styles from '../style/index.css'

module.exports = (
  <div className={styles.container}>
    <div className={styles.content}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/addEmployee" component={AddEmployee}/>
        <Route path="*" component={Home}/>
      </Switch>
    </div>
  </div>
)
