// const sanityClient = require('./SanityClient')

import * as functions from "firebase-functions";
import {sanityClient} from "./SanityClient";

import multer from "multer";
// import {config} from "firebase-functions";
import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";

// const functions = require("firebase-functions");

// const express = require("express");
// const sgMail = require("@sendgrid/mail");
// eslint-disable-next-line max-len
const API_KEY = functions.config() && functions.config().sendgrid ?
  functions.config().sendgrid.api_key : process.env.SENDGRID_API_KEY;

sgMail.setApiKey(API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const httpFetch = require("node-fetch");

/** direct from firebase * */
// type firebaseDecodedToken = {
//   name: string;
//   iss: string;
//   aud: string;
//   auth_time: string;
//   user_id: string;
//   sub: string;
//   iat: number;
//   exp: number;
//   email: string;
//   picture: string;
//   email_verified: boolean;
//   firebase: { identities: { email: [] }; sign_in_provider: string };
//   uid: string;
//   admin: boolean;
// };

/** a user from the users table in the AWdb NOT to be confused with the user
 * from firebase authentication * */
// type firebaseAwUser = {
//   firebaseUUID: string;
//   username: string;
//   admin: string;
//   email: string;
//   getIdToken: any;
//   photoURL: string
// };

/** Here we are configuring express to use body-parser as middle-ware.
 * for POST commands * */
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

/** Enable cors on the server * */
const upload = multer();
const app = express();
app.use(cors({
  origin: "https://neonscenecreator.com/",
  optionsSuccessStatus: 200,
}));

// const Busboy = require('busboy');
app.use(upload.array(""));

// const admin = require("firebase-admin");
// const cmsClient = require("../../lib/cmsClient");
// const serviceAccount: ServiceAccount = {
//   // type: 'service_account',
//   projectId: "anybodywalking-e68e6",
//   // private_key_id: '6daf76ff51b9d1f31e2c3a8318cf8ff85356ccdc',
//   privateKey:
// eslint-disable-next-line max-len
//     "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpXfH8PCgo4fuL\nSLvAlb6fKTnLNI9zqPj1xoBB2SyR5KpqZe+QRIeDeXUVEEjLL8TnNYV+C6ZEnIeL\nSQXFIC8YddQuALLbZ1vc/gJHvA8kW8MNkBlon0UdY5J7w3wogqFjsepNzIfU5qfD\nncIQ3yeJj22kX/jKMSL16b5z7oBtmlhGSix4HAH0eTkWe6xhHyDznCWtOi8cbsci\nOQ9tx6qucxy8dBPOUSjWMZ8Avq56igqoDQKJgxu4CwMZeYIg+ajIQMnH58ulq5XC\nztZses4yeB1OGKSTKNyy3JqOosKKLWo7IVpKqy+zjeb1IhrVKB/Q6U4b6EeXAh2S\nN8Sfq3qfAgMBAAECggEAD1ymYpgw6vxhrNGCY3EcTXgXdjdPPPtk5s4EEMpFAPqk\n+7+WihcH1O9YT6Uez9Hbtz5N3GVBcH8OIEkVoo/3wEKNEJse80hIYclm+uCziDsL\n0cLHOzZvC2peUqbO2nx2wlcp3GKifgy/HL7GEnJbNglHYEhq2tQNdWan0ADLBKXR\nljubcC/c7bDZgb0RWiXfqF4jSUXl40uyqW3GEfHMgHjxFlRH23rshUiOENTJxKc8\nb4dTmv6iaFfvwwE7Vm/vuQh6r7x5KDmzQGAw360pDgpG/ArYwPygXUi9hFXbpQQr\nPNfuV5D7HZ/rM+Hle6EWspp6JZpFERhDbA4EMfTDQQKBgQDn8nGL6MFsypJ9H3+B\n9Muu6TUsqBCsfciCS7f6196VlzDBphbbSWqtxxAzjUuQPSoHyEUN8U5hykLT7IBn\ntL0pLuB0g39rLiWXpPoeLuAKdeMxM1Ebn2SUFS0CT3nXB8GsB0J0cVJkk7aIZgjF\nmF9r2LYTFO6D0HrmhC4qeMRCIQKBgQC67iw/S+2ItUJBfOHDIG78zdEd/xFJJYz9\nqIinJu84vO4jIfY6H3XGvwnY86ZXU5jXKF9MephDgxPnjx8LTnOPE1hzHgAILgP4\nMuZlEjTpAk5V7uqkiT9haV7L856xTb6bFrjRvo9i680rjGVX7Y+C5tKSbxPVhHb4\nn7KC8MGkvwKBgEFRrVhRO+d/RLGn5Sib36BqXGcvDUMGSSkoWa9yi2RlJ33hYB5x\nFnHJ1W4vJFCCaQu4AnpiskgnxZoYyDBsXbjzUpJ9VazBWiTSeP13BfDsMgbxBK5a\nvOBW9k3oQ8+ih5ACm1xfbWyVjJns4huDRZwBc4T8KA9G7tVr8/RR/jMBAoGBAJgQ\nYlxHZv77/N8LORijzMXIpGHTeftYGb7LmAbqDFbKkqpv2T7lEslP5THg2yNU9ROq\nWwP7AtyAx/NqISXwdt8gLKbQ89OzozUIKxZzXili39jWF3kr0SxsLFqbXy/6/6Bo\nNochjsE481mGx3Zk4YbqQMgwpiDetm2AdBZCxjQ/AoGBAI3K1+rPyTXeiMzGAE77\ndQxNYy4RYqidgyIxPdMxnGVciMpaVSIOERj9sF5timjo4KNHO4njm53mZ4yAnSD7\nGOmKYSEg5YgE8oRA2xvwtxH0CAU6XYcqYAQ+o8AQv2iEIJ+n4G3+uWchpmqGpMqx\nBSv05eC8YEFUgUiNgaac1xXH\n-----END PRIVATE KEY-----\n",
//   clientEmail:
//     "firebase-adminsdk-le6e1@anybodywalking-e68e6.iam.gserviceaccount.com",
//   // client_id: '107172293785194315216',
//   // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   // token_uri: 'https://oauth2.googleapis.com/token',
//   // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   // client_x509_cert_url:
//   //   'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-le6e1%40anybodywalking-e68e6.iam.gserviceaccount.com',
// };

// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount),
// databaseURL: "https://anybodywalking-e68e6.firebaseio.com",
// });


export type SanityContactUs = NeonContactUs

export type NeonContactUs = {
  _id?:string,
  name?: string,
  companyName?: string,
  email?: string,
  phone?: string,
  comment?: string,
  iAgree?: boolean,
}

// eslint-disable-next-line max-len
const NEON_CONTACT_US_SENDGRID_TEMPLATE_ID = "d-71c08e9f91904f20b10af7c7a03b5fb7";

// eslint-disable-next-line max-len
export const fetchContactUsById = (newlyCreatedObjId: string): Promise<SanityContactUs> =>
  sanityClient.fetch(
      `*[_type=="contactUs" && _id == $newlyCreatedObjId]{
          _id,
          name,
          companyName,
          email,
          phone,
          comment,
          iAgree
       }[0]`, {newlyCreatedObjId}
  ).then((data: SanityContactUs) => data);

enum responseCodes {
  EMAIL_SUCCESS = "000",
  EMAIL_FAIL = "400",
  NO_NEW_CONTACTS = "001",
  APPLICATION_ERROR = "401"
}

// Accepts payloads from Sanity hooks shaped below.
// Payload expected from Sanity Webhook
// POST /your-endpoint HTTP/1.1
//
// Host: your-host.org
// Connection: close
// Accept-Encoding: gzip
// Content-Length: 303
// Content-Type: application/json
//
//
// {
//   "transactionId": "28711ce3-07c4-4c8f-8577-fc8f3c4cbde0",
//   "projectId": "3do82whm",
//   "dataset": "production",
//   "ids": {
//   "created": [],
//     "deleted": [],
//     "updated": [
//     "4f0d7277-ac0d-4bfe-ae97-dd4e2378ddaf"
//   ],
//     "all": [
//     "4f0d7277-ac0d-4bfe-ae97-dd4e2378ddaf"
//   ]
// }
// }
app.post("/send-contact-us", (req: any, res: any) => {
  const reqBody: { ids: { created: string[] } } = req.body;

  const newSanityObjects = reqBody.ids.created;
  // eslint-disable-next-line max-len
  console.log("Sanity changes/updates hook", JSON.parse(JSON.stringify(reqBody)));

  for (let i = 0; newSanityObjects && i < newSanityObjects.length; i++) {
    fetchContactUsById(newSanityObjects[i])
        .then((newContact: (NeonContactUs)) => {
          if (newContact) {
            const toAddress = "hello@thehandsomestnerd.com";

            const msg = {
              to: toAddress,
              from: "hello@thehandsomestnerd.com",
              dynamic_template_data: {
                _id: newContact._id,
                name: newContact.name,
                email: newContact.email,
                companyName: newContact.companyName,
                phone: newContact.phone,
                comment: newContact.comment,
                iAgree: newContact.iAgree,
              },
              templateId: NEON_CONTACT_US_SENDGRID_TEMPLATE_ID,
            };
            console.log("Sending with Sendgrid...", msg);
            sgMail
                .send(msg)
                .then(() => {
                  console.log("Email Contact Us sent.", newContact);
                  res.status(200).json({
                    status_code: responseCodes.EMAIL_SUCCESS,
                    status: "Sendgrid Success: Email sent for ",
                    response: newContact,
                  });
                })
                .catch((error: any) => {
                  console.error("Sendgrid Error: ", error);
                  res.status(400).json({
                    status_code: responseCodes.EMAIL_FAIL,
                    status: "Sendgrid Error: No email sent for request ",
                    request: msg,
                    error: error,
                  });
                });
          } else {
            console.log("No new contacts", newContact);

            res.status(200).json({
              status_code: responseCodes.NO_NEW_CONTACTS,
              // eslint-disable-next-line max-len
              status: "No new contact requests found in the updates from sanity",
            });
          }
        }).catch((error: any) => {
          console.log("ERROR:", error, req);
          res.status(200).json({
            status_code: responseCodes.APPLICATION_ERROR,
            status: "Application Error: ",
            request: req,
            error,
          });
        });

    res.status(200).json({
      status_code: responseCodes.NO_NEW_CONTACTS,
      status: "Sanity changes processed but no new contact requests found",
    });
  }
});

exports.app = functions.https.onRequest(app);
