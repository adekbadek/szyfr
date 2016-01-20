import React from "react"
import classNames from 'classnames'

export default class Component extends React.Component{
  render() {
    let class_names = classNames(
      // set multiple classnames
      'class1',
      'class2'
    )
    return (
      <div className={class_names}>
        And a component
      </div>
    )
  }
}
