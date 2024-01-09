let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    const buttons = Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`])
    if (args.length < 1) return conn.reply(m.chat, `
  Modos: ${Object.keys(modes).join(' | ')}
  Ejemplo de uso: ${usedPrefix}mates medio
  `.trim(), m)
    let mode = args[0].toLowerCase()
    if (!(mode in modes)) return conn.reply(m.chat, `
  Modos: ${Object.keys(modes).join(' | ')}
  Ejemplo de uso: ${usedPrefix}mates medio
    `.trim(), m)
    let id = m.chat
    if (id in conn.math) return conn.reply(m.chat, 'Aún quedan preguntas sin respuesta en este chat.', conn.math[id][0])
    let math = genMath(mode)
    conn.math[id] = [
        await conn.reply(m.chat, `¿A cuánto asciende el resultado de *${math.str}*?\n\nTiempo límite: ${(math.time / 1000).toFixed(2)} segundos\nRecompensa: ${math.bonus} XP`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) conn.reply(m.chat, `El tiempo se acabó!\nResultado de la pregunta ${math.result}`, conn.math[id][0])
            delete conn.math[id]
        }, math.time)
    ]
}
handler.help = ['mates']
handler.tags = ['game']
handler.command = /^mates/i


let modes = {
    novato: [-3, 3, -3, 3, '+-', 15000, 10],
    facil: [-10, 10, -10, 10, '*/+-', 20000, 40],
    medio: [-40, 40, -20, 20, '*/+-', 40000, 150],
    dificil: [-100, 100, -70, 70, '*/+-', 60000, 350],
    extremo: [-999999, 999999, -999999, 999999, '*/', 99999, 400],
    imposible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 500],
    imposible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 1050]
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

handler.modes = modes

export default handler
