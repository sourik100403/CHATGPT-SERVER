const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const OpenAI=require('openai');
const messages=[]
// const mySecert = process.env['mySecert']
const mySecert="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"
//code for generete openai reply all code
const openai = new OpenAI({ 
  apiKey: "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", // defaults to process..env["OPENAI_API_KEY"] });
})
async function main(input) {
  messages.push({ role: 'user', content: input })
  console.log(messages);
const completion= await openai.chat.completions.create({
  // messages: [{ role: 'user', content: 'Hey chat gpt how are you' }],
  messages:messages,
  model: 'gpt-3.5-turbo',
});
  // console.log(completion.choices);
   return (completion.choices[0]?.message?.content);
}
//middileware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});
//for openai api call
app.post('/api',async function(req, res,next) {
  console.log(req.body);
 const mes = await main(req.body.input);
  res.json({Sucess:true,message:mes});
})


app.listen(port, () => {
  // Code.....
})