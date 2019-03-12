import React from 'react';
import { Table, Form, Button, Input } from 'antd';
import {connect} from 'dva';

const FormItem = Form.Item;

class SearchForm extends React.Component {

constructor(props){
    super(props);
    this.state={

    };
}

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        console.log('------- search_value -------',values);
        if (!err) {
            this.props.dispatch({
                type:'sponsor/search',
                payload:values,
            })
        }
    });
}
handleFormReset = ()=>{
    this.props.form.resetFields();
    // this.props.handleFormReset();
    // console.log(this.props.handleFormReset());
}
render(){
    const { getFieldDecorator } = this.props.form;
    const { handleFormReset } = this.props;
    console.log('----- SearchForm handleFormReset -----',handleFormReset);
    return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem label="赞助商名称" >
                {getFieldDecorator('name', { })( <Input placeholder="赞助商名称"/>)}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                    重置
                </Button>
            </FormItem>
        </Form>)
}

}


SearchForm = Form.create()(SearchForm);
SearchForm = connect(({sponsor})=>({sponsor}))(SearchForm);

 class AdvertiseTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRows : [],
      visible:false,
      isAdding:false
    }
  };

  render(){

    const columns = [
      {
        title: '赞助商名称',
        dataIndex: 'name',
        align: 'center',
        // editable: true,
      }, {
        title: '负责人',
        dataIndex: 'owner',
        align: 'center',
      }, {
        title: '地址',
        dataIndex: 'address',
        align: 'center',
      }, {
        title: '电话',
        dataIndex: 'phone',
        align: 'center',
      }, {
        title: '编辑',
        dataIndex: 'edit',
        align: 'center',
        render: (text, record) => {
          console.log('--- 操作 record --- ',record);
          return (
              <a href="# " style={{marginRight: '10px'}}>编辑</a>
          )
        }
      }
    ];
    const dataSource = [
      {
        key: '0',
        name: '联想集团',
        owner: '张三专心致志销自行丰',
        address: '北京市海淀区海淀路111号',
        phone:'18645659968'
      }, {
        key: '1',
        name: '恒大房地产有限公司',
        owner: '张无忌',
        address: '广州市海港区海港路320号',
        phone:'19956831124'
      }];


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({
            selectedRows
          });
        }

      };
    return (
      <div>
        <SearchForm/>
        {/* 新建 & 批量删除 */}
        <div style={{ overflow:'hidden',lineHeight:'50px', height:'50px' }} >
          <Button type="primary" disabled={! this.state.selectedRows.length > 0} onClick={this.handleDelete} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
            批量删除
          </Button>
          <Button  type="primary" onClick={this.showAddModal} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
            添加赞助商
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}


export default AdvertiseTable;
