from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi import FastAPI, Request
import bestTime
import os

# Load .env file
load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = FastAPI()
@app.post("/best-time/{event_id}")
async def best_time(event_id: str):
    # print(url)
    # print(key)
    response = (
        supabase.table("Profiles")
        .select("availibilty") #misspelled
        .execute()
    )
    # print([matrix['availibilty'] for matrix in response.data])
    availabilities = [matrix['availibilty'] for matrix in response.data]

    response = (
        supabase.table("Events")
        .select("window")
        .eq("id", event_id)
        .execute()
    )
    window = response.data[0]["window"]
    # print(response.data)

    return bestTime.main(availabilities, window) #A dictionary of dictionaries: {block: {day: , time:, free: ()}}


### Testing
# import numpy as np

# a = [np.random.randint(0, 2, size=(7, 96)) for __ in range(10)]
# top = bestTime.main(a, 3)

# print(top)

