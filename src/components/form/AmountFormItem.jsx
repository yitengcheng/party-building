import React from "react";
import _ from "lodash";
import { Form, InputNumber } from "antd";
import { numberParser } from "@/utils/common";
import { checkAmount } from "@/utils/validator";
import styles from "./index.module.css";
const FormItem = Form.Item;

export default class AmountFormItem extends React.Component {
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
      label = "金额",
      value,
      editing = true,
      parser,
      precision = 2,
      required = true,
      placeholder,
      labelCol,
      wrapperCol,
      style,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    let rules = [{ validator: checkAmount }];
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
