from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi import FastAPI, Request
import numpy as np
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
    print(url)
    print(key)

    response = (
        supabase.table("Events")
        .select("interested")
        .eq("id", 52)
        .execute()
    )
    # print(response.data)
    #ids of interested people
    interested=[user_id for user_id in response.data[0]['interested']]
    # print(interested)

    availabilities = []
    for uid in interested:
        # availabilities
        response = (
            supabase.table("Profiles")
            .select("availability") 
            .eq("id", uid)
            .execute()
        )
        availabilities.append(np.array([response.data[0]['availability']]))

    # print(availabilities)

    # print([np.array(matrix['availability']).T for matrix in response.data])
    # availabilities = [matrix['availability'] for matrix in response.data]

    # ## specific window size
    response = (
        supabase.table("Events")
        .select("windowSize")
        .eq("id", 52)
        .execute()
    )
    window = response.data[0]["windowSize"]
# print(window)

# print(bestTime.main(availabilities, window))
    return bestTime.main(availabilities, window) #A dictionary of dictionaries: {block: {day: , time:, free: ()}}


### Testing
# import numpy as np

# a = [np.random.randint(0, 2, size=(7, 96)) for __ in range(10)]
# top = bestTime.main(a, 3)

# print(top)

