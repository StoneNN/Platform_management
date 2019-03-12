/*
 * @Author: Nxf
 * @Description:
 * @Date: 2019-03-02 16:30:29
 * @LastEditTime: 2019-03-02 17:11:20
 */

import React, { Component }  from "react";
import { Table, Divider, Form, Button, Input, Modal, Select } from "antd";
import {connect} from 'dva';


const FormItem = Form.Item;
const Option = Select.Option;


class SearchForm extends Component {

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
                  type:'player/search',
                  payload:values,
              })
          }
      });
  }
  handleFormReset = ()=>{
    console.log('--------- resetFields ------------');
    //清空输入框
      this.props.form.resetFields();
    //重新拉取数据
      this.props.handleFormReset();
  }
  render(){
      const { getFieldDecorator } = this.props.form;
      const { handleFormReset } = this.props;
      console.log('----- SearchForm handleFormReset -----',handleFormReset);

      return (
          <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="牌手姓名" >
                  {getFieldDecorator('realName', { })( <Input placeholder="牌手姓名"/>)}
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
SearchForm = connect(({player})=>({player}))(SearchForm);



class PlayersTableBlock extends Component{

    constructor(props){
      super(props)
      this.state={
          selectedRows : [],
          visible:false,
          isAdding:false,
          currentRowData:{}
      }
    }

    // 拉取数据
    fetchData=()=>{
       this.props.dispatch({
         type:'player/fetch'
       })
    }
    componentDidMount(){
      this.fetchData();
    }
    //显示弹窗
    showAddModal = () =>{
      this.setState({
          isAdding:true,
          visible: true,
      })
    }
    //关闭弹窗
    handleCancel = (e) => {
        this.setState({
          visible: false,
      });
  }
    //新建player
    handleAdd = () => {
      const { dispatch,form } = this.props;
      form.validateFields((err, values) => {
          if (err) return;
          this.setState({
              visible: false,
          });
          console.log(values)
          dispatch({
              type:'player/add',
              payload:values
          })
      })
    }
    render(){
      const columns = [{
        title:'会员号',
        dataIndex:'memberNo',
        key:'memberNo',
        align:'center'
      },{
        title:'昵称',
        dataIndex:'nickName',
        key:'nickName',
        align:'center'
      },{
        title:'真实姓名',
        dataIndex:'realName',
        key:'realName',
        align:'center'
      },{
        title:'性别',
        dataIndex:'gender',
        key:'gender',
        align:'center'
      },{
        title:'电话',
        dataIndex:'phoneNo',
        key:'phoneNo',
        align:'center'
      },{
        title:'操作',
        dataIndex:'playerManage',
        key:'playerManage',
        align:'center',
        render:(text,record) =>(
          <span>
            <a href= "# ">编辑</a>
            <Divider type="vertical"></Divider>
            <a href= "# ">删除</a>
          </span>
        )
      }];
      const {player:{dataList}, form:{getFieldDecorator}} = this.props;
      const {visible,isAdding,currentRowData} = this.state;
      console.log(dataList);
      const modalFooter =
        isAdding ? { okText: '添加', onOk: this.handleAdd, onCancel: this.handleCancel}
            : { okText: '保存', onOk: this.handleEdit, onCancel: this.handleCancel };

        const getModalContent = () => {

            const prefixSelector = getFieldDecorator('prefix', {
              initialValue: '86',
            })(
              <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
            );
            if(isAdding){
                console.log('-------- isAdding-新建 --------');
                return (
                <Form >
                    <FormItem label="会员号" >
                    {getFieldDecorator('memberNo', {
                        rules: [{ required: true, message: '请输入会员号' }],
                    })(<Input placeholder="会员号" />)
                    }
                    </FormItem>
                    <FormItem label="昵称" >
                    {getFieldDecorator('nickName', {
                        rules: [{ required: true, message: '请输入昵称' }],
                    })(<Input placeholder="昵称" />)
                    }
                    </FormItem>
                    <FormItem label="真实姓名" >
                    {getFieldDecorator('realName', {
                        rules: [{ required: true, message: '请输入真实姓名' }],
                    })(<Input placeholder="真实姓名" />)
                    }
                    </FormItem>
                    <FormItem label="性别" >
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请选择性别' }],
                    })(
                            <Select placeholder="请选择">
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                            </Select>)
                    }
                    </FormItem>
                    <Form.Item label="联系电话" >
                      {getFieldDecorator('phoneNo', {
                        rules: [{ required: true, message: '请输入联系电话' }],
                      })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="联系电话"/>
                      )}
                    </Form.Item>
                    <Form.Item label="E-mail" >
                      {getFieldDecorator('email', {
                        rules: [
                          { type: 'email', message: '输入的格式不对,请重输' },
                          { required: true, message: '请输入邮箱' }
                        ],
                      })(
                        <Input placeholder="邮箱" />
                      )}
                    </Form.Item>
                    <FormItem label="微信号" >
                    {getFieldDecorator('weChat', {
                        rules: [{ required: false, message: '请输入微信号' }],
                    })(<Input placeholder="微信号" />)
                    }
                    </FormItem>
                    <FormItem label="QQ号" >
                    {getFieldDecorator('qq', {
                        rules: [{ required: false, message: '请输入QQ号' }],
                    })(<Input placeholder="QQ号" />)
                    }
                    </FormItem>
                    <FormItem label="住址">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入居住地址' }]
                        })(<Input placeholder="住址" />)}
                    </FormItem>
                </Form>
            );
            }else{
                console.log('-------- isAdding-编辑 --------');
                return (
                  <Form >
                    <FormItem label="主办方名称" >
                    {getFieldDecorator('name', {
                        initialValue:currentRowData.name,
                        rules: [{ required: true, message: '请输入主办方名称' }],
                    })(<Input placeholder="主办方名称" />)
                    }
                    </FormItem>
                    <FormItem label="主办方类型" >
                    {getFieldDecorator('type', {
                        initialValue:currentRowData.type === 0 ? '协会':'俱乐部',
                        rules: [{ required: true, message: '请输入主办方类型' }],
                    })(
                            <Select placeholder="请选择" style={{ width: '200px' }}>
                                <Option value="0">协会</Option>
                                <Option value="1">俱乐部</Option>
                            </Select>)
                    }
                    </FormItem>
                    <FormItem label="负责人" >
                    {getFieldDecorator('owner', {
                        initialValue:currentRowData.owner,
                        rules: [{ required: true, message: '请输入负责人姓名' }],
                    })(<Input placeholder="负责人姓名" />)
                    }
                    </FormItem>
                    <FormItem label="联系电话" >
                    {getFieldDecorator('phone', {
                        initialValue:currentRowData.phone,
                        rules: [{ required: true, message: '请输入负责人联系电话' }],
                    })(<Input placeholder="负责人联系电话" />)
                    }
                    </FormItem>
                    <FormItem label="地址">
                        {getFieldDecorator('address', {
                            initialValue:currentRowData.address,
                            rules: [{ required: true, message: '请输入地址' }]
                        })(<Input placeholder="主办方地址" />)}
                    </FormItem>
                  </Form>
                );
            }
          }
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({
            selectedRows
          });
        }
      };
      return(
          <React.Fragment>
            <SearchForm handleFormReset={this.fetchData} />
            {/* 新建 & 批量删除 */}
            <div style={{ overflow:'hidden',lineHeight:'50px', height:'50px' }} >
              <Button type="primary" disabled={! this.state.selectedRows.length > 0} onClick={this.handleDelete} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                批量删除
              </Button>
              <Button  type="primary" onClick={this.showAddModal} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                添加牌手
              </Button>
            </div>
            <Table
              dataSource={dataList}
              columns={columns}
              rowSelection={rowSelection}
            />
            <Modal
                title={isAdding?'添加':'编辑'}
                width={400}
                cancelText='取消'
                destroyOnClose
                visible={visible}
                {...modalFooter}
                >
                    {getModalContent()}
                </Modal>
          </React.Fragment>

        )
    }
}

PlayersTableBlock = Form.create()(PlayersTableBlock);
PlayersTableBlock = connect(({player})=>({player}))(PlayersTableBlock);

export default PlayersTableBlock;
