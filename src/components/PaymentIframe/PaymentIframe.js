import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import styles from "./PaymentIframe.module.css";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";


function PaymentIframe(props) {
  const {
    totalAmount,
    handleFailedTransaction,
    handleTransactionSuccess,
    handleTransactionInProgress,
    handleSDKLoad,
  } = props;
  const [transactionToken, setTransactionToken] = useState("");
  const iFrameRef = useRef(null);
  const eventType = _.property("data.type");
  const eventValue = _.property("data.value");
  const eventOrigin = _.property("origin");

  const TEKION_SDK_IFRAME_URL = "https://tst-tpay-sdk.tekion.xyz/tpay-sdk-ui/";

  const IFRAME_EVENT_TYPE = {
    TRANSACTION_SUCCESSFUL: "transaction_successful",
    TRANSACTION_FAILURE: "transaction_failure",
    TRANSACTION_IN_PROGRESS: "transaction_in_progress",
    SDK_LOADED: "sdk_loaded",
    TRANSACTION_LOCK: "transaction_lock",
    IFRAME_READY: "iframe_ready",
    IFRAME_PROPS: "iframe_props",
  };
  const ACCEPTED_ORIGINS = "*";

  const getTransactionToken = async () => {
    axios
      .post(
        "https://tst-tpay-sdk.tekion.xyz/api/tpay-sdk-api/p/v1/transactions/initiate",
        {
          amount: totalAmount * 100,
          currency: "USD",
          idempotencyKey: uuidv4(),
          notes: "test-notes",
          clientOrderId: "client-order-id-1",
          surchargeDisabled: true,
          metadata: {
            key1: "value1",
          },
          enablePaymentModes: [],
          disablePaymentModes: [],
          payerDetails: {
            customerName: "Test Name",
            customerEmail: "hpandey@tekion.com"
        }
        },
        {
          headers: {
            "x-client-id": "tpay_oBuYibDweO",
            "x-client-secret":
              "cskstg_2ZZsu7Xh9yJ2cGg5cXQZ314LJe5DGj2naJLGv+sz",
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          const token = _.get(response, "data.data.transactionToken");
          setTransactionToken(token);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getTransactionToken();
  }, []);

  const windowMessageHandler = (iFrameRef) => (event) => {
    if (_.includes(TEKION_SDK_IFRAME_URL, eventOrigin(event))) {
      switch (eventType(event)) {
        case IFRAME_EVENT_TYPE.SDK_LOADED:
          handleSDKLoad();
          break;
        case IFRAME_EVENT_TYPE.TRANSACTION_SUCCESSFUL:
          handleTransactionSuccess();
          break;
        case IFRAME_EVENT_TYPE.TRANSACTION_FAILURE:
          handleFailedTransaction();
          break;
        default:
          handleTransactionInProgress();
          break;
      }
    }
  };

  const addIframeListener = (iFrameRef) => {
    if (typeof window === "undefined") return;
    window.addEventListener("message", windowMessageHandler(iFrameRef));
  };

  const postMessageToIframe = (type, iFrameRef, value, data) =>
    iFrameRef?.current?.contentWindow?.postMessage(
      { type, value, ...data },
      ACCEPTED_ORIGINS
    );
  const onLoad = () => {
    addIframeListener(iFrameRef);
    postMessageToIframe(IFRAME_EVENT_TYPE.IFRAME_PROPS, iFrameRef, {
      transactionToken,
      loader: false,
      locale: "en_US",
      successUrl: "http://localhost:3001/process",
      cancelUrl: "https://paytek-cars.netlify.app/cart",

    });
  };

  return (
    transactionToken !== "" && (
      <iframe
        ref={iFrameRef}
        className={styles.iframe}
        src={`${TEKION_SDK_IFRAME_URL}`}
        title={"Tpay-SDK"}
        onLoad={onLoad}
      />
    )
  );
}

export default PaymentIframe;
