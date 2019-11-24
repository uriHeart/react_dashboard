import React from "react";
import { MDBContainer, MDBIframe } from "mdbreact";

const IframePage = () => {
    return (
        <MDBContainer className="text-center">
            <MDBIframe src={ window.$dashboardUrl } height="1750px" />
        </MDBContainer>
    );
}

export default IframePage;
