import React from "react";
import _ from "lodash";
import { Form, Switch } from "antd";
import styles from "./index.module.css";
const FormItem = Form.Item;

export default class SwitchFormItem extends React.Component {
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
      style,
      required = true,
      rules = [],
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
        style={style}
        className={styles.formItem}
        required={required}
        rules={rules}
        name={key}
        valuePropName="checked"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Switch
          defaultChecked={value && value[key]}
          disabled={!editing}
          {...otherProps}
        />
      </FormItem>
    );
  }
}
