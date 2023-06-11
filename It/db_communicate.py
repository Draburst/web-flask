from .database import User, session
from werkzeug.security import generate_password_hash, check_password_hash


def add_user(name, nickname, password):
    password = generate_password_hash(password)
    user = User(name, nickname, password)
    session.add(user)
    session.commit()
    return user


def check_true_user(nickname, password):
    user = session.query(User).where(User.nickname == nickname).first()
    if user:
        if check_password_hash(password, user.password):
            return user
    return False