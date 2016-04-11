export class Evolution {

  public trigger: string;
  public level: number;
  public stone: string;
  public held_item: string;
  public notes: string;

  constructor (params) {
    this.trigger = params.trigger;
    this.level = params.level;
    this.stone = params.stone;
    this.held_item = params.held_item;
    this.notes = params.notes;
  }

}
