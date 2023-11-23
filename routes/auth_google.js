var express = require("express");
var router = express.Router();
const { Users } = require("../models");

let { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

/* GOOGLE Login. */
router.get("/", async function (req, res, next) {
  res.redirect(authorizationUrl);
});

/* GOOGLE Callback. */
router.get("/callback", async function (req, res, next) {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const data = await oauth2.userinfo.get();

  if (!data) {
    return res.status(404).json({ message: "tidak ada data user info", data });
  }

  const user = await Users.findOne({
    where: {
      email: data.email,
      // role: constant.ROLES.KARYAWAN,
      // status: constant.STATUS.ACTIVE,
    },
  });

  if (user) {
    const data = {
      email: data.email,
      full_name: data.name,
      // role,
      status: STATUS.ACTIVE,
      // address: "-",
    };

    await Users.create(data);
  }

  // return res.redirect(
  //   `http://localhost:3000/auth-success?token=initestajadulu`
  // );

  return res.status(200).json({ message: "OAUTH2 SUCCESS", data });
});

module.exports = router;
