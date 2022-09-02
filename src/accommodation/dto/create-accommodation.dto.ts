export class CreateAccommmodationDTO {
  readonly id: number;
  readonly type: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly capacity: number;
  readonly userID: number;
}
