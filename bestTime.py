import numpy as np
import math

BLOCKS=96
DAYS=7
# PEOPLE=50
WINDOW=4 #1 block is 15 mins. Ex. WINDOW=4 means 4 blocks ~ 1hour

def example():
    a = np.random.randint(0, 2, size=(DAYS, BLOCKS))
    return a

def calculate_times(matrices, window=1):
    # matrix=a[0]
    # for i in range(len(a)):
    #     matrix += np.random.randint(0, 2, size=(DAYS, BLOCKS))
    matrix = np.sum(matrices, axis=0)
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



def best_times(matrix, window, people):
    flat_indices = np.argsort(matrix, axis=None)
    top10_flat_indices = flat_indices[:10]
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    top10_coords = np.array(np.unravel_index(top10_flat_indices, matrix.shape)).T
    top10 = {}
    print("Top 10 minimum values and coordinates:")
    for coord in top10_coords:
        day, block = coord
        day_name = days[day]
        time = block_to_time(block, window)
        value = matrix[day, block]
        low_free = people-math.ceil(value)
        high_free = people-math.floor(value)

        print(f"Day {day_name}, Block {block}, {time}, Free: {low_free} to {high_free} people")

        top10[block] = {"day": day_name, "time": time, "free": (low_free, high_free)}
    return top10



def main(matrices, window):
    #events = events(eventID)
    # a = example() #busyness matrices

    times = calculate_times(matrices, window)
    top = best_times(times, window, people=len(matrices))
    return top

# if __name__ == '__main__':
#     main()

