import React from "react";
import { MDBContainer, MDBIframe } from "mdbreact";

const IframePage = () => {
    return (
        <MDBContainer className="text-center">
            <MDBIframe src="https://db.argoport.com:5601/app/kibana#/dashboard/b90faa00-e78c-11e9-8acc-f3cddb6dfb41?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-30d%2Cto%3Anow))" height="1250px" />
        </MDBContainer>
    );
}

export default IframePage;
