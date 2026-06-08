const axios = require("axios");

async function checkClickjacking(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "URL is required"
      });
    }

    const response = await axios.head(url, {
      timeout: 10000,
      validateStatus: () => true
    });

    const xfo = response.headers["x-frame-options"];
    const csp = response.headers["content-security-policy"];

    const protectedByXFO = !!xfo;
    const protectedByCSP =
      csp &&
      csp.toLowerCase().includes("frame-ancestors");

    return res.status(200).json({
      vulnerable: !(protectedByXFO || protectedByCSP),
      xfo: xfo || null,
      csp: csp || null
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}

module.exports = checkClickjacking;