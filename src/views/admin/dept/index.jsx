import React from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Table,
  Modal,
  Row,
  Col,
  InputNumber,
  message,
} from "antd";
import DictSelect from "@/components/dict-select";
import { useState } from "react";
import {
  getAllDeptTree,
  updateDepart,
  addDepart,
  delDepart,
} from "@/api/admin/dept";
import { useEffect } from "react";
import DictShow from "@/components/common/DictShow";
import DeptSelect from "@/components/dept-select";
import { confirm } from "@/utils/index";
const { Column } = Table;

function Page() {
  const [tableData, setTableData] = useState([]);

  const getTableData = (params = {}) => {
    getAllDeptTree(params).then((value) => {
      setTableData(value.data.data);
    });
  };

  useEffect(() => {
    getTableData();
  }, []);

  // 新增or编辑
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [active, setActive] = useState(""); // 当前操作项

  return (
    <div className="page">
      <div className="head">
        <Form layout="inline" onFinish={(values) => getTableData(values)}>
          <Form.Item name="deptCode">
            <Input placeholder="科室编码" className="input-item" allowClear />
          </Form.Item>
          <Form.Item name="deptName">
            <Input placeholder="科室名称" className="input-item" allowClear />
          </Form.Item>
          <Form.Item name="isEnable">
            <DictSelect
              dictType="dict-use-status"
              placeholder="状态"
              className="input-item"
              allowClear
            />
          </Form.Item>
          <Form.Item name="isReport">
            <DictSelect
              dictType="dict-yes-and-no"
              placeholder="是否打印报告"
              className="input-item"
              allowClear
            />
          </Form.Item>
          <Form.Item name="isTriage">
            <DictSelect
              dictType="dict-yes-and-no"
              placeholder="是否参加会诊"
              className="input-item"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="button-item">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="head">
        <Button
          type="primary"
          className="button-item"
          onClick={() => setVisible(true)}
        >
          新增
        </Button>
      </div>
      <div className="main">
        <Table
          dataSource={tableData}
          pagination={false}
          bordered
          rowKey="deptId"
          scroll={{ x: 1200 }}
        >
          <Column title="科室编码" dataIndex="deptCode" width={130} />
          <Column title="科室名称" dataIndex="deptName" />
          <Column title="上级科室" dataIndex="parentDeptName" />
          <Column
            title="科室类型"
            render={(text) => (
              <DictShow value={text.deptTypeId} dictType="dept-type" />
            )}
          />
          <Column title="科室区域" dataIndex="deptRegion" />
          <Column title="报告顺序" dataIndex="reportSort" />
          <Column title="正常小结" dataIndex="summary" width={200} />
          <Column
            title="是否参加导检"
            render={(text) => (
              <DictShow dictType="dict-yes-and-no" value={text.joinCheck} />
            )}
          />
          <Column
            title="需要分诊"
            render={(text) => (
              <DictShow dictType="dict-yes-and-no" value={text.isTriage} />
            )}
          />
          <Column
            title="状态"
            width={80}
            render={(text) => (
              <DictShow dictType="dict-use-status" value={text.isEnable} />
            )}
          />
          <Column
            title="操作"
            fixed="right"
            width={300}
            render={(row) => (
              <Space>
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    setActive(row.deptId);
                    form.setFieldsValue({
                      parentDeptId: row.parentDeptId,
                      deptName: row.deptName,
                      deptCode: row.deptCode,
                      deptPosition: row.deptPosition,
                      deptTypeId: row.deptTypeId,
                      reportSort: row.reportSort,
                      deptRegion: row.deptRegion,
                      isReport: row.isReport,
                      isEnable: row.isEnable,
                      isTriage: row.isTriage,
                      joinCheck: row.joinCheck,
                      summary: row.summary,
                      remarks: row.remarks,
                    });
                    setVisible(true);
                  }}
                >
                  编辑
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form.setFieldsValue({
                      parentDeptId: row.deptId,
                    });
                    setVisible(true);
                  }}
                >
                  添加下级科室
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    confirm(() => {
                      delDepart(row.deptId).then(() => {
                        message.success("删除成功!");
                        getTableData();
                      });
                    }, "确定删除当前科室及以下所有科室吗？")
                  }
                >
                  删除
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>

      <Modal
        title={active ? "编辑" : "新增"}
        width="800px"
        visible={visible}
        centered
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
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          onFinish={(values) => {
            let sumbitFn,
              mes,
              params = { ...values };
            if (active) {
              sumbitFn = updateDepart;
              mes = "修改成功！";
              params.deptId = active;
            } else {
              sumbitFn = addDepart;
              mes = "新增成功！";
            }
            sumbitFn(params).then(() => {
              message.success(mes);
              getTableData();
              setVisible(false);
            });
          }}
          initialValues={{
            isReport: "1",
            isEnable: "1",
            isTriage: "1",
            joinCheck: "1",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="上级科室" name="parentDeptId" required>
                <DeptSelect placeholder="根节点" isId disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="科室名称"
                name="deptName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="科室编码"
                name="deptCode"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="科室位置" name="deptPosition">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="科室类型"
                name="deptTypeId"
                rules={[{ required: true }]}
              >
                <DictSelect dictType="dept-type" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="报告顺序"
                name="reportSort"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} max={99999} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="科室区域" name="deptRegion">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否出报告"
                name="isReport"
                rules={[{ required: true }]}
              >
                <DictSelect dictType="dict-yes-and-no" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="状态"
                name="isEnable"
                rules={[{ required: true }]}
              >
                <DictSelect dictType="dict-use-status" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否分诊"
                name="isTriage"
                rules={[{ required: true }]}
              >
                <DictSelect dictType="dict-yes-and-no" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否导检"
                name="joinCheck"
                rules={[{ required: true }]}
              >
                <DictSelect dictType="dict-yes-and-no" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="正常小结" name="summary" labelCol={{ span: 3 }}>
                <Input.TextArea rows={4} maxLength={200} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="备注" name="remarks" labelCol={{ span: 3 }}>
                <Input.TextArea rows={4} maxLength={400} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default Page;
