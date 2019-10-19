import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './views/dashboard'
import AddEmployee from './views/addEmployee'

import styles from '../style/index.css'

module.exports = (
  <div className={styles.container}>
    <div className={styles.content}>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/addEmployee" component={AddEmployee}/>
      </Switch>
    </div>
  </div>
)
