const usersPocketFi = require("./users.json");
const { Telegraf } = require("telegraf");
const axios = require("axios");
const fs = require("fs");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  loopCallFunction()
  res.send("Bot is working and mining started");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to perform operations for each user
const loopCallFunction = async () => {
  let totalUsers = 0;

  for (let i = 0; i < usersPocketFi.length; i++) {
    const user = usersPocketFi[i]; // Correctly reference each user
    const headers = {
      Host: "gm.pocketfi.org",
      Connection: "keep-alive",
      "Content-Length": "0",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126", "Microsoft Edge WebView2";v="126"',
      telegramRawData: user, // Use the correct user data
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
      "sec-ch-ua-platform": '"Windows"',
      Accept: "*/*",
      Origin: "https://pocketfi.app",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://pocketfi.app/",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const headerBoost = {
      Host: "rubot.pocketfi.org",
      Connection: "keep-alive",
      "Content-Length": "0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
      telegramRawData: user, // Use the correct user data
      "sec-ch-ua-platform": '"Windows"',
      Accept: "*/*",
      Origin: "https://pocketfi.app",
      "X-Requested-With": "org.telegram.messenger",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://pocketfi.app/",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
    };

    async function createMining() {
      const url = "https://gm.pocketfi.org/mining/createUserMining";
      try {
        const getData = await axios.post(url, "", { headers: headers });
        console.log(getData.data);
      } catch (error) {
        return error.message;
      }
    }

    async function claimMining() {
      const url = "https://gm.pocketfi.org/mining/claimMining";
      try {
        const getData = await axios.post(url, "", { headers: headers });
        console.log(getData.data);
      } catch (error) {
        return error.message;
      }
    }

    async function subscribeClaim(platform) {
      const bodyData = { subscriptionType: platform };
      const headerBoost2 = {
        Host: "rubot.pocketfi.org",
        Connection: "keep-alive",
        "Content-Length": JSON.stringify(bodyData).length,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
        telegramRawData: user, // Use the correct user data
        "sec-ch-ua-platform": '"Windows"',
        Accept: "*/*",
        Origin: "https://pocketfi.app",
        "X-Requested-With": "org.telegram.messenger",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://pocketfi.app/",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
      };
      const url = "https://rubot.pocketfi.org/confirmSubscription";

      try {
        const getData = await axios.post(url, bodyData, {
          headers: headerBoost2,
        });
        console.log(getData.data);
      } catch (error) {
        return error.message;
      }
      console.log("subscribe claim " + platform);
    }

    async function dailyBoost() {
      const url = "https://rubot.pocketfi.org/boost/activateDailyBoost";
      try {
        const getData = await axios.post(url, "", { headers: headerBoost });
        console.log(getData.data);
      } catch (error) {
        return error.message;
      }
    }

    await createMining();
    await claimMining();
    await dailyBoost();
    await subscribeClaim("telegram");
    await subscribeClaim("twitter");

    totalUsers++;
  }
  return totalUsers;
};

// Function to add data to the users.json file

function addDataInFile(data) {
  console.log("i am caleled");
  const dataFile = fs.readFileSync("users.json", "utf8");
  let dataFileJson = [];
  if (dataFile) {
    dataFileJson = JSON.parse(dataFile);
  } else {
    return "Failed to read data";
  }
  dataFileJson.push(data);
  const dataString = JSON.stringify(dataFileJson, null, 2);
  fs.writeFileSync("users.json", dataString);

  return "Data added successfully";
}

//get all balance all in a loop
async function getAllBalance() {
  const resArray = [];

  for (let i = 0; i < usersPocketFi.length; i++) {
    const user = usersPocketFi[i];
    const headers = {
      Host: "gm.pocketfi.org",
      Connection: "keep-alive",
      "Content-Length": "0",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126", "Microsoft Edge WebView2";v="126"',
      telegramRawData: user, // Use the correct user data
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
      "sec-ch-ua-platform": '"Windows"',
      Accept: "*/*",
      Origin: "https://pocketfi.app",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://pocketfi.app/",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const url = "https://gm.pocketfi.org/mining/getUserMining";

    try {
      const getData = await axios.get(url, { headers: headers });
      const totalBalance = getData.data.userMining.gotAmount;
      const miningSpeed = getData.data.userMining.speed;
      const miningAmount = getData.data.userMining.miningAmount;
      const res = {
        totalBalance: totalBalance,
        miningSpeed: miningSpeed,
        miningAmount: miningAmount,
        accountID: i + 1,
      };
      console.log(res);
      resArray.push(res);
    } catch (error) {
      console.log(`Error for user ${i + 1}: ${error.message}`);
    }
  }

  return resArray;
}

// Initialize the Telegraf bot
const bot = new Telegraf("7239520264:AAGSPM2vCFo1AsfruK_X7Gic2Mo8MtEbkok");

bot.start((ctx) => ctx.reply("Welcome " + ctx.from.first_name));
bot.help((ctx) =>
  ctx.reply(
    "PocketFi Details \n /pocketfibalance - Get all balance \n /pocketfistart - Start mining for all users \n /pocketadd - Add data to server \nPocketfi start mining in every 4 hour or within 4 hours"
  )
);

bot.command("pocketadd", async (ctx) => {
  const data = ctx.message.text.split(" ")[1];
  if (data) {
    const result = addDataInFile(data);
    ctx.reply(result);
  } else {
    ctx.reply("Please provide data to add. \n/pocketadd <data>");
  }
});

bot.command("pocketfibalance", async (ctx) => {
  const allBalance = await getAllBalance();
  console.log(allBalance);
  allBalance.map((data) => {
    ctx.reply(
      "Total Balance: " +
        data.totalBalance +
        "\nMined data: " +
        data.miningAmount +
        "\nMining Speed: " +
        data.miningSpeed +
        "\nAccount ID: " +
        data.accountID
    );
  });
});

bot.command("pocketfistart", async (ctx) => {
  const totalUsers = await loopCallFunction();
  ctx.reply("Total Users: " + totalUsers);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
