import React from "react";
import _ from "lodash";
import { Form, Cascader } from "antd";
import styles from "./index.module.css";
const FormItem = Form.Item;

export default class CascadeFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }
  filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
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
      placeholder,
      rules = [],
      required = true,
      options,
      style,
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
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <FormItem name={key} noStyle>
          <Cascader
            placeholder={placeholder || `请选择${label}`}
            options={options}
            showSearch={() => this.filter()}
            disabled={!editing}
            {...otherProps}
          />
        </FormItem>
      </FormItem>
    );
  }
}
