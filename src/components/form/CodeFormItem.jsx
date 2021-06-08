import React from "react";
import _ from "lodash";
import { Form, Input } from "antd";
import { checkNoAndEng } from "@/utils/validator";
import styles from "./index.module.css";

export default class CodeFormItem extends React.Component {
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
  handleChange = (e) => {
    const { onChange } = this.state;
    if (onChange) {
      onChange(e.target.value);
    }
  };
  render() {
    const {
      label = "编码",
      value,
      placeholder,
      editing = true,
      style,
      required = true,
      maxLength = 6,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    let rules = [{ validator: checkNoAndEng }];
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
        <Input
          {...otherProps}
          placeholder={placeholder || `请输入${label}`}
          onChange={(e) => this.handleChange(e)}
          disabled={!editing}
          maxLength={maxLength}
        />
      </Form.Item>
    );
  }
}
