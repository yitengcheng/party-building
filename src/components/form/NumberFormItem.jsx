import React from "react";
import _ from "lodash";
import { Form, InputNumber } from "antd";
import { numberParser } from "@/utils/common";
import styles from "./index.module.css";
const FormItem = Form.Item;

function checkMinNumber(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^-?\d+(\.\d+)?$/.test(value) || Math.abs(value) < 0.000001) {
    return Promise.reject("无效数字");
  } else {
    return Promise.resolve();
  }
}

export default class NumberFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      parser: numberParser,
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
      rules = [],
      parser,
      style,
      precision = 0,
      required = true,
      placeholder,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    rules.push({ validator: checkMinNumber });
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    return (
      <FormItem
        label={label}
        className={styles.formItem}
        required={required}
        rules={rules}
        style={style}
        name={key}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <InputNumber
          maxLength={15}
          precision={precision}
          parser={parser(precision)}
          style={{ width: "100%" }}
          disabled={!editing}
          placeholder={placeholder || `请输入${label}`}
          {...otherProps}
        />
      </FormItem>
    );
  }
}
