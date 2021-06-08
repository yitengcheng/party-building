import React, { useState, useEffect } from "react";
import {
  Modal,
  Table,
  Input,
  Button,
  Form,
  Space,
  Tag,
  Row,
  Col,
  Radio,
  message,
  Select,
} from "antd";
import { getTableData, addorUpdeteUser, delUser } from "@/api/admin/user";
import { getRoleList } from "@/api/admin/role";
import { assign } from "lodash";
import rules from "@/utils/rules";
import DictSelect from "@/components/dict-select";
import DeptSelect from "@/components/dept-select";
const { Column } = Table;
const { Option } = Select;

function User() {
  /* 表格 开始 */
  const [tableData, setTableData] = useState([]);
  const [headForm] = Form.useForm();
  function getTable(params = {}) {
    getTableData(
      assign(params, {
        current: 1,
        size: 20, // 不想做分页，获取前1000条
      })
    ).then((value) => {
      setTableData(value.data.data.records || []);
    });
  }
  useEffect(() => {
    getTable();
  }, []);
  // setTableData([]);
  /* 表格 结束 */

  // 新增or编辑弹窗 开始
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const [roleList, setRoleList] = useState([]); // 角色列表
  useEffect(() => {
    getRoleList().then((value) => {
      setRoleList(value.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [form] = Form.useForm();
  const formRules = {
    realName: [
      {
        required: true,
        message: "请输入真实姓名",
      },
      {
        pattern: rules.name,
        message: "请输入中文姓名",
      },
    ],
    workNum: [
      {
        required: true,
        message: "请输入工号",
      },
    ],
    username: [
      {
        required: true,
        message: "请输入用户名",
      },
      {
        pattern: rules.username,
        message: "4到16位（字母，数字，下划线，减号）",
      },
    ],
    password: [
      {
        required: active ? false : true,
        message: "请输入密码",
      },
      {
        min: 6,
        max: 20,
        message: "长度在 6 到 20 个字符",
      },
    ],
    deptId: [
      {
        required: true,
        message: "请选择科室",
      },
    ],
    phone: [
      {
        pattern: rules.phone,
        message: "请输入正确的手机号",
      },
    ],
    email: [
      {
        required: true,
        message: "请输入邮箱",
      },
      {
        pattern: rules.email,
        message: "请输入正确的邮箱",
      },
    ],
    sex: [
      {
        required: true,
        message: "请选择性别",
      },
    ],
    role: [
      {
        required: true,
        message: "请选择角色",
      },
    ],
    lockFlag: [
      {
        required: true,
        message: "请选择状态",
      },
    ],
  };

  // 新增or编辑弹窗 结束

  return (
    <div className="page">
      <div className="head">
        <Form
          form={headForm}
          layout="inline"
          onFinish={(params) => getTable(params)}
        >
          <Form.Item name="deptId">
            <DeptSelect allowClear isId className="input-item" />
          </Form.Item>
          <Form.Item name="username">
            <Input
              placeholder="用户名"
              allowClear
              className="input-item"
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="head">
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
          className="button-item"
        >
          新增
        </Button>
      </div>
      <div className="main">
        <Table
          dataSource={tableData}
          rowKey="userId"
          bordered
          pagination={false}
        >
          <Column
            title="#"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column title="用户名" dataIndex="username" />
          <Column title="真实姓名" dataIndex="realName" />
          <Column title="手机号" dataIndex="phone" />
          <Column
            title="角色"
            render={(text) => {
              return <div>{text.roleNames}</div>;
            }}
          />
          <Column
            title="状态"
            render={(text) => {
              return text.lockFlag === "0" ? (
                <Tag color="#2db7f5">有效</Tag>
              ) : (
                <Tag>锁定</Tag>
              );
            }}
          />
          <Column title="创建时间" dataIndex="createTime" />
          <Column
            title="操作"
            render={(text) => {
              return (
                <Space>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      setActive(text.userId);
                      form.setFieldsValue({
                        realName: text.realName,
                        workNum: text.workNum,
                        username: text.username,
                        ksCodes: text.ksCodes ? text.ksCodes.split(",") : [],
                        phone: text.phone,
                        email: text.email,
                        sex: text.sex,
                        role: text.role
                          ? text.role.split(",").map((i) => parseInt(i))
                          : [],
                        lockFlag: text.lockFlag,
                      });

                      setVisible(true);
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      Modal.confirm({
                        content: "此操作将永久删除该用户, 是否继续?",
                        okText: "确认",
                        cancelText: "取消",
                        centered: true,
                        onOk: () => {
                          delUser(text.userId).then(() => {
                            headForm.submit();
                            message.success("删除成功！");
                          });
                        },
                      });
                    }}
                  >
                    删除
                  </Button>
                </Space>
              );
            }}
          ></Column>
        </Table>
      </div>

      <Modal
        title={active ? "编辑" : "新增"}
        width="800px"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Space>
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button type="primary" onClick={form.submit}>
              保存
            </Button>
          </Space>
        }
        afterClose={() => {
          form.resetFields();
          setActive("");
        }}
        centered={true}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          initialValues={{ lockFlag: "0" }}
          onFinish={(params) => {
            let submitFn = addorUpdeteUser;
            let msg;
            if (active) {
              params.userId = active;
              msg = "修改成功";
            } else {
              msg = "新增成功";
            }
            submitFn(params).then(() => {
              headForm.submit(); // 刷新数据,这里调用的时head的表单的查询，所以表单不能有验证
              setVisible(false);
              message.success(msg);
            });
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="真实姓名"
                name="realName"
                rules={formRules.realName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工号" name="workNum" rules={formRules.workNum}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="用户名"
                name="username"
                rules={formRules.username}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="密码"
                name="password"
                rules={formRules.password}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="科室" name="ksCodes" rules={formRules.deptId}>
                <DeptSelect style={{ width: "100%" }} multiple />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="手机号" name="phone" rules={formRules.phone}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮箱" name="email" rules={formRules.email}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="性别" name="sex" rules={formRules.sex}>
                <DictSelect dictType="dict-gender" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="角色" name="role" rules={formRules.role}>
                <Select mode="multiple">
                  {roleList.map((item) => (
                    <Option value={item.roleId} key={item.roleId}>
                      {item.roleName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="状态"
                name="lockFlag"
                rules={formRules.lockFlag}
              >
                <Radio.Group>
                  <Radio value="0">有效</Radio>
                  <Radio value="1">锁定</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
