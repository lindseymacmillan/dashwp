import React, { Component } from "react";
import ReactDOM from "react-dom";

import styles from "./style.css";

class TestBlock extends Component {
  constructor() {
    super();

    this.state = {
      title: "testinggg"
    };
  }

  render() {
    return (
      <h1 className={styles.heading}>{this.state.title}</h1>
    );
  }
}

export default TestBlock;