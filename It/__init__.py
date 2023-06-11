from flask import Flask
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = ''
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./app.db'

login_manager = LoginManager(app)
login_manager.login_view = 'login'

from app import *
