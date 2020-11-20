import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethodAsync } from "../redux/cart/cart.actions";
import CheckoutSteps from "../components/CheckoutSteps";
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=/shipping`);
    } else if (!shippingAddress) {
      history.push(`shipping/`);
    }
  }, [userInfo, history, shippingAddress]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethodAsync(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
