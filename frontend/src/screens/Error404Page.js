import React from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
const Error404Page = ({ location }) => {
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Message variant="danger">
        Error 404 : Requested Page {location.pathname} does not exists
      </Message>
    </>
  );
};

export default Error404Page;
