import React from "react";
import _ from "lodash";
import { Form, Checkbox, Row, Col } from "antd";
import styles from "./index.module.css";
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

export default class CheckGroupFormItem extends React.Component {
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
      list = {},
      value,
      editing = true,
      rules = [],
      className,
      required = true,
      labelCol,
      wrapperCol,
      style,
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
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <CheckboxGroup disabled={!editing} {...otherProps}>
          <Row>
            {_.values(
              _.mapValues(list, (v, k) => (
                <Col key={k} span={8}>
                  <Checkbox disabled={!editing} value={k}>
                    {v}
                  </Checkbox>
                </Col>
              ))
            )}
          </Row>
        </CheckboxGroup>
      </FormItem>
    );
  }
}
