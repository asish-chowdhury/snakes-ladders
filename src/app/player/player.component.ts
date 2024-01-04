import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() player!: Player;
  // @Input() isActive: boolean = false;
  playerColors: string[] = ['red', 'blue', 'green', 'yellow'];
  getPlayerColor(): string {
    return this.playerColors[this.player.id - 1];
  }
}

interface Player {
  id: number;
  position: number;
}
