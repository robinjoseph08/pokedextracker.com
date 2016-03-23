export class Pokemon {

  public national_id: number;
  public name: string;
  public kanto_id: number;
  public johto_id: number;
  public hoenn_id: number;
  public sinnoh_id: number;
  public unova_id: number;
  public central_kalos_id: number;
  public coastal_kalos_id: number;
  public mountain_kalos_id: number;
  public regionless: boolean;
  public icon_url: string;
  public bulbapedia_url: string;
  public x_locations: string[];
  public y_locations: string[];
  public or_locations: string[];
  public as_locations: string[];

  constructor (params) {
    this.national_id = params.national_id;
    this.name = params.name;
    this.kanto_id = params.kanto_id;
    this.johto_id = params.johto_id;
    this.hoenn_id = params.hoenn_id;
    this.sinnoh_id = params.sinnoh_id;
    this.unova_id = params.unova_id;
    this.central_kalos_id = params.central_kalos_id;
    this.coastal_kalos_id = params.coastal_kalos_id;
    this.mountain_kalos_id = params.mountain_kalos_id;
    this.regionless = params.regionless;
    this.icon_url = params.icon_url;
    this.bulbapedia_url = params.bulbapedia_url;
    this.x_locations = params.x_locations;
    this.y_locations = params.y_locations;
    this.or_locations = params.or_locations;
    this.as_locations = params.as_locations;
  }

}