type Puzzle = {
    fen: string,
    answer: string,
    title?: string,
    date?: string,
    whitePlayer?: string,
    blackPlayer?: string
}

type Puzzleset = {
    name: string,
    date: string,
    puzzles: Array<string>
}

export type { Puzzle, Puzzleset }