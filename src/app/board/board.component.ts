import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent implements OnInit {
  players: Player[] = [];
  currentPlayerIndex: number = 0;
  diceValue: number = 1;
  snakes = [
    { start: 16, end: 6 },
    { start: 47, end: 26 },
    { start: 65, end: 34 },
    { start: 93, end: 20 },
    { start: 99, end: 36 }
  ];

  ladders = [
    { start: 2, end: 38 },
    { start: 20, end: 41 },
    { start: 38, end: 63 },
    { start: 56, end: 85 }
  ];

  ngOnInit() {
    // Initialize players
    for (let i = 1; i <= 4; i++) {
      this.players.push({ id: i, position: 1 });
    }
  }
  handleSnakesAndLadders(position: number): number {
    const snake = this.snakes.find(s => s.start === position);
    if (snake) {
      console.log(`Snake found! Move to position ${snake.end}`);
      return snake.end;
    }
    const ladder = this.ladders.find(l => l.start === position);
    if (ladder) {
      console.log(`Ladder found! Move to position ${ladder.end}`);
      return ladder.end;
    }
    return position;
  }
  boardCells(): number[] {
    // Generate an array of numbers from 1 to 100 for the board cells
    return Array.from({ length: 100 }, (_, i) => i + 1);
  }

  isPlayerInCell(cell: number): boolean {
    // Check if any player is in the given cell
    return this.players.some(player => player.position === cell);
  }

  resetGame() {
    this.players.forEach(player => player.position = 1);
    this.currentPlayerIndex = 0;
    this.rollingDice = false;
  }

  getPlayerInCell(cell: number): Player {
    return this.players.find(player => player.position === cell) || { id: 0, position: 0 };
  }

  isGameOver(): boolean {
    // Check if the game is over
    return this.players.some(player => player.position >= 100);
  }

  rollingDice: boolean = false;
  rollDice() {
    if (!this.rollingDice) {
      this.rollingDice = true;

      setTimeout(() => {
        this.diceValue = Math.floor(Math.random() * 6) + 1;
        const currentPlayer = this.players[this.currentPlayerIndex];
        currentPlayer.position += this.diceValue;

        // Handle snakes and ladders
        currentPlayer.position = this.handleSnakesAndLadders(currentPlayer.position);

        // Check for a winner
        if (currentPlayer.position >= 100) {
          alert(`Player ${currentPlayer.id} wins!`);
          this.resetGame();
          return;
        }
        // Switch to the next player
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        // Allow time for the player movement before ending the rolling animation
        setTimeout(() => {
          this.rollingDice = false;
        }, 50);
      }, 1000); // Adjust the total duration based on your animation duration
    }
  }
}

interface Player {
  id: number;
  position: number;
}