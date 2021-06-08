/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form, InputNumber } from "antd";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  type,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("保存失败：", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    if (!editing) {
      childNode = (
        <div className="ant-input-affix-wrapper" onClick={toggleEdit}>
          {children}
        </div>
      );
    } else {
      // 这个类型是给套餐配置使用的，以后有时间再优化代码
      if (type === "package") {
        childNode = (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <InputNumber
              ref={inputRef}
              min={record.min}
              max={record.max}
              onPressEnter={save}
              onBlur={save}
              precision={2}
              style={{ width: "100%" }}
            />
          </Form.Item>
        );
      } else {
        childNode = (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Input
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              style={{ width: "100%" }}
            />
          </Form.Item>
        );
      }
    }
  }
  return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.props.handleSave,
          type: col.type,
        }),
      };
    });

    return <Table {...this.props} components={components} columns={columns} />;
  }
}
