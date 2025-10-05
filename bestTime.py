import numpy as np
import itertools
import os
import math

BLOCKS=96
DAYS=7
PEOPLE=50
WINDOW=4 #1 block is 15 mins. Ex. WINDOW=4 means 4 blocks ~ 1hour

def example():
    a = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    b = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    c = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    d = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    e = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    return a, b, c, d, e

def calculate_times(a, n=5, window=1):
    matrix=a
    for i in range(n):
        matrix += np.random.randint(0, 2, size=(DAYS, BLOCKS))
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



def best_times(matrix, people, window):
    flat_indices = np.argsort(matrix, axis=None)
    top10_flat_indices = flat_indices[:10]

    top10_coords = np.array(np.unravel_index(top10_flat_indices, matrix.shape)).T

    print("Top 10 minimum values and coordinates:")
    for coord in top10_coords:
        day, block = coord
        value = matrix[day, block]
        print(f"Day {day+1}, Block {block+1}, {block_to_time(block, window=4)}, Free: {people-math.ceil(value)} to {people-math.floor(value)} people")

def main():
    #events = events(eventID)

    a = example() #busyness matrices
    times = calculate_times(a, n=PEOPLE, window=WINDOW)
    top = best_times(times, people=PEOPLE)
    print(top)

if __name__ == '__main__':
    main()

