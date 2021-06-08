import React from "react";
import PropTypes from "prop-types";
import { config, TextFormItem, NumberFormItem } from "@/components";
import { Modal, Form, Row, message } from "antd";
import styles from "./index.module.css";
import { addItemObj, putItemObj, delItemObj } from "@/api/admin/dict";

export default class DictItemContainer extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    dict: PropTypes.object.isRequired,
    getDictItem: PropTypes.func.isRequired,
  };
  addDictItem(modalFlag) {
    this.form.validateFields().then((values) => {
      const func = modalFlag ? addItemObj : putItemObj;
      func({
        ...values,
        dictId: this.props.dict.id,
        id: this.props.item.id || undefined,
      }).then(() => {
        const { getDictItem } = this.props;
        getDictItem && getDictItem();
      });
    });
  }
  // 删除字典项
  delDictItem(id) {
    Modal.confirm({
      title: "确定删除该条数据吗？",
      centered: true,
      onOk() {
        delItemObj(id).then(() => {
          message.success("删除成功！");
        });
      },
    });
  }
  render() {
    const { item, dict } = this.props;
    let obj = item;
    obj.type = item.type || dict.type;
    const { type, value, label, description, sort, remarks } = obj;
    return (
      <Form
        {...config.getFormLayout()}
        ref={(ref) => {
          this.form = ref;
        }}
        className={styles.formBox}
        initialValues={obj}
      >
        <Row>
          <TextFormItem
            label="类型"
            value={{ type }}
            editing={false}
            required={false}
          />
          <TextFormItem label="数据值" value={{ value }} />
        </Row>
        <Row>
          <TextFormItem label="标签名" value={{ label }} />
          <TextFormItem label="描述" value={{ description }} />
        </Row>
        <Row>
          <NumberFormItem label="排序" value={{ sort }} />
          <TextFormItem label="备注" value={{ remarks }} required={false} />
        </Row>
      </Form>
    );
  }
}
