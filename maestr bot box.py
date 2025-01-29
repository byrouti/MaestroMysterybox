import logging
from datetime import datetime, time
import pytz
import random
import sys
from telegram import Update, Chat
from telegram.constants import ParseMode
from telegram.ext import Application, CommandHandler, ContextTypes, JobQueue
from telegram.error import TelegramError

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# Bot token
BOT_TOKEN = "7963123621:AAE3iruUPGZh2shH50nk3cCvokKwvP8u7dA"

# Constants
MAX_WINNERS = 10
LEBANON_TIMEZONE = pytz.timezone('Asia/Beirut')
ADMIN_ID = 5754961056  # Updated to correct admin ID
GROUP_ID = None  # Will store the group ID when admin uses /start

# Prize pool
PRIZES = [
    "1 Maestro premium account for 1 month",
    "2 Maestro premium account for 1 week",
    "3 Maestro premium account for 1 week",
    "4 Maestro premium account for 1 week",
    "5 Maestro premium account for 1 week",
    "6 Maestro premium account for 1 week",
    "7 Maestro premium account for 3 days",
    "8 Maestro premium account for 3 days",
    "9 Maestro premium account for 1 day",
    "10 Maestro premium account for 1 day"
]

# Store winners, prizes, and users who clicked the link
winners = {}  # Store winner IDs and their prizes
available_prizes = []  # List of prizes still available today
users_clicked = set()  # Track users who clicked the link

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Only allow admin to start the bot in a group."""
    global GROUP_ID

    user_id = update.effective_user.id
    chat_type = update.effective_chat.type

    # Log the user ID trying to use /start
    logging.info(f"User {user_id} tried to start bot. Admin ID is {ADMIN_ID}")

    if user_id != ADMIN_ID:
        await update.message.reply_text(f" Sorry, only the admin can start this bot. Your ID: {user_id}")
        return

    if chat_type not in [Chat.GROUP, Chat.SUPERGROUP]:
        await update.message.reply_text(" Please add me to a group and use /start there!")
        return

    GROUP_ID = update.effective_chat.id
    await update.message.reply_text("Bot activated! I'll send Mystery Box links")

async def send_prize_link(context: ContextTypes.DEFAULT_TYPE):
    """Send the prize link to all group members."""
    if not GROUP_ID:
        return

    # Check if current time is between 2 PM and 6 PM Lebanon time
    lebanon_tz = pytz.timezone('Asia/Beirut')
    current_time = datetime.now(lebanon_tz)
    
    # Only send between 2 PM (14:00) and 6 PM (18:00)
    if not (14 <= current_time.hour < 21):
        return

    try:
        # Only send the link if there are still spots for users
        if len(users_clicked) < MAX_WINNERS:
            # Randomly select a prize
            if available_prizes:
                prize = random.choice(available_prizes)
                available_prizes.remove(prize)
                
                # Generate the clickable link with a display name ("Prize")
                link = f"https://byrouti.github.io/MaestroMysterybox/prize.html?prize={prize.replace(' ', '%20')}"
                message = f" <a href='{link}'>MeastroMysterybox</a>"
                
                logging.info(f"Generated message: {message}")
                
                try:
                    await context.bot.send_message(
                        chat_id=GROUP_ID,
                        text=message,
                        parse_mode="HTML",
                        disable_web_page_preview=True
                    )
                    logging.info(f"Sent prize link to group {GROUP_ID} with prize: {prize}")
                except TelegramError as e:
                    logging.error(f"Failed to send to group {GROUP_ID}: {e}")

    except Exception as e:
        logging.error(f"Error in send_prize_link: {e}")

async def reset_daily_users(context: ContextTypes.DEFAULT_TYPE):
    """Reset the winners list, available prizes, and users who clicked the link for a new day."""
    winners.clear()
    available_prizes.clear()
    users_clicked.clear()  # Reset the users who clicked the link
    available_prizes.extend(PRIZES)  # Refill available prizes
    random.shuffle(available_prizes)  # Shuffle the prizes
    logging.info("Reset winners list, shuffled prizes, and cleared clicked users for new day")

def main():
    """Start the bot."""
    try:
        # Initialize the bot
        application = Application.builder().token(BOT_TOKEN).build()

        # Add command handlers
        application.add_handler(CommandHandler("start", start))

        # Set up job queue
        if application.job_queue:
            # Initialize available prizes
            available_prizes.extend(PRIZES)
            random.shuffle(available_prizes)

            # Send prize link randomly between 2-15 minutes
            application.job_queue.run_repeating(
                send_prize_link,
                interval=random.randint(120, 900),  # Random interval between 2-15 minutes
                first=10  # Wait 10 seconds before first run
            )

            # Schedule reset at midnight Lebanon time
            lebanon_tz = pytz.timezone('Asia/Beirut')
            midnight = time(0, 0, tzinfo=lebanon_tz)
            application.job_queue.run_daily(
                reset_daily_users,
                time=midnight
            )

            logging.info("Bot started! Ready to send prize links between 2 PM and 6 PM Lebanon time")

        # Start the bot
        application.run_polling(allowed_updates=Update.ALL_TYPES)

    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
