import React from "react";
import { Table, Button, Pagination, Input, Form, Space } from "antd";
import _ from "lodash";
import "./table.css";

export default class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      _pageSize: 10,
      current: {},
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
  pagination() {
    const {
      dataSource,
      pageSize,
      showSizeChanger = false, // pageSize切换器
      pageSizeOptions, // 指定每页展示条数
      _pageSize,
      onChange,
      onShowSizeChange,
      showQuickJumper = true,
    } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          total={dataSource.total}
          current={dataSource.current}
          pageSize={pageSize || _pageSize}
          showSizeChanger={showSizeChanger}
          pageSizeOptions={pageSizeOptions}
          showQuickJumper={showQuickJumper}
          showTotal={(total) => `共 ${total} 条`}
          onShowSizeChange={(current, pageSize) => {
            this.setState({ _pageSize: pageSize });
            onShowSizeChange && onShowSizeChange(current, pageSize);
          }}
          onChange={(current) => {
            onChange && onChange(current);
          }}
        />
      </div>
    );
  }
  handleSearch() {
    const { onSearch } = this.state;
    this.form.validateFields().then((value) => {
      onSearch &&
        onSearch(
          typeof value.searchText === "string"
            ? value.searchText.trim()
            : value.searchText
        );
    });
  }
  render() {
    const {
      dataSource,
      columns = [],
      noFooter,
      handleAdd,
      id,
      rowKey,
      onSearch,
      searchText = "搜索",
      placeholder,
      maxLength = 40,
      emptyText,
      onRowClick,
      current,
      tableHeader,
      handleDelAll,
      addtext,
      deltext,
      buttonList,
      scrollY = 610,
      ...otherProps
    } = this.state;
    return (
      <div className="page">
        {tableHeader && tableHeader}
        {(onSearch || handleAdd || handleDelAll || buttonList) && (
          <div className="head">
            {onSearch && (
              <Form ref={(ref) => (this.form = ref)} layout="inline">
                <Form.Item name="searchText">
                  <Input
                    placeholder={placeholder}
                    allowClear
                    maxLength={maxLength}
                    className="input-item"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className="button-item"
                    onClick={() => this.handleSearch()}
                  >
                    {searchText}
                  </Button>
                </Form.Item>
              </Form>
            )}
            <Space>
              {handleAdd && (
                <Button
                  onClick={() => handleAdd && handleAdd()}
                  type="primary"
                  className="button-item"
                >
                  {addtext || "新增"}
                </Button>
              )}
              {handleDelAll && (
                <Button
                  onClick={() => handleDelAll && handleDelAll()}
                  type="primary"
                  danger
                  className="button-item"
                >
                  {deltext || "批量删除"}
                </Button>
              )}
              {buttonList &&
                buttonList.map((item, key) => (
                  <Button
                    key={`button${key}`}
                    type="primary"
                    style={item.style}
                    onClick={() => item.onClick()}
                    className="button-item"
                  >
                    {item.text}
                  </Button>
                ))}
            </Space>
          </div>
        )}
        <div className="main">
          <Table
            id={id}
            bordered
            loading={!dataSource}
            rowKey={rowKey || "id"}
            dataSource={(dataSource || {}).records}
            columns={columns}
            rowClassName={(record, index) => {
              if (record[rowKey || "id"] === current[rowKey || "id"]) {
                return "rowClassName";
              }
              return "";
            }}
            footer={() =>
              !noFooter &&
              ((dataSource || {}).records || []).length !== 0 &&
              this.pagination()
            }
            onRow={(record) => ({
              onClick: () => {
                onRowClick && this.setState({ current: record });
                onRowClick && onRowClick(record);
              },
            })}
            scroll={{ x: _.sum(_.map(columns, "width")), y: scrollY }}
            pagination={false}
            locale={{ emptyText }}
            {...otherProps}
          />
        </div>
      </div>
    );
  }
}
