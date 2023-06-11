from flask import Flask
from sqlalchemy import Column, Integer, String
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
db = SQLAlchemy(app)


class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, name: str, age: int, username: str, password: str):
        self.name = name
        self.age = age
        self.username = username
        self.password = password

    def __repr__(self):
        return f'<<User {self.username}>'
    
