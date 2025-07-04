addLayer("r", {
    name: "realms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
      alephNull: new Decimal(0),
    }},
    color: "#b06000",
  tooltip:"",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("c",32)},
  challenges:{
    
    11: {
        name: "Baseless Realm",
        challengeDescription(){
          return "The base is "+this.base()},
	  goalDescription(){return "Reach "+(options.gwaOrdinal?"<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>":"ω")+"<sup>"+(options.gwaOrdinal?"<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>":"ω")+"</sup>"},
      base(){return Decimal.pow(2,challengeCompletions(this.layer,this.id)+1).round()},
	  req(){
      return new Decimal(this.base()).pow(this.base())
    },
        canComplete(){return player.points.gte(this.req())},
      onComplete(){layers.d.blowUpEverything();},
	  rewardDescription(){return "Gain an amount of ℵ<sub>0</sub> per second equal to the highest base realm you have completed"},
      completionLimit: Infinity
    },
  },
  update(diff){
    if (player.r.challenges[11]>0){
      player.r.alephNull=player.r.alephNull.add(Decimal.pow(2,player.r.challenges[11]).mul(diff))
    }
    
    if (inChallenge("r",11)){player.points=player.points.min(getBase().pow(getBase()).round())}
  },
  alephNullEffect(){
    let eff = player.r.alephNull.add(1).log10().add(1).cbrt()
    return eff
  },
    tabFormat: [
      ["display-text",function(){return "If you are in a <font color='b06000'>realm</font> you will have access to a different set of features"},{"font-size":"24px"}],"blank",
      "challenges","blank",
      ["display-text",function(){return "Your "+format(player.r.alephNull)+" ℵ<sub>0</sub> is dividing light mode buyable cost exponents by "+format(layers.r.alephNullEffect(),4)}]
    ]
})
addLayer("d", {
    name: "gwarkdown", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
      veblen: [new Decimal(0)],
    }},
    color: "#ff6969",
    requires(){return getBase().sqr()}, // Can be a function that takes requirement increases into account
    resource: "gwarkdown points", // Name of prestige currency
    baseResource: "ordinal", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for gwarkdown points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return inChallenge("r",11)},
  getNextAt(){return this.requires()},
  prestigeButtonText(){return "Markdown for <b>+"+formatWhole(this.getResetGain())+"</b> gwarkdown points"},
  getResetGain(){
      let gain = new Decimal(numToOP(player.points, getBase()))
      return gain
  },
  canReset(){return player.points.gte(this.requires())},
  clickables: {
    11:{
      canClick(){return true},
      onClick(){
        player.points=player.points.add(1)
      },
      display(){return "Increase the ordinal by 1, then maximize it"}
    },
    12:{
      canClick(){return layers.d.buyables[11].canAfford()},
      onClick(){
        
        let n=player.d.points.div(100).max(1).log2().floor().sub(10).max(player.d.buyables[11])
        player.d.buyables[11]=n; 
        for (let i=0;i<10;i++){
        if (layers.d.buyables[11].canAfford())layers.d.buyables[11].buy()}
      },
      display(){return "Max autoclickers"},
    },
  },
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(2,x).mul(100)
        },
        display() { return "Automatically increase the ordinal once per second.<br>Currently: "+formatWhole(getBuyableAmount(this.layer,this.id))+"/s<br>Cost: "+format(this.cost())+" gwarkdown points" },
      title: "Autoclicker",
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(100,x.add(1).mul(x.add(2).div(2)))
        },
        display() {
          if (getBuyableAmount(this.layer,this.id).eq(0)){
            return "Do a veblen shift.<br>Cost: "+format(this.cost())+" veblen index 1"
          } else {
            return "Increase index 2 of your veblen by 1. <br>Currently: +"+formatWhole(getBuyableAmount(this.layer,this.id))+"<br>Cost: "+format(this.cost())+" veblen index 1 ("+numToOrdinal(this.cost(),layers.d.veblenBase())+")"
          }
        
        },
      title: "Infinite Recursion",
        canAfford() { return player[this.layer].veblen[0].gte(this.cost()) },
        buy() {
            player[this.layer].veblen[0] = new Decimal(0)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player[this.layer].veblen[1] = getBuyableAmount(this.layer, this.id)
          if (getBuyableAmount(this.layer,this.id).gte(2)){
            player.c.anticharge = player.c.anticharge.add(getBuyableAmount(this.layer,this.id).eq(2)?2:1)
          }
        },
    },
},
  upgrades: {
    11:{
      title: "Factor 1",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(10)
      },
      effect(){
        let e = player.d.points.max(10).log10().log2().add(2)
        return e
      }
    },
    12:{
      title: "Factor 2",
      description(){return "Boost your autoclickers based on baseless realm completions. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(100)
      },
      effect(){
        let e = new Decimal(challengeCompletions("r",11)).add(2).pow(2)
        return e
      }
    },
    13:{
      title: "Factor 3",
      description(){return "Boost your autoclickers based on autoclickers bought. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(1000)
      },
      effect(){
        let e = getBuyableAmount("d",11).sqrt()
        return e
      }
    },
    14:{
      title: "Factor 4",
      description(){return "Boost your autoclickers based on ordinal. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(10000)
      },
      effect(){
        let e = player.points.max(2).log2()
        return e
      }
    },
    15:{
      title: "Factor 5",
      description(){return "Boost your autoclickers based on cardinals. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(100000)
      },
      effect(){
        let e = player.c.points.max(10).log10().sqrt()
        return e
      }
    },
    21:{
      title: "Factor V",
      description(){return "Boost your autoclickers based on veblen. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(1e6)
      },
      effect(){
        let e = player.d.veblen[0].sqrt().add(1)
        if (player.d.veblen.length > 1){
          e = e.mul(Decimal.pow(100,player.d.veblen[1]))
        }
        return e
      }
    },
    22:{
      title: "Factor e",
      description(){return "Multiply veblen gain by e."},
      cost(){
        return new Decimal(1e7)
      },
    },
    23:{
      title: "Factor b",
      description(){return "Speed up veblen and autoclickers by 1.02x per factor boost"},
      cost(){
        return new Decimal(1e10)
      },
      effect(){
        return Decimal.pow(1.02, player.b.boosts)
      }
    },
    24:{
      title: "Factor l",
      description(){return "Light mode's base is 9"},
      cost(){
        return new Decimal(1e13)
      }
    },
    25:{
      title: "Factor n",
      description(){return "Unlock gwa layer in main realm and the upgrades here affect main realm autoclickers ^10"},
      cost(){
        return new Decimal(1e16)
      }
    },
  },
  doReset(l){
    
  },
  blowUpEverything(){
      let k = []
      layerDataReset(this.layer, k)
  },
  veblenGain(){
    let gain = player.c.points.max(1).log10()
    gain=gain.mul(getBuyableAmount(this.layer,11)).div(100)
    if (hasUpgrade("d",22))gain=gain.mul(Math.E)
    if (hasUpgrade("d",23))gain=gain.mul(upgradeEffect("d",23))
    return gain
  },
  veblenBase(){
    let b = new Decimal(100)
    return b
  },
  update(diff){
    player.d.veblen[0] = player.d.veblen[0].add(this.veblenGain().mul(diff))
  },
  tabFormat: {
    "gwarkup": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "clickables",
        "blank",
        ["row",[["buyable",11]]],
        "blank",
        "milestones"
      ]
    },
    "factors": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "blank",
        "upgrades",
      ]
    },
    "Veblen": {
      unlocked(){return player.r.challenges[11]>=2},
      content: [
        ["display-text",function(){
          let s = "Your current veblen ordinal is φ("
          let t = ")"
          for (let i in player[this.layer].veblen){
            if (i == player[this.layer].veblen.length-1) {
              player[this.layer].veblen[i] = new Decimal(player[this.layer].veblen[i])
              t = numToOrdinal(player[this.layer].veblen[i],layers.d.veblenBase())+t
            } else {
              t = ", "+numToOrdinal(player[this.layer].veblen[i],layers.d.veblenBase())+t
            }
          }
          return s+t+" ("+layers.d.veblenBase()+")."
        },{"font-size":"24px"}],
        ["display-text",function(){
          let s = "Index 1 is the rightmost index, index 2 is the one left of that, and so on"
          return s
        }],
        "blank",
        ["display-text",function(){
          let s = "You have "+format(player.c.points)+" unspent cardinals, increasing your veblen ordinal by "+format(layers.d.veblenGain())+"/s (based on autoclickers)"
          return s
        }],"blank","blank",
        ["row",[["buyable",12]]],"blank","blank",
        ["display-text",function(){
          let r = ""
          if (getBuyableAmount(this.layer,12).gte(1)){
            r += "Your veblen ordinal is also speeding up passive cardinal gain by "+format(player.d.veblen[0].max(10).log10().pow(0.2))+"x<br>"
          }
          if (getBuyableAmount(this.layer,12).gte(2)){
            r += "Your veblen ordinal is also giving you "+format(player.d.veblen[1])+" free anti charge.<br>"
          }
          if (getBuyableAmount(this.layer,12).gte(3)){
            r += "Your veblen ordinal is also giving you "+format(player.d.veblen[1])+" easter eggs. You're also past endgame.<br>"
          }
          return r
        }]
      ]
    }
  }
})

