const { Client, Location, LocalAuth } = require("whatsapp-web.js")
const qrcode = require('qrcode-terminal')
const translate = require('@iamtraction/google-translate')
const client = new Client({
    authStrategy: new LocalAuth()
})

client.initialize();

client.on('qr',(qr) => {
    // generate and scan
    console.log('QR RECEIVED: ')
    qrcode.generate(qr, {small: true})
})

client.on('authenticated', () => {
    console.log('Authenticated')
})

client.on('ready', () => {
    console.log('client is ready!')
})

client.on('message', async msg => {
    if(msg.body == 'halo'){
        msg.reply('pong')
    } else if (msg.body.startsWith('t ')) {
        const teks = msg.body.slice(2);
        console.log(teks)
        translate(teks, {to: 'id'}).then(res => {
            msg.reply(res.text)
        }).catch(err => {
            client.sendMessage("Ada masalah!")
        })
    } 
})

