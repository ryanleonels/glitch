addLayer("gwa", {
    name: "gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            unlockedGwas: [],
        }
    },
    image: "https://cdn.discordapp.com/emojis/844745243592884264.png?v=1",
    color: "#ffffff",
    requires(){
      return new Decimal(1e20)}, // Can be a function that takes requirement increases into account
    resource: "gwa", // Name of prestige currency
    baseResource: "cardinals", // Name of resource prestige is based on
    baseAmount() {
        return player.c.points
    }, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    prestigeButtonText(){return "Gwaify all your cardinals into <b>+"+formatWhole(this.getResetGain())+"</b> gwas.<br>Requires: "+formatWhole(this.requires())+" cardinals"},
    branches: [],
    getNextAt(){return this.requires()},
    getResetGain(){
      if (!hasMilestone("gwa",0))return new Decimal(1)
      return player.c.points.div(this.requires()).floor()
    },
    canReset(){return player.c.points.gte(this.requires())},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return hasUpgrade("d", 25) && !inAnyChallenge("r");
    },
    isActive(){ return hasUpgrade("d", 25); },
    onPrestige(){
      player.c.points = new Decimal(0);
    },
    milestones: {
        0: {
            requirementDescription: "1 gwa",
            effectDescription: "You have Gwa. In your house. (enables bulk gwaify)",
            done() { return player.gwa.points.gte(1) }
        },
        1: {
            requirementDescription: "Full House",
            effectDescription: "collect all 57 gwa variations to win the game",
            done() { return player.gwa.upgrades.length == Object.keys(layers.gwa.upgrades).length-2 }
        },
    },
    buyables:{
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return (new Decimal(x).gte(Object.keys(layers.gwa.upgrades).length-2)) ? new Decimal("10^^1e308") : new Decimal(x).add(1);
        },
        display() { return "Unlocks a random gwa<br>Cost: "+format(this.cost())+" gwa" },
      title: "gwa Gacha",
        canAfford() { return player.gwa.points.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            if (getBuyableAmount(this.layer, this.id).gt(Object.keys(layers.gwa.upgrades).length-2)) return;
            let gwaed = false;
            while (!gwaed) {
              let gwaNumber = Math.floor(Math.random() * (Object.keys(layers.gwa.upgrades).length-2));
              let gwaIndex = (10 * (Math.floor(gwaNumber / layers.gwa.upgrades.cols) + 1)) + (Math.floor(gwaNumber % layers.gwa.upgrades.cols) + 1);
              if (!player.gwa.unlockedGwas.includes(gwaIndex)) {
                player.gwa.unlockedGwas.push(gwaIndex);
                gwaed = true;
              }
            }
            let x=getBuyableAmount(this.layer,this.id)
            player.gwa.points = player.gwa.points.sub(x);
        },
      unlocked(){return true},
      effect(){return getBuyableAmount(this.layer,this.id).add(1)},
    },
  },
    upgrades: {
        rows: 8,
        cols: 8,
        11: {
            title: "gwa",
            description: "The Original.<br>Has a childlike innocence and is very kind. Seems to have immense power but is also very reluctant to use the power.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(11); }
        },
        12: {
            title: "voidgwa",
            description: "A Strange Alternate gwa.<br>Seems to be exactly like gwa, but its appearance is inverted.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/voidgwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(12); }
        },
        13: {
            title: "crgwa",
            description: "This gwa merged with a creature known as CRG.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/crgwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(13); }
        },
        14: {
            title: "gwaappear",
            description: "This gwa has mastered the art of teleportation and is eager to show it off.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaappear.gif'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(14); }
        },
        15: {
            title: "gwablob",
            description: "This gwa managed to merge with a rare yellow creature known as a blob.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwablob.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(15); }
        },
        16: {
            title: "gwaception",
            description: "This gwa was somehow able to create smaller gwas and merge with them, then the smaller gwas did the same thing.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaception.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(16); }
        },
        17: {
            title: "gwacloud",
            description: "This gwa is extremely light, almost to the point of transparency.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwacloud.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(17); }
        },
        18: {
            title: "gwacoin",
            description: "A rare gwacoin.<br>gwacoins are the official currency of the gwas, and are worth massive amounts of human money.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwacoin.gif' width='96' height='96'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(18); }
        },
        21: {
            title: "gwadark",
            description: "This gwa is slightly darker than your average gwa.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwadark.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(21); }
        },
        22: {
            title: "gwadrip",
            description: "This gwa has a talent for looking great.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwadrip.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(22); }
        },
        23: {
            title: "gwaed",
            description: "You've been gwaed.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaed.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(23); }
        },
        24: {
            title: "gwagic",
            description: "This gwa has mastered the art of human magic.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwagic.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(24); }
        },
        25: {
            title: "gwaheart",
            description: "gwas assume this form when they are seeking a partner<br>Though gwas do not mate they still have romantic relationships.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaheart.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(25); }
        },
        26: {
            title: "gwairl",
            description: "This gwa has transcended beyond the gwa realm and fully integrated into the human realm.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwairl.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(26); }
        },
        27: {
            title: "gwaleft",
            description: "This gwa was the first to discover the ability to face left.<br>Though gwas traditionally face right, facing left was legalized in [???] (gwa years)",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaleft.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(27); }
        },
        28: {
            title: "gwalight",
            description: "This gwa is slightly brighter than your average gwa.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwalight.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(28); }
        },
        31: {
            title: "gwano",
            description: "This gwa refuses everything it is asked.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwano.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(31); }
        },
        32: {
            title: "gwa-o-lantern",
            description: "This gwa has merged with a human jack-o-lantern for some reason.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaolantern.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(32); }
        },
        33: {
            title: "gwapat",
            description: "This gwa enjoys pats.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwapat.gif'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(33); }
        },
        34: {
            title: "gwaping",
            description: "This gwa has been enraged by a member of the ping'th cult.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaping.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(34); }
        },
        35: {
            title: "gwapog",
            description: "This gwa is very, very excited.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwapog.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(35); }
        },
        36: {
            title: "gwarnament",
            description: "This gwa has somehow become an oranament.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwarnament.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(36); }
        },
        37: {
            title: "gwarich",
            description: "This gwa has cashed in its gwacoin for extreme wealth in the human realm.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwarich.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(37); }
        },
        38: {
            title: "gwarson",
            description: "This gwa has a dangerous obsession with fire.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwarson.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(38); }
        },
        41: {
            title: "gwasanta",
            description: "This gwa is in the Christmas spirit.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwasanta.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(41); }
        },
        42: {
            title: "gwasmith",
            description: "This gwa managed to travel to the Synergism realm and merge with an unsmith.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwasmith.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(42); }
        },
        43: {
            title: "gwaspectrum",
            description: "This gwa has somehow developed the ability to shift its appearance between all common gwa colors.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaspectrum.gif'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(43); }
        },
        44: {
            title: "gwastar",
            description: "This gwa has merged with a star.<br>It hates starboard.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwastar.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(44); }
        },
        45: {
            title: "gwatoot",
            description: "This gwa is celebrating.<br>Perhaps you'd like to take a break from reading this to join it?",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwatoot.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(45); }
        },
        46: {
            title: "gwatroll",
            description: "This gwa got a little too far into human culture and decided to do a little trolling.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwatroll.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(46); }
        },
        47: {
            title: "gwawoke",
            description: "Something has enraged this gwa.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwawoke.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(47); }
        },
        48: {
            title: "gwayes",
            description: "The opposite of gwano.<br>This gwa accepts everything it is asked.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwayes.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(48); }
        },
        51: {
            title: "ourgwa",
            description: "好公民……就像中共……中国强大……",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/ourgwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(51); }
        },
        52: {
            title: "pissgwa",
            description: "The Origins of this gwa are unknown.<br>It is very strange and doesn't behave like other gwas.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/pissgwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(52); }
        },
        53: {
            title: "pissgwadrip",
            description: "This pissgwa tried to copy the fashion style of gwadrip.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/pissgwadrip.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(53); }
        },
        54: {
            title: "pridegwa",
            description: "This gwa is showing its support for human culture, particularly LGBTQ+ cultures.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/pridegwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(54); }
        },
        55: {
            title: "ungwa",
            description: "Nearly nothing is known about this gwa.<br>It is incredibly strange, even more than pissgwa.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/ungwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(55); }
        },
        56: {
            title: "voidgwapog",
            description: "This voidgwa is extremely excited.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/voidgwapog.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(56); }
        },
        57: {
            title: "voidgwawoke",
            description: "Something has enraged this voidgwa.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/voidgwawoke.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(57); }
        },
        58: {
            title: "zamgwa",
            description: "A strange gwa.<br>It has merged with two zamboners, which were thought to be extinct.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/zamgwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(58); }
        },
        61: {
            title: "gwafront",
            description: "Utter Horror.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwafront.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(61); }
        },
        62: {
            title: "gwa1990",
            description: "This gwa was created in 1990.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwa1990.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(62); }
        },
        63: {
            title: "gwacake",
            description: "This gwa has somehow merged with a cake.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwacake.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(63); }
        },
        64: {
            title: "gwacard",
            description: "Who knows what might be on the other side of this card?",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwacard.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(64); }
        },
        65: {
            title: "gwadonut",
            description: "This gwa ate too many donuts.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwadonut.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(65); }
        },
        66: {
            title: "gwaegg",
            description: "This gwa has not hatched yet.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaegg.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(66); }
        },
        67: {
            title: "gwagoodnight",
            description: "This gwa is about to go to sleep.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwagoodnight.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(67); }
        },
        68: {
            title: "gwahat",
            description: "Similar to gwadrip, this gwa is cooler than the others.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwahat.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(68); }
        },
        71: {
            title: "gwaorb",
            description: "This gwa merged with a creature known as Jacorb.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaorb.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(71); }
        },
        72: {
            title: "gwaplace",
            description: "This gwa is even more pixelated than gwa1990.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwaplace.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(72); }
        },
        73: {
            title: "gwascii",
            description: "This gwa was made using only text.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwascii.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(73); }
        },
        74: {
            title: "gwator",
            description: "A gwa that seems to have been lit on fire, presumably by gwarson.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwator.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(74); }
        },
        75: {
            title: "gwatruder",
            description: "Look behind you.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwatruder.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(75); }
        },
        76: {
            title: "gwawokeyou",
            description: "RUN.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwawokeyou.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(76); }
        },
        77: {
            title: "gwazil",
            description: "VAI BRAZIL NUMERO UNO 🎖️🎖️🎖️🎖️🎖️🎖️<br>CAMPAEO DE MUNDO 🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwazil.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(77); }
        },
        78: {
            title: "gworm",
            description: "This gwa merged with a worm. It is extremely dangerous.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gworm.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(78); }
        },
        81: {
            title: "hedgegwa",
            description: "This gwa uses other sharp gwas to protect itself.",
            cost: 0,
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/hedgegwa.png'>" },
            unlocked() { return player.gwa.unlockedGwas.includes(81); }
        },
    }
})