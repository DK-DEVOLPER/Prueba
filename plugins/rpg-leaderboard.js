let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return {...value, jid: key}
    })
    let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
    let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    let sortedEris = users.map(toNumber('eris')).sort(sort('eris'))
    let usersExp = sortedExp.map(enumGetKey)
    let usersLim = sortedLim.map(enumGetKey)
    let usersLevel = sortedLevel.map(enumGetKey)
    let usersEris = sortedEris.map(enumGetKey)
    console.log(participants)
    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)
    let text = `
  • *Top de Limites ${len}* •
㊭ *${usersLim.indexOf(m.sender) + 1}* de *${usersLim.length}*
  
${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} Limit*`).join`\n`}
  
  • *Top de Nivel ${len}* •
㊭ *${usersLevel.indexOf(m.sender) + 1}* de *${usersLevel.length}*
  
${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Level ${level}*`).join`\n`}
  
  • *Top de Eris ${len}* •
㊭ *${usersEris.indexOf(m.sender) + 1}* de *${usersEris.length}*
  
${sortedEris.slice(0, len).map(({ jid, eris }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Eris ${eris}*`).join`\n`}

  
  `.trim()
  let lbnya = 'https://telegra.ph/file/b9e5139efce606289b1aa.jpg'
    conn.sendFile(m.chat, lbnya, '', text, m, {
      contextInfo: {
        mentionedJid: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len), ...usersEris.slice(0, len)].filter(v => !participants.some(p => v === p.jid))
      }
    })
  }
  handler.help = ['top']
  handler.tags = ['rpg']
  handler.command = /^(top|lb)$/i
  handler.owner = false
  handler.mods = false
  handler.premium = false
  handler.register = true
  handler.group = true
  handler.private = false
  
  handler.admin = false
  handler.botAdmin = false
  
  handler.fail = null
  handler.exp = 0
  
  export default handler
  
  function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
  }
  
  function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
    }
    else return a => a === undefined ? _default : a
  }
  
  function enumGetKey(a) {
    return a.jid
  }