/**
 * Tic Tac Toe
 * - X always goes first
 * - players alternate X's and O's
 * - Players cannot play on a played position
 * - A player with 3 O's or X's in a row (vertically or diagonally) wins the game
 * - If all 9 squares are filled without a winner then it's a draw
 */

type Player = "X" | "O";
type Move = "X" | "O" | "";

class Board {
    _moves: Move[];

    constructor() {
        this._moves = ["", "", "", "", "", "", "", "", ""];
    }

    public moveHasBeenPlayed(n): boolean {
        return this._moves[n] !== "";
    }

    public allMovesHaveBeenPlayed(): boolean {
        return this._moves.indexOf("") === -1;
    }

    public makeMove(n: number, player: Player): void {
        this._moves[n] = player;
    }

    public print(): void {
        console.log(this.rows());
    }

    public rows() {
        // Refactor: no more magic numbers
        return [
            [this._moves[0], this._moves[1], this._moves[2]],
            [this._moves[3], this._moves[4], this._moves[5]],
            [this._moves[6], this._moves[7], this._moves[8]],
        ];
    }

    public columns() {
        // Refactor: no more magic numbers
        return [
            [this._moves[0], this._moves[3], this._moves[6]],
            [this._moves[1], this._moves[4], this._moves[7]],
            [this._moves[2], this._moves[5], this._moves[8]],
        ];
    }

    public diagonals() {
        // Refactor: no more magic numbers
        return [
            [this._moves[0], this._moves[4], this._moves[8]],
            [this._moves[2], this._moves[4], this._moves[6]],
        ];
    }
}

class Game {
    _currentPlayer: Player = "X";
    _board: Board = new Board();

    constructor() {}

    public currentPlayer() {
        return this._currentPlayer;
    }

    public move(n) {
        if (this._board.moveHasBeenPlayed(n)) {
            throw new Error("Cant play same move");
        }
        this._board.makeMove(n, this._currentPlayer);
        this._changePlayer();
    }

    public print() {
        this._board.print();
    }

    public winner(): Player | "" | "draw" {
        if (this._board.allMovesHaveBeenPlayed()) {
            return "draw";
        }

        return this._playerWithWinningLine();
    }

    private _changePlayer() {
        this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
    }

    private _potentiallyWinningLines() {
        // Refactor: Law of Demeter violation
        return this._board
            .rows()
            .concat(this._board.columns())
            .concat(this._board.diagonals());
    }

    private _playerWithWinningLine() {
        let winningLines = this._potentiallyWinningLines().filter(
            Game.lineIsAWinner
        );
        if (winningLines.length) {
            return winningLines[0][0];
        }
        return "";
    }

    private static lineIsAWinner(line): boolean {
        return (
            Game.allArrayElementAreTheSame(line) &&
            Game.lineHasBeenPlayedOn(line)
        );
    }

    private static allArrayElementAreTheSame(array) {
        return new Set(array).size === 1;
    }

    private static lineHasBeenPlayedOn(line) {
        return line.some((x) => x !== "");
    }
}

describe("tic-tac-toe", () => {
    describe("starting a new game", () => {
        it("x goes first", () => {
            const game = new Game();
            expect(game.currentPlayer()).toBe("X");
        });

        it("O goes second", () => {
            const game = new Game();
            game.move(1);
            expect(game.currentPlayer()).toBe("O");
        });
    });

    describe("legal moves", () => {
        it("should not allow the same move on one position", () => {
            const game = new Game();
            game.move(0);
            expect(() => {
                game.move(0);
            }).toThrow(Error);
        });
    });

    describe("winners", () => {
        it("new game has no winner yet", () => {
            const game = new Game();
            expect(game.winner()).toBe("");
        });

        it("X wins by filling first row", () => {
            const game = new Game();
            game.move(0);
            game.move(5);
            game.move(1);
            game.move(6);
            game.move(2);
            expect(game.winner()).toBe("X");
        });

        it("O wins by filling first row", () => {
            const game = new Game();
            game.move(7);
            game.move(0);
            game.move(5);
            game.move(1);
            game.move(6);
            game.move(2);
            expect(game.winner()).toBe("O");
        });

        it("X wins by filling last column", () => {
            const game = new Game();
            game.move(2);
            game.move(6);
            game.move(5);
            game.move(1);
            game.move(8);
            expect(game.winner()).toBe("X");
        });

        it("X wins on the last row but O only plays on the second row", () => {
            const game = new Game();
            game.move(6);
            game.move(4);
            game.move(7);
            game.move(5);
            game.move(8);
            expect(game.winner()).toBe("X");
        });

        it("X wins by filling first column", () => {
            const game = new Game();
            game.move(0);
            game.move(2);
            game.move(3);
            game.move(1);
            game.move(6);
            expect(game.winner()).toBe("X");
        });

        it("X wins by filling diagonal from top left", () => {
            const game = new Game();
            game.move(0);
            game.move(6);
            game.move(4);
            game.move(1);
            game.move(8);
            expect(game.winner()).toBe("X");
        });

        it("X wins by filling diagonal from top right", () => {
            const game = new Game();
            game.move(2);
            game.move(5);
            game.move(4);
            game.move(1);
            game.move(6);
            expect(game.winner()).toBe("X");
        });

        it("is incomplete if all but one cell is full and no winner", () => {
            const game = new Game();
            game.move(0);
            game.move(1);
            game.move(2);
            game.move(4);
            game.move(3);
            game.move(5);
            game.move(7);
            game.move(6);

            game.print();

            expect(game.winner()).toBe("");
        });

        it("is a draw if all cells are full", () => {
            const game = new Game();
            game.move(0);
            game.move(1);
            game.move(2);
            game.move(4);
            game.move(3);
            game.move(5);
            game.move(7);
            game.move(6);
            game.move(8);

            game.print();

            expect(game.winner()).toBe("draw");
        });
    });
});
