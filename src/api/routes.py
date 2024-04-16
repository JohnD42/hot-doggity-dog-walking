from flask import Flask, request, jsonify, Blueprint, url_for, render_template

from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User, Pet, Number_Of_Services_Used
from api.utils import APIException
from datetime import datetime, timedelta
from email.message import EmailMessage
import ssl
import smtplib
import logging
import random
import os
import jwt
import secrets

import datetime
import os.path

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account


api = Blueprint('api', __name__)

CORS(api)
cors = CORS(api, resources={r"/api/*": {"origins": "*"}})

# api = Blueprint('api', __name__, template_folder='templates')
# api_blueprint = Blueprint('api', __name__, template_folder='templates')

JWT_SECRET_KEY = secrets.token_hex(32)
# # secure_token = secrets.token_urlsafe(16)

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    try:
        current_user = get_jwt_identity()
        return jsonify(message=f'Hello, {current_user}!')
    except Exception as e:
        return jsonify(message="Missing Authorization Header or Invalid Token"), 401

# Create the Blueprint


# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    body = request.get_json()
    if (
        "email" not in body.keys()
        or "password" not in body.keys()
        or "first_name" not in body.keys()
        or "last_name" not in body.keys()
     
    ):
        raise APIException("Please provide all required fields", status_code=400)
  

    email = body['email']
    password = body['password']
    first_name = body['first_name']
    last_name = body['last_name']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user is not None:
        return jsonify(message="User already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(
        first_name =first_name,
        last_name =last_name,
        email=email,
        password=hashed_password,
    
    )
    db.session.add(new_user)


    db.session.commit()
    return jsonify(message="Successfully created user."), 200

@api.route('/account', methods=['PUT'])
@jwt_required()
def update_account():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        raise APIException("User not found", status_code=404)

    body = request.get_json()
    print('!!!!!!!!!')
    print(body)
    # Update user information
    if body.get("email") is not None:
        user.email = body.get("email")
    if body.get("first_name") is not None:
        user.first_name = body.get("first_name")
    if body.get("last_name") is not None:
        user.last_name = body.get("last_name")
    if body.get("address") is not None:
        user.address = body.get("address")
    if body.get("city") is not None:
        user.city = body.get("city")
    if body.get("state") is not None:
        user.state = body.get("state")
    if body.get("zip") is not None:
        user.zip = body.get("zip")
    if body.get("phone_number") is not None:
        user.phone_number = body.get("phone_number")


    # Commit the changes to the user
    db.session.add(user)

    db.session.commit()


@api.route('/pets', methods=['GET'])
@jwt_required()
def get_user_pets():
  
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        pets = [pet.serialize() for pet in user.pets]
        return jsonify(pets), 200

    except Exception as e:
        print("Exception:", e)
        return jsonify(message=str(e)), 500


@api.route('/pets', methods=['POST', 'OPTIONS'])
@jwt_required()
def add_user_pet():

    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        body = request.get_json()
        print(body,"!!!!!!")
        print(user,"!!!!!!!!!!!!!")
        new_pet = Pet(
            name=body.get("name"),
            breed=body.get("breed"),
            age=int(body.get("age")),
            description=body.get("description"),
            detailed_care_info=body.get("detailed_Care_Info"),
            user=user

        )
        print("printing new pet")
        print(new_pet.serialize())
        db.session.add(new_pet)

        db.session.commit()
        print(new_pet.serialize())
        return jsonify(new_pet.serialize()), 201

    except Exception as e:
        print("Exception:", e)
        return jsonify(message=str(e)), 500


@api.route('/pets/<int:pet_id>', methods=['PUT'])
@jwt_required()
def update_user_pet(pet_id):
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        body = request.get_json()
        pet = Pet.query.get(pet_id).first()

        if not pet or pet.user != user:
            raise APIException("Pet not found or does not belong to the user", status_code=404)

        # Update pet information
        if body.get("pet_name") is not None:
            pet.name = body.get("pet_name")
        if body.get("breed") is not None:
            pet.breed = body.get("breed")
        if body.get("age") is not None:
            pet.age = body.get("age")
        if body.get("description") is not None:
            pet.description = body.get("description")
        if body.get("detailed_care_info") is not None:
            pet.detailed_care_info = body.get("detailed_care_info")
        db.session.add()
        db.session.commit()

        return jsonify(pet.serialize()), 200

    except Exception as e:
        print("Exception:", e)
        return jsonify(message=str(e)), 500


@api.route('/pets/<int:pet_id>', methods=['DELETE'])
@jwt_required()
def delete_user_pet(pet_id):
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        pet = Pet.query.get(pet_id).first()

        if not pet or pet.user != user:
            raise APIException("Pet not found or does not belong to the user", status_code=404)

        db.session.delete(pet)
        db.session.commit()

        return jsonify(message="Pet deleted successfully"), 200

    except Exception as e:
        print("Exception:", e)
        return jsonify(message=str(e)), 500



@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        if "email" not in body or "password" not in body:
            raise APIException("Please provide both email and password", status_code=400)

        email = body['email']
        password = body['password']

        user = User.query.filter_by(email=email).first()
        print(user)

        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify(message="Login failed. Please check your credentials."), 401

    except Exception as e:
        return jsonify(message=str(e)), 500
    


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    print(user.serialize())

    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify(message="User not found"), 404

@api.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200


@api.route('/forgotten-password', methods=["POST"])
def send_code ():
    body = request.get_json();
    email = body["email"]
    expiration_time = datetime.datetime.utcnow() + timedelta(hours=1)
    payload = {
        'email': email,
        'exp': expiration_time
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
    FRONTEND_URL = os.getenv('FRONTEND_URL')
    EMAIL_SENDER = os.getenv('EMAIL_SENDER')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
    URL_TOKEN = f"{FRONTEND_URL}/reset-password?token={token}"
    # URL_TOKEN = url_for('api.reset_password', token=token, _external=True)
    

    if email is None:
        return "No email was provided",400
    user = User.query.filter_by(email=email).first()
    if user is None:

        return jsonify({"message":"User doesn't exist"}), 404
    else:
        email_receiver = email
        email_subject = "Reset your password"
        email_body = f"<!DOCTYPE html><html><body>"
        email_body += f"Hello, you requested a password reset. If you did not request this, please ignore this email.<br /><br /> We have sent you this link to reset your password.<br /><br /> Smile with us, Hot Doggity Dog Walkers! "
        email_body +=f"Click here to reset your password: <a href=\"{URL_TOKEN}\">LINK</a><br/><br/>"
        email_body += f"This token is valid for 1 hour. After expiration, you will need to request another password reset.<br /><br />"
        email_body += f"Sincerely,<br /><br />PetSiting"
        email_body += f"</body></html>"
        # email_body = render_template('email_template.html', URL_TOKEN=URL_TOKEN)

        em = EmailMessage()
        em['from'] = EMAIL_SENDER
        em['to'] = email_receiver
        em['subject'] = email_subject
        # em.set_type('text/html')
        # em.add_header('Content-Type','text/html')
        em.set_content(email_body, subtype='html')
        # em.set_payload(email_body)

        context = ssl.create_default_context()
        with smtplib.SMTP(os.getenv('EMAIL_SERVER'), 587) as smtp:
            smtp.set_debuglevel(1)
            smtp.starttls(context=context)
            smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
            smtp.sendmail(EMAIL_SENDER, email_receiver, em.as_string())
        return "Ok, Password reset link sent to email.",200



@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Password reset successful.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token.'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500



# @api.route('/update-password', methods=['PUT'])
# @jwt_required()
# def update_password():
#     body = request.get_json()
#     old_password = body['old_password']
#     new_password = body['new_password']
#     user_email = get_jwt_identity()
#     user = User.query.filter_by(email=user_email).first()
#     if user and check_password_hash(user.password, old_password):
#         user.password = generate_password_hash(new_password)
#         return jsonify("Password updated successfully")
    

 
if __name__ == "__main__":
    api.run()
    
@api.route('/get-dog-walk', methods=['POST', 'OPTIONS'])
# @api.route('/get-dog-walk', methods=['POST'])
@jwt_required()
def handle_get_dog_walk_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=100,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])
        events = [{'id': event['id'], 'start': event['start'],'end': event['end'],'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)]), 'owned': True if user_email in event['summary'] else False, 'recurring': True if 'recurringEventId' in event else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except HttpError as Error:
        print(Error)
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/get-meeting', methods=['POST', 'OPTIONS'])
@jwt_required()
def handle_meeting_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=100,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])

        events = [{'id': event['id'], 'start': event['start'],'end': event['end'],'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)]), 'owned': True if user_email in event['summary'] else False, 'recurring': True if 'recurringEventId' in event else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404


@api.route('/get-pet-check-in', methods=['POST', 'OPTIONS'])
@jwt_required()
def handle_get_pet_check_in_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=100,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])

        events = [{'id': event['id'], 'start': event['start'],'end': event['end'],'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)]), 'owned': True if user_email in event['summary'] else False, 'recurring': True if 'recurringEventId' in event else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404


@api.route('/get-pet-sitting', methods=['POST', 'OPTIONS'])
@jwt_required()
def handle_get_pet_sitting_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"
        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=100,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])

        events = [{'id': event['id'], 'start': event['start'],'end': event['end'],'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)]), 'owned': True if user_email in event['summary'] else False, 'recurring': True if 'recurringEventId' in event else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/schedule-walk-or-check-in-or-meet-and-greet', methods=['POST', 'OPTIONS'])
@jwt_required()
def handle_schedule_walk_or_check_in_or_meet_and_greet():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_id = user.serialize()["id"]

    req = request.get_json()

    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

    try:
        service = build("calendar", "v3", credentials=creds)
        type_of_booking = req["type"]
        details = req["details"]
        pets = req["pets"]
        start_time = req["startTime"]
        end_time = req["endTime"]
        recurring = req["recurring"]
        recurring_until = req["recurringUntil"]
        user_address = req["address"]
        number_of_services_used = None
        if Number_Of_Services_Used.query.filter_by(user_id=user_id).first() is not None:
            number_of_services_used = Number_Of_Services_Used.query.filter_by(user_id=user_id).first()
        
        if type_of_booking == 'Dog Walk':
            if number_of_services_used is None:
                new_num_services = Number_Of_Services_Used(user_id=user_id, walks=1, check_ins=0, pet_sittings=0)
                db.session.add(new_num_services)
                db.session.commit()
            elif number_of_services_used.walks == 10:
                number_of_services_used.walks = 0
                db.session.commit()
            else:
                number_of_services_used.walks = number_of_services_used.walks + 1
                db.session.commit()

        if type_of_booking == 'Pet Check In':
            if number_of_services_used is None:
                new_num_services = Number_Of_Services_Used(user_id=user_id, walks=0, check_ins=1, pet_sittings=0)
                db.session.add(new_num_services)
                db.session.commit()
            elif number_of_services_used.check_ins == 10:
                number_of_services_used.check_ins  = 0
                db.session.commit()
            else:
                number_of_services_used.check_ins  = number_of_services_used.check_ins  + 1
                db.session.commit()

        if recurring and recurring_until:
            event = {
                    'summary': type_of_booking + ' with ' + ' and '.join(pets) + ' for ' + email,
                    'location': user_address,
                    'description': details,
                    'start': {
                        'dateTime': start_time,
                        'timeZone': 'America/Denver',
                    },
                    'end': {
                        'dateTime': end_time,
                        'timeZone': 'America/Denver',
                    },
                    'recurrence': [
                        'RRULE:FREQ=WEEKLY' + ';UNTIL=' + ''.join(recurring_until.split('-'))
                    ],
                }
        elif recurring:
            event = {
                    'summary': type_of_booking + ' with ' + ' and '.join(pets) + ' for ' + email,
                    'location': user_address,
                    'description': details,
                    'start': {
                        'dateTime': start_time,
                        'timeZone': 'America/Denver',
                    },
                    'end': {
                        'dateTime': end_time,
                        'timeZone': 'America/Denver',
                    },
                    'recurrence': [
                        'RRULE:FREQ=WEEKLY'
                    ],
                }
                
        else:
            event = {
                    'summary': type_of_booking + ' with ' + ' and '.join(pets) + ' for ' + email,
                    'location': user_address,
                    'description': details,
                    'start': {
                        'dateTime': start_time,
                        'timeZone': 'America/Denver',
                    },
                    'end': {
                        'dateTime': end_time,
                        'timeZone': 'America/Denver',
                    },
                }


        event = service.events().insert(calendarId=calendar_id, body=event).execute()

        start_date_time = datetime.datetime.fromisoformat(start_time)
        end_date_time = datetime.datetime.fromisoformat(end_time)

        email_sender = os.getenv('EMAIL_SENDER')
        email_password = os.getenv('EMAIL_PASSWORD')
        email_receiver = email
        email_subject = 'Pet Care Service Scheduled.'
        if user_address is None:
            user_address = ''
        if(recurring):
            email_body = 'You have successfully scheduled a recurring ' + type_of_booking + ' for ' + ' and '.join(pets) + ' at ' + user_address + ' starting at ' + start_date_time.strftime("%Y %B %d %I:%M %p") + ' and ending at ' + end_date_time.strftime("%Y %B %d %I:%M %p.")
        else:
            email_body = 'You have successfully scheduled a ' + type_of_booking + ' for ' + ' and '.join(pets) + ' at ' + user_address + ' starting at ' + start_date_time.strftime("%Y %B %d %I:%M %p") + ' and ending at ' + end_date_time.strftime("%Y %B %d %I:%M %p.")
       
        em = EmailMessage()
        em['from'] = email_sender
        em['to'] = email_receiver
        em['subject'] = email_subject
        em.set_content(email_body)

        context = ssl.create_default_context
        with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
        
        return jsonify({"msg": "Booking created successfully.", "status": "ok"}), 200
    
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred."}), 404


@api.route('/schedule-pet-sitting', methods=['POST', 'OPTIONS'])
@jwt_required()
def handle_schedule_pet_sitting():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_id = user.serialize()["id"]

    req = request.get_json()
    print(req)
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"

    
    try:
        service = build("calendar", "v3", credentials=creds)
        type_of_booking = req["type"]
        details = req["details"]
        pets = req["pets"]
        start_time = req["startTime"]
        end_time = req["endTime"]
        user_address = req["address"]
        
        number_of_services_used = None
        if Number_Of_Services_Used.query.filter_by(user_id=user_id).first() is not None:
            number_of_services_used = Number_Of_Services_Used.query.filter_by(user_id=user_id).first()
        
        if type_of_booking == 'Pet Sitting':
            if number_of_services_used is None:
                new_num_services = Number_Of_Services_Used(user_id=user_id, walks=0, check_ins=0, pet_sittings=1)
                db.session.add(new_num_services)
                db.session.commit()
            elif number_of_services_used.pet_sittings == 10:
                number_of_services_used.pet_sittings = 0
                db.session.commit()
            else:
                number_of_services_used.pet_sittings = number_of_services_used.pet_sittings + 1
                db.session.commit()

            event = {
                    'summary': type_of_booking + ' with ' + ' and '.join(pets) + ' for ' + email,
                    'location': user_address,
                    'description': details,
                    'start': {
                        'dateTime': start_time,
                        'timeZone': 'America/Denver',
                    },
                    'end': {
                        'dateTime': end_time,
                        'timeZone': 'America/Denver',
                    },
                }

        print(event)
        event = service.events().insert(calendarId=calendar_id, body=event).execute()

        start_date_time = datetime.datetime.fromisoformat(start_time)
        end_date_time = datetime.datetime.fromisoformat(end_time)

        email_sender = os.getenv('EMAIL_SENDER')
        email_password = os.getenv('EMAIL_PASSWORD')
        email_receiver = email
        email_subject = 'Pet Care Service Scheduled.'
        email_body = 'You have successfully scheduled a ' + type_of_booking + ' for ' + ' and '.join(pets) + ' at ' + user_address + ' starting at ' + start_date_time.strftime("%Y %B %d %I:%M %p") + ' and ending at ' + end_date_time.strftime("%Y %B %d %I:%M %p.")

        em = EmailMessage()
        em['from'] = email_sender
        em['to'] = email_receiver
        em['subject'] = email_subject
        em.set_content(email_body)

        context = ssl.create_default_context
        with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())

        return jsonify({"msg": "Booking created successfully.", "status": "ok"}), 200
    
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred."}), 404
    
@api.route('/get-pet-names', methods=['GET'])
@jwt_required()
def get_pet_names():
    email = get_jwt_identity()
    print('!!!!!!!!!!!!')
    print(email)
    user = User.query.filter_by(email=email).first()
    print('!!!!!!!!!!')
    print(user)
    try: 
        pets = user.serialize()["pets"]
        pet_names = [pet["name"] for pet in pets]
        if len(pet_names) == 0:
            pet_names = []
        return jsonify({"pets": pet_names, "status": "ok"}), 200
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred."}), 404
    
@api.route('/cancel/pet-check-in-or-meeting-or-dog-walk', methods=['POST', 'OPTIONS'])
@jwt_required()
def cancel_pet_check_in_or_meeting_or_dog_walk():
    email = get_jwt_identity()
    req = request.get_json()
    recurring = req['recurring']
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)


    calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

    service = build("calendar", "v3", credentials=creds)
    
    try:
        service.events().delete(calendarId=calendar_id, eventId=req['id']).execute()
        if recurring:
            events = service.events().instances(calendarId=calendar_id, eventId=req['id']).execute()
            recurring_id = events['items'][0]['recurringEventId']
            service.events().delete(calendarId=calendar_id, eventId=recurring_id).execute()

            email_sender = os.getenv('EMAIL_SENDER')
            email_password = os.getenv('EMAIL_PASSWORD')
            email_receiver = email
            email_subject = 'Pet Care Service Scheduled.'
            email_body = 'You have successfully cancelled a recurring booking with Hot Doggity Dog Walkers.'
                

            em = EmailMessage()
            em['from'] = email_sender
            em['to'] = email_receiver
            em['subject'] = email_subject
            em.set_content(email_body)

            context = ssl.create_default_context
            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
                smtp.login(email_sender, email_password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())

            return jsonify({"msg": "Events deleted successfully."})
        else:
            email_sender = os.getenv('EMAIL_SENDER')
            email_password = os.getenv('EMAIL_PASSWORD')
            email_receiver = email
            email_subject = 'Pet Care Service Scheduled.'
            email_body = 'You have successfully cancelled a booking with Hot Doggity Dog Walkers.'
            em = EmailMessage()
            em['from'] = email_sender
            em['to'] = email_receiver
            em['subject'] = email_subject
            em.set_content(email_body)

            context = ssl.create_default_context
            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
                smtp.login(email_sender, email_password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())
            return jsonify({"msg": "Event deleted successfully."})
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred."}), 404


@api.route('/cancel/pet-sitting', methods=['POST', 'OPTIONS'])
@jwt_required()
def cancel_pet_sitting():
    email = get_jwt_identity()
    req = request.get_json()
    recurring = req['recurring']
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)


    calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"

    service = build("calendar", "v3", credentials=creds)

    try:
        service.events().delete(calendarId=calendar_id, eventId=req['id']).execute()
        if recurring:
            events = service.events().instances(calendarId=calendar_id, eventId=req['id']).execute()
            recurring_id = events['items'][0]['recurringEventId']
            service.events().delete(calendarId=calendar_id, eventId=recurring_id).execute()

            email_sender = os.getenv('EMAIL_SENDER')
            email_password = os.getenv('EMAIL_PASSWORD')
            email_receiver = email
            email_subject = 'Pet Care Service Scheduled.'
            email_body = 'You have successfully cancelled a recurring booking with Hot Doggity Dog Walkers.'
                

            em = EmailMessage()
            em['from'] = email_sender
            em['to'] = email_receiver
            em['subject'] = email_subject
            em.set_content(email_body)

            context = ssl.create_default_context
            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
                smtp.login(email_sender, email_password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())

            return jsonify({"msg": "Events deleted successfully."})
        else:
            email_sender = os.getenv('EMAIL_SENDER')
            email_password = os.getenv('EMAIL_PASSWORD')
            email_receiver = email
            email_subject = 'Pet Care Service Scheduled.'
            email_body = 'You have successfully cancelled a booking with Hot Doggity Dog Walkers.'
            em = EmailMessage()
            em['from'] = email_sender
            em['to'] = email_receiver
            em['subject'] = email_subject
            em.set_content(email_body)

            context = ssl.create_default_context
            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
                smtp.login(email_sender, email_password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())
            return jsonify({"msg": "Event deleted successfully."})
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred."}), 404

@api.route('/get-address', methods=['GET'])
@jwt_required()
def get_address():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    print(user)
    try: 
        address = user.serialize()["address"]
        if address is not None:
            return jsonify({"address": address, "status": "ok"}), 200
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred. Have you set an address?"}), 404

@api.before_request 
def before_request(): 
    headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } 
    print(headers)
    if request.method == 'OPTIONS' or request.method == 'options': 
        return jsonify(headers), 200

@api.route('/get-discount', methods=['POST', 'OPTIONS'])
@jwt_required()
def get_discount():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_id = user.serialize()["id"]
    number_of_services_used = False
    if Number_Of_Services_Used.query.filter_by(user_id=user_id).first() is not None:
        number_of_services_used = Number_Of_Services_Used.query.filter_by(user_id=user_id).first()
        print(number_of_services_used)
    req = request.get_json()
    type_of_schedule = req['type']
    try: 
        if number_of_services_used:
            num_services = number_of_services_used.serialize()
            if num_services is not None:
                if num_services[type_of_schedule]== 10:
                    return jsonify({"discount": True, "status": "ok"}), 200
                else:
                    return jsonify({"discount": False, "status": "ok"}), 200
            else:
                return jsonify({"discount": False, "status": "ok"}), 200
        else:
            return jsonify({"discount": False, "status": "ok"}), 200
        
    except HttpError as error:
        print(error)
        return jsonify({"msg": "An error occurred."}), 404

@api.before_request 
def before_request(): 
    headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } 
    if request.method == 'OPTIONS' or request.method == 'options': 
        return jsonify(headers), 200

