import React from "react";
import { MDBContainer, MDBIframe } from "mdbreact";

const IframePage = () => {
    return (
        <MDBContainer className="text-center">
            <MDBIframe src="http://15.164.111.122:5601/app/kibana#/dashboard/b90faa00-e78c-11e9-8acc-f3cddb6dfb41?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1y%2Cto%3Anow))" />
        </MDBContainer>
    );
}

export default IframePage;