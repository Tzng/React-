import React from 'react'
import { Row, Col, Card } from 'antd';
import ReactDOM from 'react-dom'
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import BreadcrumbCustom from "../BreadcrumbCustom";

class TextEditor extends React.Component {

    render () {

        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '<p>请输入内容</p>',
            onChange: this.handleChange,
            onRawChange: this.handleRawChange
        }

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="国内的富文本"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="富文本编辑器" bordered={false}>
                                <BraftEditor {...editorProps}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )

    }

    handleChange = (content) => {
        console.log(content)
    }

    handleRawChange = (rawContent) => {
        console.log(rawContent)
    }
}

export default TextEditor