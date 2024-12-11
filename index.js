const express = require("express")
const app = express()
const bodyParse = require("body-parser")
const fs = require("fs")
const https = require("https")


// const http = require("http")
// const server = http.createServer(app)


const conf = {
    key: fs.readFileSync("/etc/letsencrypt/live/nutrostyle.nutrosal.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/nutrostyle.nutrosal.com/fullchain.pem")
}
const server = https.createServer(conf, app)
server.listen("5051", () => { console.log("server run on 5051"); })


app.use(bodyParse.json())
app.post("/log", (req, res) => {
    const json_str = fs.readFileSync("./log.json")
    const json = JSON.parse(json_str.toString())
    json.push(req.body)
    fs.writeFileSync("./log.json", JSON.stringify(json))
    res.json(true)
})

app.get("/get_logs", (req, res) => {
    const json_str = fs.readFileSync("./log.json")
    const json = JSON.parse(json_str.toString())
    res.json(json)
})

