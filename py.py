from telegram import Update, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Откройте мини-приложение:",
        reply_markup={
            "inline_keyboard": [[
                {"text": "Открыть", "web_app": {"url": "https://reliable-froyo-e79e56.netlify.app"}}
            ]]
        }
    )

if __name__ == "__main__":
    application = ApplicationBuilder().token("7613332523:AAF18LxS9lDI4Xv-cdUs7fbBX3kxXQi-cPg").build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()
