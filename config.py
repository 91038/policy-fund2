import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

# Admin configuration
ADMIN_CONFIG = {
    'username': os.getenv('ADMIN_USERNAME', 'qkrtmdska23'),
    'password': os.getenv('ADMIN_PASSWORD', 'akfqhwl23!')
}

# Email configuration
EMAIL_CONFIG = {
    'from_email': os.getenv('EMAIL_FROM', 'seochaetong1@gmail.com'),
    'to_email': os.getenv('EMAIL_TO', 'seochaetong1@gmail.com'),
    'gmail_app_password': os.getenv('GMAIL_APP_PASSWORD', 'dgyirvjsocfnhtfz')
}