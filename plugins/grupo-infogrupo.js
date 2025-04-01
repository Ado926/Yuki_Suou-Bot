const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => global.icono);
  const {antiLink, detect, welcome, modoadmin, autoRechazar, nsfw, autoAceptar, reaction, primaryBot, isBanned} = global.db.data.chats[m.chat]
  const groupAdmins = participants.filter((p) => p.admin)
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
  const primary = primaryBot ? `@${primaryBot.split('@')[0]}` : 'Aleatorio'
  const text = `*✧･ﾟ INFO GRUPO ﾟ･✧*
❀ *ID:*
→ ${groupMetadata.id}
⚘ *Nombre:*
→ ${groupMetadata.subject}
❖ *Miembros:*
→ ${participants.length} Participantes
✰ *Creador del Grupo:*
→ @${owner.split('@')[0]}
❒ *Bot primario:*
→ ${primary}
✥ *Administradores:*
${listAdmin}

˚₊· ͟͟͞͞➳❥ *CONFIGURACIÓN*

◈ *${botname}* » ${isBanned ? 'Desactivado' : 'Activado'}
◈ *Welcome:* ${welcome ? 'Activado' : 'Desactivado'}
◈ *Detect:* ${detect ? 'Activado' : 'Desactivado'}  
◈ *Antilink:* ${antiLink ? 'Activado' : 'Desactivado'} 
◈ *Autoaceptar:* ${autoAceptar ? 'Activado' : 'Desactivado'}
◈ *Autorechazar:* ${autoRechazar ? 'Activado' : 'Desactivado'}
◈ *NSFW:* ${nsfw ? 'Activado' : 'Desactivado'}
◈ *Modoadmin:* ${modoadmin ? 'Activado' : 'Desactivado'}
◈ *Reacción:* ${reaction ? 'Activado' : 'Desactivado'}

✦ *Descripción:*
→ ${groupMetadata.desc?.toString() || 'Sin Descripción'}`.trim();
  conn.sendFile(m.chat, pp, 'img.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner, primary]});
};
handler.help = ['infogrupo'];
handler.tags = ['grupo'];
handler.command = ['infogrupo', 'gp'];
handler.register = true
handler.group = true;

export default handler;
