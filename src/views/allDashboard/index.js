import React from "react";
import { MDBContainer, MDBIframe } from "mdbreact";

const IframePage = () => {
    return (
        <MDBContainer className="text-center">
            <MDBIframe src={ window.$totalDashboardUrl } height="1650px" />
        </MDBContainer>
    );
}

export default IframePage;
