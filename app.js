const express = require('express')
const fs= require('fs')
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const messages = [];
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

async function main(input) {
  messages.push({ role: 'user', content: input })
  const chatCompletion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0]?.message?.content;
}
// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'Templates/index.html'));
});


app.post('/api',async function(req, res, next) {
  
  const mes= await main(req.body.input)
  res.json({success:true, message:mes})
})

app.listen(port, () => {
  // Code.....
  console.log(`Server started at port:localhost:${port}`)
})