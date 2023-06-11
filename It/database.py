from sqlalchemy import Column, String, Integer, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from flask_login import UserMixin

engine = create_engine("sqlite:///./app.db?check_same_thread=False")
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


class User(Base, UserMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    nickname = Column(String, unique=True)
    password = Column(String)

    def __init__(self, name , nickname, password):
        self.name = name
        self.nickname = nickname
        self.password = password



Base.metadata.create_all(engine)