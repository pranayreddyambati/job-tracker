from pymongo import MongoClient
from config import Config
import certifi

client = MongoClient(
    Config.MONGO_URI,
    tlsCAFile=certifi.where()
)

db = client["jobtracker"]

users_collection = db["users"]
applications_collection = db["applications"]
activities_collection = db["activities"]