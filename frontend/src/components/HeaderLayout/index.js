import React from "react";
import "../../index.css";
import {
    Layout,
    Button,
    Row,
    Col,
    Tooltip,
    Popover,
    Space,
} from "antd";
// import logo from "../../assets/favicon.ico";
import {
    UserOutlined,
    InfoCircleOutlined,
    LogoutOutlined,
} from "@ant-design/icons";



const { Header, Sider } = Layout;

export const HeaderLayout = (props) => {
    // const mapRef = props.mapRef;


    const text = <p className="mt24 align-center txt-bold">shihab.hossain</p>;
    const content = (
        <div className="align-center">
            <Space direction="vertical">
                <Tooltip title="Help">
                    <Button shape="circle" icon={<InfoCircleOutlined />} />
                </Tooltip>


                <Tooltip title="Logout">
                    <Button shape="circle" icon={<LogoutOutlined />} />
                </Tooltip>
            </Space>
        </div>

    );



    return (
        <Header
            style={{
                height: "75px",
                borderBottom: "0px solid #d21d55",
                margin: 0,
                padding: 0,
                zIndex: 2,
                backgroundColor: "white",
                boxShadow:
                    "0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
            }}
            className="header"
        >
            <Layout
                style={{ margin: 0, padding: 0, background: "rgba(0, 0, 256, 0)" }}
            >
                <Sider
                    width={360}
                    style={{
                        paddingLeft: "20px",
                        paddingTop: "2px",
                        backgroundColor: "white",
                    }}
                >
                    <div>
                        {/* <img src={logo} alt="logo" height={40} /> */}
                        <h2 style={{ fontFamily: "roboto", fontWeight: "bold", color: "#851e3e" }}>Routing Benchmarker</h2>
                    </div>
                </Sider>

                <Layout style={{ background: "rgba(0, 0, 256, 0)" }}>
                    <Row style={{ marginLeft: 20 }}>
                        <Col span={18}>
                            <div>
                            </div>
                        </Col>
                        <Col span={6} style={{ padding: "0px" }}>
                            <Popover placement="bottomRight" title={text} content={content}>
                                <Button
                                    type="default"
                                    shape="circle"
                                    icon={<UserOutlined />}
                                    size="large"
                                    style={{ float: "right", marginTop: 15, marginRight: 15 }}
                                />
                            </Popover>
                        </Col>
                    </Row>
                </Layout>
            </Layout>
        </Header>
    );
};
