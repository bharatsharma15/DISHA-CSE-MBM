import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import APIData from "../../lib/useAPIData";
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
  crossOrigin="anonymous"
></link>;
import {
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
  Col,
  Alert,
} from "react-bootstrap";
import Head from "next/head";

function Certificate(props) {
  const [certData, setCertData] = useState(props.certData);
  const [reqFailed, setReqFailed] = useState(props.reqFailed);

  //console.log(certData);

  const getAlertMessage = () => {
    if (!!reqFailed) {
      switch (reqFailed) {
        case 1:
          return "Invalid certificate number. Please go back and search again!";
        case 2:
          return "Server not reachable. Please refresh the page and try again!";
        case 3:
          return "No matching record for this certificate number. Please go back and try again!";
        default:
      }
    }
    return "Something went wrong. Kindly reload the page!";
  };

  let alert = "";
  if (!!reqFailed) {
    alert = (
      <Alert
        key="alert-msg"
        variant="danger"
        onClose={() => setReqFailed(0)}
        dismissible
      >
        {getAlertMessage()}
      </Alert>
    );
  }

  const getCertificateString = () => {
    if (!certData) return null;
    else {
      let retString = certData?.EventID?.CertificateTemplate;

      retString = retString.replace(
        /\{CandidateName\}/g,
        certData?.CandidateName
      );
      retString = retString.replace(
        /\{CandidateClass\}/g,
        certData?.CandidateClass
      );
      retString = retString.replace(
        /\{CandidateInstitute\}/g,
        certData?.CandidateInstitute
      );
      retString = retString.replace(
        /\{CandidatePosition\}/g,
        certData?.CandidatePosition
      );
      retString = retString.replace(
        /\{CertificateType\}/g,
        certData?.CertificateType
      );
      retString = retString.replace(
        /\{CertificateNumber\}/g,
        certData?.CertificateNumber
      );
      retString = retString.replace(
        /\{EventDates\}/g,
        certData?.EventID?.EventDates
      );
      retString = retString.replace(/\{DateOfIssue\}/g, certData?.DateOfIssue);
      retString = retString.replace(/\{id\}/g, certData?.id);
      console.log(retString);
      return retString;
    }
  };
  const getCertificateStyle = () => {
    console.log("rendering style");
    if (!certData) return null;
    else {
      if (!!certData?.EventID?.CustomCSS) {
        return `${certData?.EventID?.CustomCSS}
                
            `;
        //let retString =
        // const style = document.createElement("style");
        // style.innerHTML = retString;
        // document.head.appendChild(style);
      }
      return "";
    }
  };

  return (
    <>
      <Head>
        <style>{getCertificateStyle()}</style>
        <link media="print" rel="Alternate" href="mbm-certificate.pdf"></link>
      </Head>
      <Container>
        {alert}
        <div className="d-flex mt-4 mb-5 pt-3 justify-content-end d-print-none">
          <Button
            className="btn btn-dark px-4 mx-2"
            onClick={() => {
              window.print();
            }}
          >
            Print/Save Certificate
          </Button>
        </div>
        <div
          className="certificate-container"
          dangerouslySetInnerHTML={{ __html: getCertificateString() }}
        ></div>
      </Container>
    </>
  );
}

export default Certificate;

export async function getServerSideProps({ params }) {
  let reqFailed = 0;
  const setReqFailed = (val) => {
    reqFailed = val;
  };
  let certData = null;
  const setCertData = (val) => {
    certData = val;
  };
  const certId = params.certId;
  const { getItems } = APIData();
  if (!!certId) {
    await getItems(
      "certificates",
      "id,status,CandidateName,CandidateClass,CandidateInstitute,CandidatePosition,CertificateType,CertificateNumber,DateOfIssue,EventID.CertificateTemplate,EventID.CustomCSS,EventID.EventDates",
      1,
      1,
      {
        //EventID.EventName,EventID.EventYear,EventID.OrganizedBy,EventID.EventDates
        _and: [
          {
            id: {
              _eq: certId,
            },
          },
          {
            status: {
              _eq: "published",
            },
          },
        ],
      },
      undefined,
      undefined,
      false,
      true
    ).then((data) => {
      if (!!data) {
        //console.log("Check1",data);
        if (data.data?.length && data.data?.length > 0) {
          const recdData = data.data[0];
          //console.log(recdData);
          setCertData(recdData);
        } else setReqFailed(3); //Blank response from server
      } else {
        setReqFailed(2); // API Request Failed
      }
    });
    return {
      props: { certData: certData, reqFailed: reqFailed },
    };
  } else setReqFailed(1);

  return {
    props: { certData: null, reqFailed: 2 },
  };
}
