import puzzle
import random

def load_starting_menu():
    print("1. Load Set")
    print("2. Play Random Set")
    print("3. Import New Puzzles")
    print("\n\n\n\n\n")
    choice = input()
    match choice:
        case "1":
            display_load_puzzleset_menu()
        case "2":
            display_generate_random_menu()
        case "3":
            display_import_puzzle_menu()


def display_load_puzzleset_menu():
    print("Current puzzles: " + puzzle.current_saved())
    choice = input("Load which set? ")
    puzzles_to_play = puzzle.load_set(choice)
    for p in puzzles_to_play:
        p.play()


def display_generate_random_menu():
    size = int(input("Number of puzzles to include? "))
    print("Current puzzles: " + puzzle.current_saved())
    tags_raw = input("Which sets do you want to include? ")
    tags = tags_raw.split()
    proportion_limit = size // len(tags)

    loaded_sets = list()
    for tag in tags:
        loaded_sets.append(puzzle.load_set(tag))
    
    generated = set()
    number_of_puzzles_represented = [0]*len(loaded_sets)

    while (len(generated) < size):
        tag_to_add_from = random.randint(0,len(loaded_sets) - 1)
        if number_of_puzzles_represented[tag_to_add_from] > proportion_limit:
            loaded_sets.pop(tag_to_add_from)
            number_of_puzzles_represented.pop(tag_to_add_from)
            continue
        
        current_puzzles_to_choose = loaded_sets[tag_to_add_from]
        number_of_puzzles_represented[tag_to_add_from] += 1

        added = False
        while (not added):
            #TODO: Not good - what happens if we add the last of 50 puzzles?
            #Instead we should remove each from the list
            index_to_add = random.int(0,len(current_puzzles_to_choose) - 1)
            puzzle_to_add = current_puzzles_to_choose[index_to_add]
            if puzzle_to_add not in generated:
                generated.add(puzzle_to_add)
                added = True
    
    for p in generated:
        p.play()


def display_import_puzzle_menu():
    print("1. Many (from file)") 
    print("2. One")
    print("\n\n\n\n\n\n\n")
    choice = input()
    match choice:
        case "2":
            display_create_new_puzzle_menu()


def display_create_new_puzzle_menu():
    fen = input("Fen? ")
    solution = input("Solution? ")
    explanation = input("Explanation? ")
    new_puzzle = puzzle.Puzzle(fen, solution, explanation)
    tags_raw = input("\nTags? ")
    tags = tags_raw.split(", ")
    for tag in tags:
        puzzle.save(new_puzzle, tag)


if __name__ == "__main__":
    load_starting_menu()