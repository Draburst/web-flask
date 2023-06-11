from flask import render_template, request, redirect, url_for
from flask_login import login_user, logout_user
from database import session, User
#from __init__ import app, login_manager
from flask import Flask
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = ''
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./app.db'

login_manager = LoginManager(app)
login_manager.login_view = 'login'



@app.route('/typing-text')
def text():
    return render_template('typing_text.html')

@app.route('/mouse')
def mouse_game():
    return render_template('mousegame.html')

@login_manager.user_loader
def load_user(user_id):
    return session.query(User).filter(User.id == user_id).first()

@app.route('/memory')
def game():
    return render_template('memory.html') 


@app.route('/')
def index():
    return render_template("index.html")



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nickname = request.form['nickname']
        password = request.form['password']
        user = session.query(User).filter(User.nickname == nickname).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('general'))
    return render_template('login.html')

@app.route('/general')
def general():
    # Обробка сторінки /general
    return render_template('general.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        nickname = request.form['nickname']
        password = request.form['password']
        
        user = User(name=name, nickname=nickname, password=password)
        session.add(user)
        session.commit()
        return redirect(url_for('general'))
    return render_template('register.html')



@app.route('/profile')
def profile_info():
    return "<h1>Profile</h1>"


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
