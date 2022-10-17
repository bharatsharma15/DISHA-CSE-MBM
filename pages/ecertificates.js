import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import APIData from "../lib/useAPIData";
import {
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
  Col,
  Alert,
} from "react-bootstrap";
import NProgress from "nprogress"; //nprogress module

function Home(props) {
  const [certNo, setCertNo] = useState("");
  const [certData, setCertData] = useState(null);
  const [reqFailed, setReqFailed] = useState(0);
  const { getItems } = APIData();

  const onValueChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "certNo") {
      setCertNo(value);
      setReqFailed(0);
    }
  };

  const getData = () => {
    setReqFailed(0);
    setCertData(null);
    if (!!certNo) {
      NProgress.start();
      getItems(
        "certificates",
        "id,status,CandidateName,CandidateClass,CandidateInstitute,CandidatePosition,CertificateType,CertificateNumber,DateOfIssue,EventID.ID,EventID.EventName,EventID.EventYear,EventID.EventDates",
        1,
        1,
        {
          _and: [
            {
              CertificateNumber: {
                _eq: certNo,
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
        false
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
      NProgress.done();
    } else setReqFailed(1); // Certificate No. not entered
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      form.classList.add("was-validated");
    } else {
      getData();
    }
  };

  const getAlertMessage = () => {
    if (!!reqFailed) {
      switch (reqFailed) {
        case 1:
          return "Enter certificate number first!";
        case 2:
          return "Server not reachable. Please refresh the page and try again!";
        case 3:
          return "No matching record for this certificate number. Check the input value and try again!";
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
  } else if (!!certData) {
    alert = (
      <Alert
        key="alert-msg"
        variant="success"
        onClose={() => {
          setReqFailed(0);
          setCertData(null);
        }}
        dismissible
      >
        <Alert.Heading>Certificate is Valid!</Alert.Heading>
        <p>
          This Certificate of {certData?.CertificateType?.toUpperCase()} was
          issued on {certData?.DateOfIssue} <br />
          to {certData?.CandidateName} ({certData?.CandidateClass})<br />
          from {certData?.CandidateInstitute} <br />
          during {certData?.EventID?.EventName} ({certData?.EventID?.EventYear}
          ).
        </p>
        <hr />
        <p className="mb-0">
          <Link href={`./certificate/${certData?.id}`}>
            Download Certificate
          </Link>
        </p>
      </Alert>
    );
  }

  return (
    <>
      <div className="certiForm-container">
        <Container>
          <h2> Enter your certificate number below!</h2>
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="text-justify pt-4"
          >
            <Row>
              <Col className="col-12 col-lg-6">
                <FloatingLabel
                  controlId="formBasicEmail"
                  label="Certificate Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Certificate Number"
                    required
                    name="certNo"
                    value={certNo}
                    onChange={onValueChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Certificate Number is required.
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="primary" type="submit" className="btn-large">
                  Get Certificate
                </Button>
              </Col>
              <Col className="col-12 col-lg-6 mt-3 mt-lg-0">{alert}</Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Home;
