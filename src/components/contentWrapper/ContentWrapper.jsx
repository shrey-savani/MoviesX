import React from 'react'
import "./style.scss"

//Higher Order Component
const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper