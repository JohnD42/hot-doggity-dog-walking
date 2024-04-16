from flask_sqlalchemy import SQLAlchemy
import enum


db = SQLAlchemy()

class TypeOfServiceEnum(enum.Enum):
    walk = 'walk'
    check_in = 'check_in'
    pet_sitting = 'pet_sitting'

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    first_name = db.Column(db.String(500), unique=False, nullable=True)
    last_name = db.Column(db.String(80), unique=False, nullable=True)
    address = db.Column(db.String(80), unique=False, nullable=True)
    state = db.Column(db.String(80), unique=False, nullable=True)
    city = db.Column(db.String(80), unique=False, nullable=True)
    phone_number = db.Column(db.String, unique=False, nullable=True)
    zip = db.Column(db.String, unique=False, nullable=True)
    pets = db.relationship('Pet', backref='user')
    last_services_used = db.relationship('Last_Service_Used', backref='user')
    number_of_services_used = db.relationship('Number_Of_Services_Used', backref='user')


 


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "phone_number": self.phone_number,
            "pets": list(map(lambda x: x.serialize(), self.pets)),
            # do not serialize the password, its a security breach
        }

class Pet(db.Model):
    __tablename__ = 'pet'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    breed = db.Column(db.String(120), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=True)
    detailed_care_info = db.Column(db.Text, unique=False, nullable=True)

    def __repr__(self):
        return '<Pet %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "breed": self.breed,
            "age": self.age,
            "description": self.description,
            "detailed_care_info": self.detailed_care_info
        }

class Last_Service_Used(db.Model):
    __tablename__ = 'last_services_used'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_requested = db.Column(db.Enum(TypeOfServiceEnum), nullable=False)
    number_of_days = db.Column(db.Integer, nullable=False)
    starting_day_of_week = db.Column(db.String, nullable=False)
    recurring = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return '<Last_Services_Used %r>' % self.user_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "service_requested": self.service_requested,
            "number_of_days": self.number_of_days,
            "starting_day_of_week": self.starting_day_of_week,
            "recurring": self.recurring
        }
    
class Number_Of_Services_Used(db.Model):
    __tablename__ = 'number_of_services_used'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    walks = db.Column(db.Integer, nullable=False)
    check_ins = db.Column(db.Integer, nullable=False)
    pet_sittings = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Number_Of_Services_Used %r>' % self.user_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "dog-walk": self.walks,
            "pet-check-in": self.check_ins,
            "pet-sitting": self.pet_sittings
        }