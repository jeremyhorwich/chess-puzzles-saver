type Puzzle = {
    fen: string,
    answer: string,
    title?: string,
    date?: string,
    whitePlayer?: string,
    blackPlayer?: string
}

type Puzzleset = {
    id: string,
    date: string,
    name: string,
    puzzles: Array<string>
}

export type { Puzzle, Puzzleset }