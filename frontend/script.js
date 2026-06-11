const API_URL = "http://localhost:8000/send-url";

async function scanWebsite() {
  const url = document.getElementById("url").value.trim();

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");

  loader.style.display = "block";
  resultDiv.style.display = "none";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    loader.style.display = "none";
    resultDiv.style.display = "block";

    if (data.vulnerable) {
      resultDiv.className = "result vulnerable";

      resultDiv.innerHTML = `
          <h2>❌ Vulnerable to Clickjacking</h2>

          <div class="info">
              The website does not appear to have
              clickjacking protection headers.
          </div>

          <div class="info">
              <span class="label">X-Frame-Options:</span>
              ${data.xfo || "Not Found"}
          </div>

          <div class="info">
              <span class="label">Content-Security-Policy:</span>
              ${data.csp || "Not Found"}
          </div>
      `;
    } else {
      resultDiv.className = "result safe";

      resultDiv.innerHTML = `
          <h2>✅ Protected</h2>

          <div class="info">
              Clickjacking protection headers detected.
          </div>

          <div class="info">
              <span class="label">X-Frame-Options</span>
              <pre>${data.xfo || "Not Present"}</pre>
          </div>

          <div class="info">
              <span class="label">Content-Security-Policy</span>
              <pre>${data.csp || "Not Present"}</pre>
          </div>
      `;
    }
  } catch (error) {
    loader.style.display = "none";
    resultDiv.style.display = "block";
    resultDiv.className = "result vulnerable";

    resultDiv.innerHTML = `
      <h2>⚠ Error</h2>
      <p>${error.message}</p>
  `;
  }
}
