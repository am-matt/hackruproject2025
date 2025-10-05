oad .env file
# load_dotenv()

# url: str = os.getenv("SUPABASE_URL")
# key: str = os.getenv("SUPABASE_KEY")
# supabase: Client = create_client(url, key)

# print(url)
# print(key)

# response = (
#     supabase.table("Profiles")
#     .select("*") #misspelled
#     .execute()
# )
# print([matrix['availibilty'] for matrix in response.data])
# availabilities = [matrix['availibilty'] for matrix in response.data]

# response = (
#     supabase.table("Events")
#     .select("window") #misspelled
#     .execute()
# )
# window = response.data
# print(response.data)

# bestTime.main(availabilities, window)