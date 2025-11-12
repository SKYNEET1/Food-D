const moment = require("moment-timezone");

console.print = (...obj) => {
  const currentTimeZone = moment().tz("Asia/Kolkata").format();
  const logType = obj[0] === "INFO" ? `${obj[0]} ✅` : `${obj[0]} ❌`;
  const pathIdentifier = obj[3] ? obj[3] : "NA";
  const identifier = obj[1] ? obj[1] : "";
  const logData = obj[2] ? obj[2] : "";

  if (!identifier || !logType) return;

  console.log(
    `${currentTimeZone} => ${logType} || ${pathIdentifier} || ${identifier} || ${logData}`
  );
};