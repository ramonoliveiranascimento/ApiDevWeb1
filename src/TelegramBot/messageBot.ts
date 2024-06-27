import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from '@prisma/client';

export function messageBot(prisma: PrismaClient, bot: TelegramBot, emailFoiSolicitado: boolean, idPrimeiraMensagem: number | undefined) {
    return async (msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;
        const horaAtual = new Date().getHours();

        if (!emailFoiSolicitado) {
            if (horaAtual >= 9 && horaAtual <= 18) {
                bot.sendMessage(chatId, 'Olá! Aqui está o link: https://faesa.br');
            } else {
                bot.sendMessage(chatId, 'Desculpe, estamos fora do horário comercial, que é das 09:00 às 18:00. Por favor, forneça seu e-mail para que possamos entrar em contato.');
                emailFoiSolicitado = true;
                idPrimeiraMensagem = msg.message_id;
            }
        }
    };
}
