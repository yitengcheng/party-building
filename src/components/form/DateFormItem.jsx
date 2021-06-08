import React from "react";
import _ from "lodash";
import moment from "moment";
import { Form, DatePicker } from "antd";
import styles from "./index.module.css";
const FormItem = Form.Item;

export default class DateFormItem extends React.Component {
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
  onChange(value) {
    const { onChange } = this.state;
    onChange && onChange(value);
  }
  getValue() {
    return this.datePicker.state.value;
  }
  render() {
    const {
      label,
      value,
      placeholder,
      editing = true,
      style,
      range = [],
      rules = [],
      required = true,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    let disabledDate;
    if (range.length > 1) {
      const min = _.isArray(value[key]) && moment(range[0]);
      const max = _.isArray(value[key]) && moment(range[1]);
      disabledDate = (current) => {
        return (
          current &&
          (current.valueOf() < min.valueOf() ||
            current.valueOf() > max.valueOf())
        );
      };
    } else if (range.length > 0) {
      const min = _.isArray(value[key]) && moment(range[0]);
      disabledDate = (current) => {
        return current && current.valueOf() < min.valueOf();
      };
    }

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
        <DatePicker
          ref={(ref) => {
            this.datePicker = ref;
          }}
          placeholder={placeholder || `请选择${label}`}
          disabledDate={disabledDate}
          onChange={(value) => this.onChange(value)}
          style={{ width: "100%" }}
          disabled={!editing}
          {...otherProps}
        />
      </FormItem>
    );
  }
}
