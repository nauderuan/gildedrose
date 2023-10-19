import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  // This test case could have been added before code changes were made depending if the company workflow
  // states that code without test cases should first get test cases before refactors are done.
  // More scenarios can be added, I am just covering the main 2
  // I had the results saved from the original code and decided to add it at the end.
  it('test the existing code results before sell by date', () => {
    const gildedRose = new GildedRose([
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ]);
    const items = gildedRose.updateQuality();

    // Assert that the quality and sellIn was updated correctly
    expect(items).toEqual([
      new Item("+5 Dexterity Vest", 9, 19),
      new Item("Aged Brie", 1, 1),
      new Item("Elixir of the Mongoose", 4, 6),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50),
    ]);
  });
  it('test the existing code results after sell by date', () => {
    const gildedRose = new GildedRose([
      new Item("+5 Dexterity Vest", -1, 20), //
      new Item("Aged Brie", -1, 0), //
      new Item("Elixir of the Mongoose", -1, 7), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 49),
    ]);
    const items = gildedRose.updateQuality();

    // Assert that the quality and sellIn was updated correctly
    expect(items).toEqual([
      new Item("+5 Dexterity Vest", -2, 18),
      new Item("Aged Brie", -2, 2),
      new Item("Elixir of the Mongoose", -2, 5),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0),
    ]);
  });

  it('should decrease conjured items twice the normal amount when before sell by date', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 4, 13)]);
    const items = gildedRose.updateQuality();

    // Assert that the quality and sellIn was updated correctly
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(11);
    expect(items[0].sellIn).toBe(3);
  });

  it('should decrease conjured items by four times the normal amount when after sell by date', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 13)]);
    const items = gildedRose.updateQuality();

    // Assert that the quality and sellIn was updated correctly
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(9);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should decrease quality for any item that is a conjured item', () => {
    const gildedRose = new GildedRose([new Item('Kiwi conjured shadows', 1, 1)]);
    const items = gildedRose.updateQuality();

    // Assert that the quality and sellIn was updated correctly
    expect(items[0].name).toBe('Kiwi conjured shadows');
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
  });

});
