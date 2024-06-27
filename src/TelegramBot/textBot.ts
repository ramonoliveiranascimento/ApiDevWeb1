import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from '@prisma/client';

export function textBot(prisma: PrismaClient, bot: TelegramBot, emailFoiSolicitado: boolean, idPrimeiraMensagem: number | undefined) {
    return async (msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;
        const horaAtual = new Date().getHours();
        const email = msg.text;

        if (emailFoiSolicitado && msg.message_id !== idPrimeiraMensagem && horaAtual <= 9 && horaAtual >= 18) {
            const verificandoEmail = /\S+@\S+\.\S+/;
            if (typeof email === 'string' && verificandoEmail.test(email)) {
                try {
                    await prisma.email.create({
                        data: {
                            email: email
                        }
                    });
                    bot.sendMessage(chatId, 'Obrigado! Seu e-mail foi registrado para contato futuro.');
                    emailFoiSolicitado = false;
                    idPrimeiraMensagem = undefined;
                } catch (error) {
                    console.error("Erro ao armazenar o e-mail:", error);
                    bot.sendMessage(chatId, 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
                }
            } else {
                bot.sendMessage(chatId, 'O texto fornecido não parece ser um endereço de e-mail válido. Por favor, forneça um endereço de e-mail válido.');
            }
        }
    };
}
