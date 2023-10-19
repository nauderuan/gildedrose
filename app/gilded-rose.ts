export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  static NORMAL_QUANTITY_DECREASE = 1;
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // Handle the items that decrease in quality
        if (this.items[i].quality > 0) {
          // Skip items that do not decrease or increase in value.
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            //Sticking with the != approach to keep the code consistent with the rest of the class
            if (this.items[i].name != 'Conjured Mana Cake') {
              // Handle decreasing items with the normal amount
              this.items[i].quality = this.items[i].quality - GildedRose.NORMAL_QUANTITY_DECREASE
            } else {
              // Handle decreasing items with double the normal amount
              this.items[i].quality = this.items[i].quality - (GildedRose.NORMAL_QUANTITY_DECREASE * 2)
              // quality should never be negative and since we decrease with more that 1 we need a safety check here
              if (this.items[i].quality < 0) {
                this.items[i].quality = 0;
              }
            }
          }
        }
      } else {
        // Handle the items that increase in value
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // Update sellIn for items that decrease or decrease in value
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        // Here we handle items that have passed their sell by date
        if (this.items[i].name != 'Aged Brie') {
          //Handle items that decrease in quality after sell by date
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              // Skip items that do not decrease or increase in value after sell by date
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                if (this.items[i].name != 'Conjured Mana Cake') {
                  // Handle decreasing items twice as fast after sell by date with the normal amount
                  // Here we just subtract the normal amount again since the above code would have already decrease it by the normal amount
                  this.items[i].quality = this.items[i].quality - GildedRose.NORMAL_QUANTITY_DECREASE
                } else {
                  // Handle decreasing items twice as fast after sell by date with the normal amount * 2
                  // Here we just subtract the normal*2 amount again since the above code would have already decrease it by the normal*2 amount
                  this.items[i].quality = this.items[i].quality - (GildedRose.NORMAL_QUANTITY_DECREASE * 2)
                  // quality should never be negative and since we decrease with more that 1 we need a safety check here
                  if (this.items[i].quality < 0) {
                    this.items[i].quality = 0;
                  }
                }
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          //Handle items that increase in quality after sell by date
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}