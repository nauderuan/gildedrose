import { Item, GildedRose } from '../app/gilded-rose';

const items = [
  // new Item("+5 Dexterity Vest", 10, 20), //
  // new Item("Aged Brie", 2, 0), //
  // new Item("Elixir of the Mongoose", 5, 7), //
  // new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  // new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // Run just the new item to see that it decrease correctly while NOT pass sell by date
  // Also updated to be uneven number to test that it does not update quality to a negative value
  new Item("Conjured Mana Cake", 3, 7)];


const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);

  });
  console.log();
  gildedRose.updateQuality();
}
