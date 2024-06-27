import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from '@prisma/client';
import { messageBot } from "./messageBot";
import { textBot } from "./textBot";

import { config } from "dotenv";
config();

const prisma = new PrismaClient();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

let emailFoiSolicitado = false;
let idPrimeiraMensagem: number | undefined;

bot.on('message', messageBot(prisma, bot, emailFoiSolicitado, idPrimeiraMensagem));

bot.on('text', textBot(prisma, bot, emailFoiSolicitado, idPrimeiraMensagem));
