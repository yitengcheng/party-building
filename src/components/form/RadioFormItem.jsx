import React from "react";
import _ from "lodash";
import { Form, Radio } from "antd";
import styles from "./index.module.css";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class RadioFormItem extends React.Component {
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
      editing = true,
      titles,
      rules = [],
      style,
      required = true,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    return (
      <FormItem
        label={label}
        className={styles.formItem}
        required={required}
        rules={rules}
        name={key}
        style={style}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <RadioGroup disabled={!editing} {...otherProps} />
      </FormItem>
    );
  }
}
