const usersPocketFi = require("./users.json");
const { Telegraf } = require("telegraf");
const axios = require("axios");
const fs = require("fs");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  loopCallFunction()
  bananaAppTG()
  tomcarArray()
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
      } catch (error) {
        return error.message;
      }
    }

    async function claimMining() {
      const url = "https://gm.pocketfi.org/mining/claimMining";
      try {
        const getData = await axios.post(url, "", { headers: headers });
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
      } catch (error) {
        return error.message;
      }
    }

    async function dailyBoost() {
      const url = "https://rubot.pocketfi.org/boost/activateDailyBoost";
      try {
        const getData = await axios.post(url, "", { headers: headerBoost });
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
      resArray.push(res);
    } catch (error) {
      console.log(`Error for user ${i + 1}: ${error.message}`);
    }
  }

  return resArray;
}

//tomcat start

const data = require('./tomcat.json');

async function startFarm(token, gameID) {
  let requestData = JSON.stringify({ "game_id": gameID });
  let config = {
    method: 'POST',
    url: 'https://api-web.tomarket.ai/tomarket-game/v1/farm/start',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.82 Mobile Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      'authorization': token,
      'origin': 'https://mini-app.tomarket.ai',
      'x-requested-with': 'org.telegram.messenger',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://mini-app.tomarket.ai/',
      'accept-language': 'en,en-IN;q=0.9,en-US;q=0.8'
    },
    data: requestData
  };
  const response = await axios.request(config);
  return response.data;
}

async function claimFarm(token, gameID) {
  let requestData = JSON.stringify({ "game_id": gameID });
  let config = {
    method: 'POST',
    url: 'https://api-web.tomarket.ai/tomarket-game/v1/farm/claim',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.82 Mobile Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      'authorization': token,
      'origin': 'https://mini-app.tomarket.ai',
      'x-requested-with': 'org.telegram.messenger',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://mini-app.tomarket.ai/',
      'accept-language': 'en,en-IN;q=0.9,en-US;q=0.8'
    },
    data: requestData
  };
  const response = await axios.request(config);
  return response.data;
}

async function getFarmInfo(token, gameID) {
  let requestData = JSON.stringify({ "game_id": gameID });
  let config = {
    method: 'POST',
    url: 'https://api-web.tomarket.ai/tomarket-game/v1/farm/info',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.82 Mobile Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      'authorization': token,
      'origin': 'https://mini-app.tomarket.ai',
      'x-requested-with': 'org.telegram.messenger',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://mini-app.tomarket.ai/',
      'accept-language': 'en,en-IN;q=0.9,en-US;q=0.8'
    },
    data: requestData
  };
  const response = await axios.request(config);
  return response.data;
}

async function login(data) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.82 Mobile Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
    'origin': 'https://mini-app.tomarket.ai',
    'x-requested-with': 'org.telegram.messenger',
    'sec-fetch-site': 'same-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://mini-app.tomarket.ai/',
    'accept-language': 'en,en-IN;q=0.9,en-US;q=0.8'
  }
  const response = await axios.post('https://api-web.tomarket.ai/tomarket-game/v1/user/login', data, { headers });
  return response.data.data.access_token;
}

async function tomacat() {
  const results = await Promise.all(data.map(async (item) => {
    const token = await login(item.user);
    const farmInfo = await getFarmInfo(token, item.gameId);
    const targetTimestamp = farmInfo.data.end_at;
    const cTime = Math.floor(Date.now() / 1000);
    const rTime = Math.floor((targetTimestamp - cTime) / 60);

    if (rTime < 0) {
      await claimFarm(token, item.gameId);
      const data = await startFarm(token, item.gameId);
      const rrTime = Math.floor((data.data.end_at - cTime) / 60);
      return `Farm started for next ${rrTime} minutes`;
    } else {
      return `Farm is running for next ${rTime} minutes`;
    }
  }));

  return results;
}

async function tomcarArray() {
  const arr  =  [];
  const results = await tomacat();
  results.forEach(result => arr.push(result));
  return arr;
}

//tomcat end

//banana app tg start
const bananaUsers = require("./bananausers.json");
async function bananaAppTG() {
    try {

        var totalUsers = 0;
        var totalUsernames = [];

        for (let i = 0; i < bananaUsers.length; i++) {
            const user = bananaUsers[i];

            const headers = await loginMethod(user);

            let profile = await profileCall(headers);


            if (profile && profile.data) {
                const countClick = profile.data.today_click_count;
                const totalClick = profile.data.max_click_count;

                for (let i = 0; i < totalClick - countClick; i += 10) {
                    const daata = await doClick(headers);

                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                if (profile.data.lottery_info && profile.data.lottery_info.countdown_end) {
                    const claimData = await claimBanana(headers);
                    profile = await profileCall(headers);
                }
                // if (profile.data.lottery_info && profile.data.lottery_info.remain_lottery_count > 0) {
                //     const claimData = await harvestBanana(headers);
                //     console.log(claimData);
                //     profile = await profileCall(headers);
                // }
                const speedCount = profile.data.speedup_count;
                for (let i = 1; i <= speedCount; i++) {
                    const speedData = await booster(headers);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } else {
                console.error('Profile data is undefined or not in the expected format');
            }
            totalUsernames.push(profile.data.username);
            totalUsers++;
        }
        return {totalUser: totalUsers, totalUsernames };

    } catch (error) {
        console.error('Error in main:', error);
    }
}

async function claimBanana(headers) {
    try {
        const url = "https://interface.carv.io/banana/claim_lottery";
        const response = await axios.post(url, { "claimLotteryType": 1 }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in claimBanana:', error);
        return null; // Or return an error object/message if you prefer
    }
}

async function booster(headers) {
    try {
        const url = "https://interface.carv.io/banana/do_speedup";
        const response = await axios.post(url, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in booster:', error);
        return null;
    }
}

async function harvestBanana(headers) {
    try {
        const url = "https://interface.cloudflare.carv.io/banana/do_lottery";
        const response = await axios.post(url, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in harvestBanana:', error);
        return null;
    }
}

async function profileCall(headers) {
    try {
        const url = "https://interface.carv.io/banana/get_user_info";
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in profileCall:', error);
        return null;
    }
}

async function doClick(headers) {
    try {
        const url = "https://interface.carv.io/banana/do_click";
        const response = await axios.post(url, {
            "clickCount": 10
        }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in doClick:', error);
        return null;
    }
}


async function loginMethod(bodyData) {
    const url = "https://interface.carv.io/banana/login";
    let headers = {
        "Reqable-Id": "",
        "Host": "interface.carv.io",
        "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.82 Mobile Safari/537.36",
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "x-app-id": "carv",
        "Authorization": "Bearer",
        "Origin": "https://bananagame.xyz",
        "X-Requested-With": "org.telegram.messenger",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://bananagame.xyz/",
        "Accept-Language": "en,en-IN;q=0.9,en-US;q=0.8"
    };

    const response = await axios.post(url, bodyData, { headers });
    headers.Authorization = `Bearer ${response.data.data.token}`;

    return headers;
}

//banana app tg end

// Initialize the Telegraf bot
const bot = new Telegraf("7239520264:AAGSPM2vCFo1AsfruK_X7Gic2Mo8MtEbkok");

bot.start((ctx) => ctx.reply("Welcome " + ctx.from.first_name));
bot.help((ctx) =>
  ctx.reply(
    "PocketFi Details \n /pocketfibalance - Get all balance \n /pocketfistart - Start mining for all users \n /pocketadd - Add data to server \nPocketfi start mining in every 4 hour or within 4 hours  \n /bananastart - Start mining for all banana app  \n /tomcatstart - start tomcat"
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

bot.command("bananastart", async (ctx) => {
  const totalUsers = await bananaAppTG();
  ctx.reply(JSON.stringify(totalUsers));
});

bot.command("tomcatstart", async (ctx) => {
  const totalUsers = await tomcarArray();
  ctx.reply(JSON.stringify(totalUsers));
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
