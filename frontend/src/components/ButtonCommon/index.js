import React from "react";
import { Button } from 'antd';
import "./index.css";

export const ButtonCommon = props => {

    return (
        <Button type={props.type ? props.type : "primary"} shape="round"
            style={{
                width: "100%",
                marginTop: "6px",
                fontWeight: "600",
                fontFamily: "Roboto Condensed",
            }}
            className="merchant-common-button"
            onClick={props.buttonClick}
            disabled={props.isDisable}
        >{props.name}</Button>
    )
}