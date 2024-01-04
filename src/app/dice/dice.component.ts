import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  @Input() diceValue !: number;
  @Input() rolling: boolean = false;
  // @Input() activePlayerColor: string = 'red';

  // getDiceStyle(): any {
  //   return this.rolling ? { animation: 'rollDice 2s ease-out infinite' } : { backgroundColor: this.activePlayerColor };
  // }

}
