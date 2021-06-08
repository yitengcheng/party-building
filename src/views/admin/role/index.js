import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  message,
  Tree,
} from "antd";
import {
  getTableData,
  addRole,
  updateRole,
  delRoleRow,
  getRolePermis,
  updateRolePermis,
} from "@/api/admin/role";
import DeptSelect from "@/components/dept-select";
import { getTableData as getMenuTableDate } from "@/api/admin/menu";
import { concat } from "lodash";

const { Column } = Table;
const { Option } = Select;

const dsTypeDict = [
  {
    label: "全部",
    value: 0,
  },
  {
    label: "自定义",
    value: 1,
  },
  {
    label: "本级及子级",
    value: 2,
  },
  {
    label: "本级",
    value: 3,
  },
];

const eunuchList = []; // 所有太监节点
function Role() {
  /* 表格 开始 */
  const [tableData, setTableData] = useState([]);
  // 获取表格数据的函数
  const getTable = () => {
    getTableData({
      current: 1,
      size: 1000, // 不想做分页，获取前1000条
    }).then((value) => {
      setTableData(value.data.data.records || []);
    });
  };
  useEffect(() => {
    getTable();
  }, []);
  /* 表格 结束 */

  const [visible, setIsVisible] = useState(false); // 控制新增或修改弹窗状态
  const [form] = Form.useForm(); // 新增或修改表单

  const [permisVisible, setPermisVisible] = useState(false); // 控制权限弹窗
  const [treeData, setTreeData] = useState([]); // 权限树
  const [checkedKeys, setCheckedKeys] = useState([]); // 选中的树
  const [roleId, setRoleId] = useState(""); // 当前编辑的角色

  /**
   * 将要发送到后端的配置数据
   * 解释下逻辑 为了在ui上能看见半选状态 在弹框刚打开时我只能设置tree组件太监节点，
   * 组件会因为父子关联的原因自动渲染非根节点的半选或全选状态。
   * 但是，如果用户在打开之后不对tree组件进行任何操作直接点提交，
   * 此时获取checkedKeys的数据来也仅仅是刚设置的太监节点而没有父节点和半选节点（所以这种情况不能做为提交数据）
   * 所以我需要一个地方存储用户的真实数据，在用户操作tree组件时用checkedKeys再进行覆盖。
   */
  const [treedataSend, setTreedataSend] = useState([]);

  /**
   * 这个函数主要是用来将数据处理成tree组件认识的样子
   * 但是我也在这里顺便筛选出了太监节点并用eunuchListcopy接收
   */
  const deepMenu = (list) => {
    return list.map((item) => {
      if (!item.children || item.children.length === 0) {
        eunuchList.push(item.id);
      }
      return {
        title: item.name,
        key: item.id + "",
        parentId: item.parentId,
        children: deepMenu(item.children || []),
      };
    });
  };

  useEffect(() => {
    getMenuTableDate().then((value) => {
      setTreeData(deepMenu(value.data.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [myTreeRef, setMyTreeRef] = useState(""); //权限树

  // 打开编辑权限弹窗
  const openPermisDia = (text) => {
    getRolePermis(text.roleId).then((value) => {
      const list = value.data.data.filter((item) =>
        eunuchList.some((i) => i === item)
      );
      setCheckedKeys(list.map((item) => `${item}`));
      setTreedataSend(value.data.data.map((item) => `${item}`));
      setRoleId(text.roleId);
      setPermisVisible(true);
    });
  };

  return (
    <div className="page">
      <div className="head">
        <Button type="primary" onClick={() => setIsVisible(true)}>
          新增
        </Button>
      </div>
      <div className="main">
        <Table
          rowKey="roleId"
          dataSource={tableData}
          bordered
          pagination={false}
        >
          <Column
            title="#"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column title="角色名称" dataIndex="roleName" />
          <Column title="角色标识" dataIndex="roleCode" />
          <Column
            title="数据权限"
            render={(text, record) => {
              const find = dsTypeDict.find(
                (item) => item.value === text.dsType
              );
              const label = find ? find.label : "";
              return <span>{label}</span>;
            }}
          />
          <Column title="创建时间" dataIndex="createTime" />
          <Column
            title="操作"
            render={(text, record) => {
              return (
                <Space>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      form.setFieldsValue({
                        roleName: text.roleName,
                        roleCode: text.roleCode,
                        roleDesc: text.roleDesc,
                        dsType: text.dsType,
                        dsScope: text.dsScope,
                        roleId: text.roleId,
                      });
                      setIsVisible(true);
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      openPermisDia(text);
                    }}
                  >
                    编辑权限
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      Modal.confirm({
                        content: "此操作将永久删除该角色, 是否继续?",
                        okText: "确认",
                        cancelText: "取消",
                        centered: true,
                        onOk: () => {
                          delRoleRow(text.roleId).then(() => {
                            getTable();
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
          />
        </Table>
      </div>

      <Modal
        title="新增or编辑"
        width="800px"
        visible={visible}
        onCancel={() => setIsVisible(false)}
        forceRender={true}
        afterClose={() => {
          form.resetFields();
        }}
        footer={
          <Space>
            <Button onClick={() => setIsVisible(false)}>取消</Button>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              保存
            </Button>
          </Space>
        }
        centered={true}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          // 表单验证成功后提交
          onFinish={(values) => {
            let submitFn = null;
            let msg = "";
            if (values.roleId) {
              submitFn = updateRole;
              msg = "修改成功！";
            } else {
              submitFn = addRole;
              msg = "新增成功！";
            }
            submitFn(values).then(() => {
              getTable();
              message.success(msg);
              setIsVisible(false);
            });
          }}
        >
          <Form.Item name="roleId" hidden={true}>
            <Input />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="角色名称"
                name="roleName"
                rules={[{ required: true, message: "请输入角色名称" }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="角色标识"
                name="roleCode"
                rules={[{ required: true, message: "请输入角色标识" }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="角色描述" name="roleDesc">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="数据权限"
                name="dsType"
                rules={[{ required: true, message: "请选择权限类型" }]}
              >
                <Select allowClear>
                  {dsTypeDict.map((item) => (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                style={{ margin: 0 }}
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.dsType !== currentValues.dsType
                }
              >
                {({ getFieldValue }) => {
                  return getFieldValue("dsType") === 1 ? (
                    <Form.Item
                      label="部门"
                      name="dsScope"
                      labelCol={{ span: 5 }}
                    >
                      <DeptSelect allowClear />
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="编辑权限"
        visible={permisVisible}
        onCancel={() => setPermisVisible(false)}
        afterClose={() => {
          setRoleId("");
          setCheckedKeys([]); // 关闭之后清空已选节点
        }}
        footer={
          <Space>
            <Button onClick={() => setPermisVisible(false)}>取消</Button>
            <Button
              type="primary"
              onClick={() => {
                updateRolePermis({
                  roleId: roleId,
                  menuIds: [
                    ...new Set(
                      concat(myTreeRef.state.halfCheckedKeys, treedataSend)
                    ),
                  ].join(","),
                }).then(() => {
                  setPermisVisible(false);
                  message.success("更新成功！");
                });
              }}
            >
              保存
            </Button>
          </Space>
        }
        centered={true}
      >
        <div
          style={{
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          <Tree
            ref={(ref) => {
              setMyTreeRef(ref);
            }}
            treeData={treeData}
            checkable={true}
            checkedKeys={checkedKeys}
            onCheck={(checkedKeys) => {
              setCheckedKeys(checkedKeys);
              setTreedataSend(checkedKeys);
            }}
          ></Tree>
        </div>
      </Modal>
    </div>
  );
}

export default Role;
