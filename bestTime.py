import numpy as np
import itertools
import os
#from supabase import create_client, Client
BLOCKS=96
DAYS=7

def create_client():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

def events(eventID):
    response = (
    supabase.table("events")
    .select(eventID)
    .execute()
)
    return response

def example():
    a = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    b = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    c = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    d = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    e = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    return a, b, c, d, e

def calculate_times(a, b, c, d, e, window=1):
    matrix = a + b + c + d + e
    if window>1:
        days=len(matrix)
        blocks=len(matrix[0]) - 3
        windowed = np.zeros((days, blocks))

        for day in range(days):
        # Sliding window of size 4
            for block in range(blocks):
                windowed[day, block] = np.mean(matrix[day, block:block+window])
        print(windowed)
        return windowed
    else: 
        return matrix

def block_to_time(block_index, window=1):
    """
    Convert a block index into a time range string based on window size.

    Parameters:
    - block_index: index of the block in the matrix
    - window: number of 15-min blocks in this slot

    Returns: string like '09:15-10:15'
    """
    block_minutes = 15  # smallest unit
    start_total_minutes = block_index * block_minutes
    end_total_minutes = start_total_minutes + window * block_minutes

    start_hour = start_total_minutes // 60
    start_min = start_total_minutes % 60
    end_hour = (end_total_minutes // 60) % 24  # wrap around 24h
    end_min = end_total_minutes % 60

    start_str = f"{start_hour:02d}:{start_min:02d}"
    end_str = f"{end_hour:02d}:{end_min:02d}"
    return f"{start_str}-{end_str}"



def best_times(matrix):
    flat_indices = np.argsort(matrix, axis=None)
    top10_flat_indices = flat_indices[:10]

    top10_coords = np.array(np.unravel_index(top10_flat_indices, matrix.shape)).T

    print("Top 10 minimum values and coordinates:")
    for coord in top10_coords:
        day, block = coord
        value = matrix[day, block]
        print(f"Day {day}, Block {block}, {block_to_time(block, window=3)}, People Busy: {value}")

def main():
    #events = events(eventID)

    a, b, c, d, e = example() #busyness matrices
    times = calculate_times(a, b, c, d, e, window=3)
    top = best_times(times)
    print(top)

if __name__ == '__main__':
    main()

