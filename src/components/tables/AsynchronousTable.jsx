import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';

const columns = [{
    title: '项目名',
    dataIndex: 'username',
    width: 100,
    render: (text, record) => <a href={record.url} target="_blank">{text}</a>
}, {
    title: '语言',
    dataIndex: 'lang',
    width: 80
}, {
    title: 'star',
    dataIndex: 'starCount',
    width: 80
}, {
    title: '描述',
    dataIndex: 'description',
    width: 200
}];

class AsynchronousTable extends React.Component {
    //数据状态
    state = {
        selectedRowKeys: [],  // 选中的行
        loading: false, //数据是否加载完成
        data: [], //数据，初始化为空
    };

    //当组件被加载的时候运行这个方法
    start = () =>{
        //修改状态为正在拿数据
        this.setState({loading: true})
        //使用axios来获取数据
        getPros().then(res => {
            this.setState({
                //得到数据
                data: [...res.data.map(val => {
                    val.key = val.id;
                    //数据赋值，数据重构，把id给key
                    return val;
                })],
                //修改状态
                loading: false
            })
        })
    }

    //在挂载的时候运行
    componentDidMount(){
        this.start();
    }

    //点击事件
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="异步表格" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="异步表格--GitHub今日热门java项目" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AsynchronousTable;