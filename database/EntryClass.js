/**
 * User Entry class for Database
 * @author Mona <mona.vonhein@haw-hamburg.de>
 */

export default class Entry {
  constructor(date, pain, mood, blood, note, day) {
    this.date = date;
    this.pain = pain;
    this.mood = mood;
    this.blood = blood;
    this.note = note;
  }
}
