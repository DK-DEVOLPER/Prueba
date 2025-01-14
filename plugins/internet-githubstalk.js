import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { conn, text }) => {
if (!text) throw `Error!\nMasukan perintah dengan tambahan username!`
let Quer = text.replace("https://github.com/", "").replace("@", "")
axios.get(`https://api.github.com/users/${Quer}`)
.then((res) =>{
let {
 login, 
 type,
 name,
 followers, 
 following, 
 created_at, 
 updated_at,
 public_gists,
 public_repos,
 twitter_username,
 bio,
 hireable,
 email,
 location, 
 blog,
 company,
 avatar_url,
 html_url
} = res.data
var teks = `*Nombre de usuario :* ${login}
*Nick :* ${name}
*Seguidores :* ${followers}
*Siguiendo :* ${following}
*Public Gists :* ${public_gists}
*Public Repos :* ${public_repos}
*Twitter :* ${twitter_username==null?'-':twitter_username}
*Email :* ${email==null?'-':email}
*Lc :* ${location==null?'-':location}
*Blog :* ${blog}
*Link :* ${html_url}
*Tiempo creado :*
  - Fecha : ${moment(created_at).tz('America/Buenos_Aires').format('DD-MM-YYYY')}
  - Hora : ${moment(created_at).tz('America/Buenos_Aires').format('HH:mm:ss')}
*Hora actualizo :* 
  - Fecha : ${moment(updated_at).tz('America/Buenos_Aires').format('DD-MM-YYYY')}
  - Hora : ${moment(updated_at).tz('America/Buenos_Aires').format('HH:mm:ss')}
*Bio :* ${bio}`
conn.sendFile(m.chat, avatar_url, 'github-stalk.png', teks, m)
})

}
handler.help = ['githubstalk']
handler.tags = ['internet']
handler.limit = true;
handler.command = /^(githubstalk)$/i

export default handler
