import React from "react";
import _ from "lodash";
import { Form } from "antd";
import styles from "./index.module.css";
import AgeScope from "../age-scope";

export default class AmountFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      selected: 0,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps, prevState)) {
      return {
        ...nextProps,
      };
    }
    return null;
  }
  render() {
    const {
      label,
      value,
      style,
      required = true,
      rules = [],
      labelCol,
      wrapperCol,
    } = this.state;
    const key = _.keys(value)[0];
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    return (
      <Form.Item
        label={label}
        className={styles.formItem}
        required={required}
        rules={rules}
        style={style}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        name={key}
      >
        <AgeScope />
      </Form.Item>
    );
  }
}
