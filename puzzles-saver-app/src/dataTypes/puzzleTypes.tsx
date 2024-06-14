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
    puzzles: Array<string>
}

export type { Puzzle, Puzzleset }