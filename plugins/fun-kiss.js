import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
//import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	 let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw m.reply(`✳️Marca o responde a alguien\n\n📌 Ejemplo : ${usedPrefix + command} @tag`)
    
    let user = global.db.data.users[who]
    let name = await conn.getName(who) 
   let name2 = m.name
   await m.reply(wait)

  let rki = await fetch(`https://api.waifu.pics/sfw/kiss`)
    if (!rki.ok) throw await rki.text()
   let jkis = await rki.json()
   let { url } = jkis
   let stiker = await sticker(null, url, `(${name2}) beso a`, `${name}`)
   conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
   await m.reply('😚')  
   
}

handler.help = ['kiss @tag']
handler.tags = ['anime']
handler.command = /^(kiss|beso)$/i
handler.diamond = true
handler.group = true

export default handler
