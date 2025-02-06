const APIDocsAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.setHeader(
      "WWW-Authenticate",
      'Basic realm="Access to the documentation"'
    );
    return res.status(401).send("Authentication required.");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const validUsername = process.env.APIDOCS_USERNAME;
  const validPassword = process.env.APIDOCS_PASSWORD;

  if (username === validUsername && password === validPassword) {
    next();
  } else {
    res.setHeader(
      "WWW-Authenticate",
      'Basic realm="Access to the documentation"'
    );
    return res.status(401).send("Authentication required.");
  }
};

export default APIDocsAuth;
