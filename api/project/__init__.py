from flask import Flask, jsonify,request
import tarfile,email
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

@dataclass
class Message(db.Model):
    message_id: str
    to_email: str
    from_email: str
    email_date: str
    subject: str

    __tablename__ = "messages"
    message_id = db.Column(db.String(256),primary_key=True)
    to_email = db.Column(db.String(256),unique=False,nullable=False)
    from_email = db.Column(db.String(256),unique=False,nullable=False)
    email_date = db.Column(db.String(64),unique=False,nullable=False)
    subject = db.Column(db.String(512),unique=False,nullable=True)

# how-to screen
@app.route('/')
def home():
    endpoints = []
    endpoints.append({"method":"POST",
                      "uri":"/load",
                      "description":"Loads messages into database.",
                      "parameters":[{"name":"file",
                                     "description":"A tar.gz archive with .msg files within."
                                   }]
                     })
    endpoints.append({"method":"GET",
                       "uri":"/get",
                       "description":"Retrieves all messages from the database."
                      })
    return jsonify(endpoints=endpoints)

@app.route('/get',methods=['GET'])
def get():
    return jsonify(Message.query.all())

@app.route('/load',methods=['POST'])
def load():
    response = {
        "success":[],
        "error":[]
    }
    if 'file' in request.files:
        try:
            tar = tarfile.open(fileobj=request.files['file'],mode="r:gz")
            for member in tar.getmembers():
                if member.isfile() and member.name.endswith(".msg"):
                    try:
                        msg = email.message_from_binary_file(tar.extractfile(member))
                        # load into database here
                        try:
                            db.session.add(Message(message_id=msg.get("Message-ID"),
                                                   to_email=msg.get("To"),
                                                   from_email=msg.get("From"),
                                                   email_date=msg.get("Date"),
                                                   subject=msg.get("Subject")))
                            # success for record
                            response["success"].append(member.name)
                        except:
                            response["error"].append({"filename":member.name,"errortype":"Database","description":"Failed to insert record into database."})
                    except TypeError:
                        response["error"].append({"filename":member.name,"errortype":"TypeError","description":"File contents are invalid"})
        except tarfile.ReadError:
            return jsonify(error="File %s is not tar.gz archive" % request.files['file'].filename)
    try:
        db.session.commit()
    except:
        return jsonify(error="Unable to commit to database. No data was loaded.")
    # Ensure we have some data and clean up response
    if not response["error"] and not response["success"]:
        return jsonify(error="Archive %s does not contain any files!" % request.files['file'].filename)
    if not response["error"]:
        del response["error"]
    if not response["success"]:
        del response["success"]

    return jsonify(response)
