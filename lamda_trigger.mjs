import https from "node:https";

export const handler = async (event) => {
  const postdata = JSON.stringify({
    username:
      event.request.userAttributes["preferred_username"] || event.userName,
    cognitoId: event.userName,
    profilePictureUrl: "i1.jpg",
    teamId: 1,
  });

  const opctions = {
    hostname: "https://2yk8eg8yxd.execute-api.us-east-1.amazonaws.com/prod",
    port: 443,
    path: "/create-user",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postdata.length,
    },
  };

  const responseBody = await new Promise((resolve, reject) => {
    const req = https.request(opctions, (res) => {
      /* console.log(`statusCode: ${res.statusCode}`) */

      res.setEncoding("utf8");
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    });

    req.on("error", reject);
    req.write(postdata);
    req.end();
  });

  return event();
};
