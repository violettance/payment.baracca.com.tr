import React, { useState } from 'react';
import logo from './logo-black.png';
import './App.css';
import 'antd/dist/antd.css';
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { css } from 'styled-components';
import { Form, Input, Typography, Statistic, Row, Col, Button } from 'antd';
const { Title } = Typography;

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const invoices = {
  1111: {
    company: 'Ultra Turizm',
    date: '01.04.2020',
    amount: 300
  },
  2222: {
    company: 'Ultra Turizm',
    date: '31.03.2020',
    amount: 5000
  },
  3333: {
    company: 'Ultra Turizm',
    date: '02.04.2020',
    amount: 1490
  }
};

function App() {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [fetchingInvoice, setFetchingInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleChangeCardNumber = e => setCardNumber(e.target.value);
  const handleChangeExpiryDate = e => setExpiryDate(e.target.value);
  const handleChangeCVC = e => setCvc(e.target.value);

  const {
    getCardNumberProps,
    getCardImageProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps
  } = usePaymentInputs();

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
          <Title level={2} style={{ color: '#9b312b' }}>
            payment
          </Title>
        </div>
      </header>
      <div className="content">
        <Form>
          <Form.Item
            hasFeedback
            validateStatus={
              fetchingInvoice
                ? 'validating'
                : invoice === false
                ? 'error'
                : undefined
            }
            help={invoice === false ? 'Invoice not found!' : undefined}
          >
            <Input
              size="large"
              type="text"
              name="invoice"
              placeholder="Please enter your invoice number"
              disabled={fetchingInvoice}
              value={invoiceNo}
              onChange={e => {
                const {
                  target: { value }
                } = e;

                setInvoiceNo(value);

                if (value.length >= 4) {
                  setFetchingInvoice(true);

                  sleep(2000).then(() => {
                    const invoice = invoices[value];
                    setFetchingInvoice(false);
                    if (invoice) setInvoice(invoice);
                    else setInvoice(false);
                  });
                }
              }}
            />
          </Form.Item>
        </Form>

        {invoice && (
          <div>
            <Row>
              <Col span={24}>
                <Statistic title="Date" value={invoice.date} />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col span={8}>
                <Statistic title="Company" value={invoice.company} />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Amount (EUR)"
                  value={invoice.amount}
                  precision={2}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Amount (TRY)"
                  value={invoice.amount * 7.5}
                  precision={2}
                />
              </Col>
            </Row>
            <Row>


            <PaymentInputsWrapper
              {...wrapperProps}
              styles={{
                fieldWrapper: {
                  base: css`
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                  `
                },
                inputWrapper: {
                  base: css`
                    border-color: green;
                  `,
                  errored: css`
                    border-color: maroon;
                  `,
                  focused: css`
                    border-color: unset;
                    box-shadow: unset;
                    outline: 2px solid blue;
                    outline-offset: 2px;
                  `
                },
                input: {
                  base: css`
                    color: green;
                  `,
                  errored: css`
                    color: maroon;
                  `,
                  cardNumber: css`
                    width: 16rem;
                  `,
                  expiryDate: css`
                    width: 8rem;
                  `,
                  cvc: css`
                    width: 5rem;
                  `
                },
                errorText: {
                  base: css`
                    color: maroon;
                  `
                }
              }}
            >
              <svg {...getCardImageProps({ images })} />
              <input
                {...getCardNumberProps({ onChange: handleChangeCardNumber })}
                value={cardNumber}
              />

              <input
                {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
                value={expiryDate}
              />
              <input
                {...getCVCProps({ onChange: handleChangeCVC })}
                value={cvc}
              />
            </PaymentInputsWrapper>
            </Row>
            <Row>
              <Col span={24}>
                <Button size="large" style={{ marginTop: 16 }} type="primary" shape="round">
                  Pay ( {invoice.amount * 7.5 }₺ )
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
