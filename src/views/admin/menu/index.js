import React from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Radio,
  InputNumber,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  getTableData,
  addManu,
  updateManu,
  delManuRow,
} from "@/api/admin/menu";
import rules from "@/utils/rules";
import style from "./style.module.css";

export default class menu extends React.Component {
  state = {
    tableData: [],

    modal: {
      visible: false,
      form: {},
    },
  };

  columns = [
    {
      title: "菜单名称",
      dataIndex: "label",
    },
    {
      title: "图标",
      dataIndex: "icon",
    },
    {
      title: "排序",
      dataIndex: "sort",
    },
    {
      title: "路径",
      dataIndex: "path",
    },
    {
      title: "类型",
      key: "type",
      render: (text, record) => {
        if (text.type === "0") {
          return <Tag color="#108ee9">菜单</Tag>;
        } else if (text.type === "1") {
          return <Tag color="#87d068">按钮</Tag>;
        } else if (text.type === "2") {
          return <Tag color="#87d068">顶菜单</Tag>;
        }
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => this.addOpen(text.id)}
          >
            新增
          </Button>
          <Button
            type="primary"
            size="small"
            ghost
            onClick={() => this.editOpen(text)}
          >
            修改
          </Button>
          <Popconfirm
            title="此操作将永久删除该文件, 是否继续?"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              this.delRow(text.id);
            }}
          >
            <Button type="primary" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 表单
  formRef = React.createRef();

  componentDidMount() {
    this.getTableData();
  }

  render() {
    return (
      <div style={{ backgroundColor: "#fff" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #dcdfe6" }}>
          <Button type="primary" onClick={() => this.addOpen()}>
            新增
          </Button>
        </div>

        <div style={{ padding: "16px" }}>
          <Table
            rowKey="id"
            pagination={false}
            columns={this.columns}
            dataSource={this.state.tableData}
            bordered
          ></Table>
        </div>

        <Modal
          title="新增or编辑"
          visible={this.state.modal.visible}
          width="600px"
          onCancel={this.handleCancel.bind(this)}
          afterClose={() => this.formRef.current.resetFields()}
          forceRender={true}
          footer={
            <Space>
              <Button onClick={this.handleCancel.bind(this)}>取消</Button>
              <Button
                type="primary"
                onClick={() => {
                  this.formRef.current.submit();
                }}
              >
                保存
              </Button>
            </Space>
          }
          centered={true}
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            initialValues={{
              type: "0", // 默认选择菜单
              sort: 999,
              keepAlive: "0",
            }}
            onFinish={this.submitForm.bind(this)}
          >
            <Form.Item name="menuId" hidden={true}>
              <Input />
            </Form.Item>

            <Form.Item
              label="菜单类型"
              name="type"
              rules={[{ required: true, message: "请选择菜单类型" }]}
            >
              <Radio.Group>
                <Radio.Button value="0">菜单</Radio.Button>
                <Radio.Button value="1">按钮</Radio.Button>
                <Radio.Button value="2" disabled>
                  顶菜单
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="上级菜单" name="parentId">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="菜单名称"
              name="name"
              rules={[{ required: true, message: "请输入菜单名称" }]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              className={style["form-item-hidden"]}
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue }) => {
                return getFieldValue("type") === "1" ? (
                  <Form.Item
                    label="权限标识"
                    labelCol={{ span: 4 }}
                    name="permission"
                    rules={[]}
                  >
                    <Input allowClear />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>

            <Form.Item
              className={style["form-item-hidden"]}
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue }) => {
                return getFieldValue("type") !== "1" ? (
                  <Form.Item
                    labelCol={{ span: 4 }}
                    label="图标"
                    name="icon"
                    rules={[]}
                  >
                    <Input allowClear />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>

            <Form.Item
              className={style["form-item-hidden"]}
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue }) => {
                return getFieldValue("type") !== "1" ? (
                  <Form.Item
                    label="路由地址"
                    name="path"
                    labelCol={{ span: 4 }}
                    rules={[
                      { required: true, message: "请输入菜单路径" },
                      {
                        pattern: rules.path,
                        message: "请输入正确的路径",
                      },
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>

            <Form.Item
              label="排序"
              name="sort"
              rules={[{ required: true, message: "请输入排序" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              className={style["form-item-hidden"]}
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue }) => {
                return getFieldValue("type") !== "1" ? (
                  <Form.Item
                    labelCol={{ span: 4 }}
                    label="路由缓存"
                    name="keepAlive"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio.Button value="0">否</Radio.Button>
                      <Radio.Button value="1">是</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

  // // 获取表格数据
  getTableData() {
    getTableData().then((value) => {
      this.setState({
        tableData: value.data.data || [],
      });
    });
  }

  // 打开新增弹窗
  addOpen(parentId) {
    let modal = this.state.modal;
    modal.visible = true;
    this.formRef.current.setFieldsValue({
      parentId: parentId || -1,
    });
    this.setState({
      modal: modal,
    });
  }
  // 编辑
  editOpen(row) {
    let modal = this.state.modal;
    modal.visible = true;
    this.formRef.current.setFieldsValue({
      menuId: row.id, // 菜单id 编辑时存在
      type: row.type, // 菜单类型
      parentId: row.parentId, // 父节点id
      path: row.path, // 路由地址
      icon: row.icon, // 图标
      sort: row.sort, // 排序
      name: row.name, // 菜单名称
      keepAlive: row.keepAlive, // 是否缓存
      permission: row.permission, // 按钮权限标识
    });
    this.setState({
      modal: modal,
    });
  }
  // 删除
  delRow(id) {
    delManuRow(id).then(() => {
      message.success("删除成功！");
      this.getTableData();
    });
  }

  //关闭弹窗
  handleCancel() {
    let modal = this.state.modal;
    modal.visible = false;
    this.setState({
      modal: modal,
    });
  }
  //
  submitForm(params) {
    let submitFn = null;
    let mes = "";
    if (params.menuId) {
      // 编辑
      submitFn = updateManu;
      mes = "修改成功";
    } else {
      // 新增
      submitFn = addManu;
      mes = "新增成功";
    }
    submitFn(params).then((value) => {
      this.handleCancel();
      this.getTableData();
      message.success(mes);
    });
  }
}
