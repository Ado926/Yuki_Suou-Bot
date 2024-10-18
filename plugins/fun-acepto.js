import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  if (!who) throw 'Etiqueta o menciona a alguien';

  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);

  if (global.db.data.users[m.sender].pareja === who && global.db.data.users[who].pareja === m.sender) {
    throw 'Ya estás casado con esta persona';
  }

  if (global.db.data.users[m.sender].casado || global.db.data.users[who].casado) {
    throw 'Uno de los dos ya está casado';
  }

  let str = `${name2} ha aceptado la proposición de ${name}! ¡Felicidades!`;

  let imgs = [
    'https://qu.ax/OpVX.mp4', 
    'https://qu.ax/yUBa.mp4', 
    'https://qu.ax/ChmG.mp4'
  ];
  let img = imgs[Math.floor(Math.random() * imgs.length)];
  
  await conn.sendMessage(m.chat, { 
    video: { url: img }, 
    gifPlayback: true, 
    caption: str, 
    mentions: [m.sender, who] 
  }, { quoted: m });

  // Actualiza estado de aceptación
  global.db.data.users[m.sender].pareja = who;
  global.db.data.users[who].pareja = m.sender;
};

handler.help = ['acepto @tag'];
handler.tags = ['fun'];
handler.command = ['acepto', 'yes'];
handler.group = true;

export default handler; 
