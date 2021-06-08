import React from "react";
import { Form, TreeSelect } from "antd";
import _ from "lodash";
import styles from "./index.module.css";

export default class SelectFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
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
      options,
      editing = true,
      selectStyle,
      style,
      rules = [],
      required = true,
      isObject,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    return (
      <Form.Item
        label={label}
        style={style}
        className={styles.formItem}
        required={required}
        rules={rules}
        name={key}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <TreeSelect
          style={selectStyle}
          placeholder={`请选择${label}`}
          disabled={!editing}
          {...otherProps}
        />
      </Form.Item>
    );
  }
}
