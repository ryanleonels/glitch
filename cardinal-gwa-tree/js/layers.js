addLayer("g", {
    name: "gwarkup", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
      base: new Decimal(2),
      dynamic: new Decimal(1),
      decrementy: new Decimal(1),
      challengeUnlock: false,
      incrementyUnlock: false,
    }},
    color: "#009696",
    requires(){return getBase().sqr()}, // Can be a function that takes requirement increases into account
    resource: "gwarkup points", // Name of prestige currency
    baseResource: "ordinal increases", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for gwarkup points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  getNextAt(){return this.requires()},
  prestigeButtonText(){return "Markup for <b>+"+formatWhole(this.getResetGain())+"</b> gwarkup points"},
  getResetGain(){
      let gain = new Decimal(numToOP(player.points, getBase()))
      if (hasUpgrade("b",22) && !inChallenge("b",31))gain=Decimal.mul(gain,1e10)
    gain=gain.mul(Decimal.pow(2,getTotalCompletions()*player.b.challenges[42]))
    if (inChallenge("b",41))gain=gain.sqrt()
    gain=gain.mul(alephEffect(2))
      return gain
  },
  canReset(){return player.points.gte(this.requires())},
  onPrestige(){if (hasUpgrade("c",33))player.g.decrementy=new Decimal(1)},
  clickables: {
    11:{
      canClick(){return true},
      onClick(){
        if (!inChallenge("b",41) || player.points.lt(inChallenge("c",11)?101:26))
        player.points=player.points.add(1)
               },
      display(){return "Increase the ordinal by 1, then maximize it"}
    },
    12:{
      canClick(){return layers.g.buyables[12].canAfford()},
      onClick(){
        if (inChallenge("b",32)){
          if (layers.g.buyables[12].canAfford()){player.g.buyables[12]=new Decimal(1)};return
        }
        if (hasUpgrade("h",103)){
          let x = player.g.points.div(100).max(1).log(1.001).floor().add(1).max(player.g.buyables[12])
          setBuyableAmount("g", 12, x)
        } else {
        let n=player.g.points.div(100).max(1).log2().floor().sub(10).max(player.g.buyables[12])
        player.g.buyables[12]=n;
        for (let i=0;i<10;i++){
        if (layers.g.buyables[12].canAfford())layers.g.buyables[12].buy()}
        }
      },
      display(){return "Max autobuyers"},
      unlocked(){return player.g.base.gte(3)}
    },
  },
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          let costs = [new Decimal("1ee10"), new Decimal("1ee10"), new Decimal("1e210"), new Decimal("1e1600"), new Decimal("e1.36e26"), new Decimal("e5.59e27"), new Decimal("e1.24e35"), new Decimal("e1.24e35"), new Decimal("10^^100")]
          return costs[Math.min(Number(x), costs.length - 1)]
        },
        display() { return "Increase the ordinal base by 1.<br>Cost: "+format(this.cost())+" gwarkup points" },
      title: "Base Shift",
        canAfford() { return player[this.layer].points.gte(this.cost()) && !player.b.activeChallenge },
        buy() {
            player[this.layer].points = new Decimal(0)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.g.base=getBuyableAmount(this.layer, this.id).add(2)
          player.g.dynamic=new Decimal(1)
          if (!hasMilestone("g",1))player.g.upgrades=[]
          player.g.buyables[12]=new Decimal(hasMilestone("g",0)?1:0)
          if (!hasMilestone("g",1))layers.b.clickables[11].onClick()
          player.points=new Decimal(0)
          player.b.incrementy=new Decimal(0)
          player.b.psi=new Decimal(0)
        },
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          if (x.gte(1)&&inChallenge("b",32))return new Decimal("10^^1e308")
          if (hasUpgrade("h",103))return Decimal.pow(1.001,x).mul(100)
          return Decimal.pow(2,x).mul(100)
        },
        display() { return "Automatically increase the ordinal once per second.<br>Currently: "+formatWhole(getBuyableAmount(this.layer,this.id))+"/s<br>Cost: "+format(this.cost())+" gwarkup points" },
      title: "Autoclicker",
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.base.gte(3)}
    },
},
  upgrades: {
    11:{
      title: "Factor 1",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e21)
        if (player.g.base.eq(4))return new Decimal(1000)
        return new Decimal(10).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return player.g.base.gte(3)},
      effect(){
        let e = player.g.points.max(10).log10().log(2).add(2)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(2)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))

        if (hasUpgrade("b",71))e=e.mul(upgradeEffect("b",71))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    12:{
      title: "Factor 2",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e100)
        if (player.g.base.eq(4))return new Decimal(1e10)
        if (player.g.base.eq(5))return new Decimal(1e20)
        return new Decimal(100).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,11) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.max(10).log10().log(2).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(3)
        if (hasUpgrade("h",101))e=e.mul(2)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        if (hasUpgrade("b",72))e=e.mul(upgradeEffect("b",72))
        if (player.g.base.gte(7))e=e.mul(layers.h.fastEffect())
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    13:{
      title: "Factor 3",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e111)
        if (player.g.base.eq(4))return new Decimal(2e21)
        if (player.g.base.eq(5))return new Decimal(1e23)
        return new Decimal(1000).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,12) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.pow(2/3).max(10).log10().log(2).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(4)
        if (hasUpgrade("h",101))e=e.mul(6)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        e=e.pow(1+player.b.challenges[12])
        if (hasUpgrade("b",52))e=e.mul(upgradeEffect("b",52))
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    14:{
      title: "Factor 4",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e120)
        if (player.g.base.lt(6))return new Decimal(1e30)
        return new Decimal(1e4).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,13) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.pow(3/4).max(10).log10().log(3).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(5)
        if (hasUpgrade("h",101))e=e.mul(24)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    15:{
      title: "Factor 5",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e122)
        if (player.g.base.eq(4))return new Decimal(1e100)
        if (player.g.base.eq(5))return new Decimal(1e33)
        return new Decimal(1e5).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,14) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.pow(3/5).max(10).log10().log(3).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(6)
        if (hasUpgrade("h",101))e=e.mul(120)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        if (hasUpgrade("h",32))e=e.mul(player.h.slow.max(1))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    16:{
      title: "Factor 6",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e201)
        if (player.g.base.eq(4))return new Decimal(1e110)
        if (player.g.base.eq(5))return new Decimal(1e40)
        return new Decimal(1e6).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,15) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.max(10).log10().log(6).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(7)
        if (hasUpgrade("h",101))e=e.mul(720)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        if (hasUpgrade("h",31))e=e.mul(player.h.fast.max(1))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    17:{
      title: "Factor 7",
      description(){return "Boost your autoclickers based on autoclickers bought. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e210)
        if (player.g.base.eq(4))return new Decimal(1e120)
        if (player.g.base.eq(5))return new Decimal(1e42)
        return new Decimal(1e7).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,16) || player.g.base.gte(4)},
      effect(){
        let e = player.g.buyables[12].sqrt().add(1)
        if (hasUpgrade("b",11))e=e.mul(8)
        if (hasUpgrade("h",101))e=e.mul(5040)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        e=e.pow(Decimal.pow(2,player.b.challenges[32]))
        if (hasUpgrade("c",12))e=e.pow(7)
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    21:{
      title: "Dynamic Factor",
      description(){return "The gwa grows in power over time. Currently: "+(inChallenge("b",21)?"/":"*")+format(this.effect())+"<br>Cap: "+format(layers.g.dynamicCap())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e220)
        if (player.g.base.eq(4))return new Decimal(1e111)
        return new Decimal(1)
      },
      unlocked(){return hasUpgrade(this.layer,17) || player.g.base.gte(4)},
      effect(){return player.g.dynamic.div(inChallenge("b",42)?888:1)}
    },
    22:{
      title: "gwadrupler",
      description(){return "Quadruple autobuyer speed."},
      cost(){
        return new Decimal(0)
      },
      unlocked(){return hasUpgrade("b",12)}
    },
    23:{
      title: "Factor gwa",
      description(){return "Autobuyer speed is multiplied by 96"},
      cost(){
        if (player.g.base.eq(4))return new Decimal(1e130)
        if (player.g.base.eq(5))return new Decimal(1e50)
        return new Decimal(1e8).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return player.g.base.gte(5) || (player.g.base.gte(4)&&hasUpgrade("g",17))}
    },
    24:{
      title: "The Difficulty",
      description(){return "Unlock challenges"},
      cost(){
        if (player.g.base.eq(5) && !player.g.challengeUnlock)return new Decimal(1e110)
        return new Decimal(0)
      },
      unlocked(){return (player.g.base.gte(6) || (player.g.base.gte(5)&&hasUpgrade("g",23))) && !player.g.challengeUnlock},
      onPurchase(){
        player.g.challengeUnlock = true;
      }
    },
    25:{
      title: "Large Numbers",
      description(){return "Unlock incrementy, and factor boosts now require psi ordinal instead of GP"},
      cost(){
        if (player.g.incrementyUnlock)return new Decimal(0)
        return new Decimal("6.66e666")
      },
      unlocked(){return player.g.base.gte(6) && !player.g.incrementyUnlock},
      onPurchase(){
        player.g.incrementyUnlock = true;
      }
    },
  },
  passiveGeneration(){
    return hasMilestone(this.layer,1)?1:0
  },
  milestones:{
    0: {
      requirementDescription: "Base 7",
        effectDescription: "Unlock Hierarchies, and start with 1 autoclicker",
        done() { return player.g.base.gte(7) },
      unlocked(){return player.g.base.gte(7) || hasMilestone(this.layer,this.id)}
    },
    1: {
      requirementDescription: "40 factor boosts",
        effectDescription: "Unlock overflow, gain 100% of GP gain on reset per second, and base shifts no longer reset any upgrades",
        done() { return player.b.boosts.gte(40) },
      unlocked(){return player.b.boosts.gte(40) || hasMilestone(this.layer,this.id)}
    },
    2: {
      requirementDescription: "60 factor boosts",
        effectDescription: "Unlock charge (subtab of Hierarchies)",
        done() { return player.b.boosts.gte(60) },
      unlocked(){return player.b.boosts.gte(40) || hasMilestone(this.layer,this.id)}
    },
    3: {
      requirementDescription: "1e100 FGH",
        effectDescription: "SGH effect is better",
        done() { return player.h.fast.gte(1e100) },
      unlocked(){return player.b.boosts.gte(60) || hasMilestone(this.layer,this.id)}
    },
    4: {
      requirementDescription: "75 factor boosts",
        effectDescription: "Unlock 3 more charge upgrades",
        done() { return player.b.boosts.gte(75) },
      unlocked(){return hasMilestone(this.layer, this.id-1)}
    },
    5: {
      requirementDescription: "1 googol incrementy",
        effectDescription: "Autobuy hierarchy buyables, unlock a new booster power effect, divide charge cost by e14, and multiply autobuyer speed by e100",
        done() { return player.b.incrementy.gte(1e100) },
      unlocked(){return hasMilestone(this.layer, this.id-1) && player.g.base.gte(8) }
    },
  },
  dynamicCap(){

      let cap = new Decimal(10)
      if (hasUpgrade("b",21) || inChallenge("b",21)){
        cap=cap.mul(10)
      }
    cap=cap.mul(Decimal.pow(10,player.b.challenges[21]))
      if (hasUpgrade("b",53))cap=cap.mul(upgradeEffect("b",53))
      if (player.g.base.gte(7))cap=cap.mul(buyableEffect("h",32))
      cap=cap.mul(alephEffect(3))
      if (hasUpgrade("h",122)){;cap=cap.mul(player.g.base)}
    if (hasUpgrade("h",111)){
        cap=cap.sqr()
      }
    return cap
  },
  update(diff){
    if (hasUpgrade("g",21)){
      let gain = new Decimal(0.01)
      if (hasUpgrade("b",21) || inChallenge("b",21)){
        gain=gain.mul(10)
      }
      gain=gain.mul(Decimal.pow(10,player.b.challenges[21]))
      if (player.g.incrementyUnlock)gain=gain.mul(buyableEffect("b",13))
      if (hasUpgrade("h",121))gain=gain.mul(getTotalCompletions())
      if (hasUpgrade("h",122)){gain=gain.mul(player.g.base)}
      gain=gain.mul(alephEffect(3))

  gain=gain.mul(buyableEffect("c",12))
      let cap = layers.g.dynamicCap()
      if (hasUpgrade("h",111)){
        player.g.dynamic = player.g.dynamic.sqrt().add(gain.mul(diff)).sqr().min(cap)
      }
      else player.g.dynamic = player.g.dynamic.add(gain.mul(diff)).min(cap)
    }
    if (inChallenge("b",41)){
      player.g.decrementy=player.g.decrementy.mul(Decimal.pow(player.g.points.max(2).log(2),diff/hasUpgrade("c",33)?1:60))
    } else {player.g.decrementy=new Decimal(1)}
    if (player.g.points.gte(layers.g.buyables[11].cost()) || (player.b.activeChallenge&&player.g.points.gte(layers.b.challenges[player.b.activeChallenge].req())))return
    if (hasUpgrade("b",13)){
      for (let i in layers.g.upgrades){
        buyUpg("g",i)
      }
    }
    if (hasUpgrade("b",12)){
      if (layers.g.clickables[12].canClick())layers.g.clickables[12].onClick()
    }
    if (hasMilestone("g",5)){
      for (let i of [11,12,21,22,31,32]){
          if (layers.h.buyables[i].canAfford()){layers.h.buyables[i].buy()}

      }
    }
  },
  doReset(l){
    if (l=="c"){

      layerDataReset(this.layer, ["milestones", "buyables", "base", "challengeUnlock", "incrementyUnlock"])
      setBuyableAmount(this.layer, 12, new Decimal(1))
      if (!hasMilestone("c",1))player.g.milestones=player.g.milestones.filter(x=>x<5)
    }
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
        "buyables",
        "blank",
        "milestones"
      ]
    },
    "factors": {
      unlocked(){return player.g.base.gte(3)},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "blank",
        "upgrades",
      ]
    }
  }
})
addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      boosts: new Decimal(0),
      incrementy: new Decimal(0),
      psi: new Decimal(0)
    }},
    color: "#3333FF",
    requires(){
      if (player.b.boosts.gte(160)) return Decimal.pow(BHO, player.b.boosts.div(10).sub(10))
      if (player.b.boosts.gte(80)) return Decimal.pow(BHO, player.b.boosts.div(20).sub(2))
      if (player.b.boosts.gte(40)) return Decimal.pow(3, player.b.boosts).mul(12)
      if (player.g.incrementyUnlock)return Decimal.pow(3, player.b.boosts).round().mul(12).round().min(BHO)
      return new Decimal(1e20).pow(Decimal.pow(2.5, player.b.boosts.min(2)).mul(Decimal.pow(2,player.b.boosts.sub(2).max(0))))}, // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource(){return (player.g.incrementyUnlock ? "psi ordinal":"gwarkup points")}, // Name of resource prestige is based on
    baseAmount() {return (player.g.incrementyUnlock ?player.b.psi : player.g.points)}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Perform a factor boost", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.g.base.gte(4)},
  getNextAt(){return this.requires()},
  prestigeButtonText(){return "Perform a "+(player.b.boosts.gte(160)?"(very scaled) ":player.b.boosts.gte(80)?"(scaled) ":"")+"factor boost for <b>+"+formatWhole(this.getResetGain())+"</b> boosters.<br>Requires: "+(/*player.b.boosts.gte(40)?"Infinity":*/player.g.incrementyUnlock?numToPsi(this.requires())+" psi ordinal":format(this.requires())+" gwarkup points")},
  getResetGain(){
      return player.b.boosts.add(1)
  },
  canReset(){return (player.g.incrementyUnlock?player.b.psi:player.g.points).gte(this.requires()) && (player.g.incrementyUnlock||((player.g.points.lt("e9.99e9") || player.g.base.gte(10)) && !player.b.activeChallenge))},
  onPrestige(){
    if (!hasMilestone("c",1))boost()
    player.b.boosts=player.b.boosts.add(1)
    if (player.g.incrementyUnlock) {player.b.psi=new Decimal(0)}
  },
  getBoosters(){
    let b = T(player.b.boosts)
    if (hasMilestone("c",3))b=b.add(190)
    return b
  },
  clickables: {
    11:{
      canClick(){return true},
      onClick(){player.b.points=layers.b.getBoosters();player.b.upgrades=player.b.upgrades.filter(i=>i>50);boost();player.points=new Decimal(0)},
      display(){return "Respec upgrades"}
    },
  },
  upgrades: {
    11:{
      description(){if (hasUpgrade("h",101))return "Multiply factor effects by (factor number+1)!"
        return "Multiply factor effects by factor number+1"},
      cost(){
        return new Decimal(1)
      },
    },
    12:{
      description(){if (hasUpgrade("h",102))return "Automatically max all autobuyers and quadrupler effect ^44"
        return "Automatically max all autobuyers and unlock the quadrupler."},
      cost(){
        return new Decimal(1)
      },
    },
    13:{
      description(){if (hasUpgrade("h",103))return "Automatically buy factors and autobuyer scaling is 1.001x"
        return "Automatically buy factors."},
      cost(){
        return new Decimal(1)
      },
    },
    21:{
      description(){if (hasUpgrade("h",111))return "Square dynamic effect, and dynamic factor increases 10x faster and caps 10x later, but Incrementy upgrade 6 ^0.6."
        return "Dynamic factor increases 10x faster and caps 10x later."},
      cost(){
        return new Decimal(5)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)}
    },
    22:{
      description(){if (hasUpgrade("h",112))return "gwarkup point gain base is 25"
        return "Multiply gwarkup point gain by 1e10."},
      cost(){
        return new Decimal(3)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)}
    },
    23:{
      description(){if (hasUpgrade("h",113))return "Booster power gain is multiplied by charge"
        return "Total boosters multiply autoclicker speed"},
      cost(){
        return new Decimal(4)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)}
    },
    31:{
      description(){if (hasUpgrade("h",121))return "Challenge completions multiply incrementy and dynamic gain"
        return "C5-8 completions multiply incrementy gain"},
      cost(){
        return new Decimal(16)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(6)}
    },
    32:{
      description(){if (hasUpgrade("h",122))return "All factors are multiplied by the ordinal base (before reductions)"
        return "Factors 1-7 are multiplied by the ordinal base-4"},
      cost(){
        return new Decimal(18)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(6)}
    },
    33:{
      description(){if (hasUpgrade("h",123))return "The ordinal base is lowered by 3"
        return "The ordinal base is lowered by 2"},
      cost(){
        return new Decimal(42)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(6)}
    },
    41:{
      description(){if (hasUpgrade("h",131))return "The ordinal base greatly boosts incrementy"
        return "The ordinal base boosts incrementy"},
      cost(){
        return new Decimal(234)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(7)}
    },
    42:{
      description(){if (hasUpgrade("h",132))return "Hierarchies grow much faster based on factor boosts"
        return "Hierarchies grow faster based on factor boosts"},
      cost(){
        return new Decimal(203)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return hasUpgrade(this.layer,41)}
    },
    43:{
      description(){if (hasUpgrade("h",133))return "Gain 1e100x more FGH and SGH"
        return "Gain 1e10x more FGH and SGH"},
      cost(){
        return new Decimal(102)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return hasUpgrade(this.layer,42)}
    },
    51:{
      title: "AutoBooster",
      description(){return "Incrementy multiplies autoclicker speed. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(1e7)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(10,player.b.incrementy.add(1).log10().sqrt()).add(1).pow(layers.h.bpowerEffect3()).pow(hasUpgrade("c",102)?7:1)}
    },
    52:{
      title: "Factor 8?",
      description(){return "Incrementy boosts factor 3 after exponents. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(2e9)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return player.b.incrementy.pow(hasUpgrade("h",22)?0.5:0.25).add(1).pow(hasUpgrade("c",102)?7:1)}
    },
    53:{
      title: "Dynamic Raising",
      description(){return "Per factor boost multiply dynamic cap by "+(hasUpgrade("c",31)?2.25:1.5)+". Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(3e8)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(1.5,player.b.boosts).pow(hasUpgrade("c",31)?2:1)}
    },
    61:{
      title: "Psi upgrade",
      description(){return "Factor 2 boosts psi ordinal gain at a reduced rate. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(4e10)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return upgradeEffect("g",12).pow(0.1)}
    },
    62:{
      title: "The Least Creative Upgrade Name Ever",
      description(){return "Challenge completions boost psi ordinal gain. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(6e11)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(1.1,getTotalCompletions()).pow(hasUpgrade("c",103)?4:hasUpgrade("c",13)?2:1)}
    },
    63:{
      title: "incrementy gain booster #498797411654654",
      description(){return "Dynamic factor multiplies incrementy gain. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(5e7)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return upgradeEffect("g",21).pow(hasUpgrade("h",111)?0.2:hasUpgrade("h",21)?1/3:0.25).max(1)}
    },
    71:{
      title: "boosted boosters boosts boost boosts",
      description(){return "Total boosters multiplies Factor 1 before exponents. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(7e16)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return layers.b.getBoosters()}
    },
    72:{
      title: "ALL 11 ALBANIAS",
      description(){return "Multiply factor 2 by 11. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(8e17)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return 11}
    },
    73:{
      title: "those 12 bees:",
      description(){return "Multiply autobuyer speed by 12. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(9e17)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return 12}
    },
  },
  buyables:{

    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(x.add(1),x.add(1)).mul(1000).pow(layers.h.bpowerEffect2())
        },
        display() { return "Double incrementy gain.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Incrementy Doubler",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("c",2))player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id).add(hasUpgrade("h",31)?player.h.fast.div(1e0).max(1).log10().div(5).floor().add(1):0))},
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id).add(1)) {
          return Decimal.pow(10,x.add(4))
        },
        display() { return "Double psi ordinal gain.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Psi Doubler",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("c",2))player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(new Decimal(hasUpgrade("h",11)?2.1:2).add(layers.h.bpowerEffect()), getBuyableAmount(this.layer,this.id).add((hasUpgrade("h",12)?2:0)))},
    },
    13: {
        cost(x=getBuyableAmount(this.layer,this.id).add(1)) {
          return Decimal.pow(4,x.pow(1.5)).mul(1e6)
        },
        display() { return "Double dynamic gain.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Dynamic Doubler",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("c",2))player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id).add(hasUpgrade("h",32)?player.h.slow.div(1e25).max(1).log10().div(5).floor().add(1):0).add(buyableEffect("h",31)))},
    },
    14: {
        cost(x=getBuyableAmount(this.layer,this.id).add(1)) {
          return Decimal.pow(100,x).mul(1e64).div(hasMilestone("g",5)?1e14:1)
        },
        display() { return "Gain 1 charge.<br>Currently: "+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Charge",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.h.charge=player.h.charge.add(1)
        },
      unlocked(){return hasMilestone("g",2)},
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
  },
  challenges: {
    11: {
        name: "C1",
        challengeDescription(){return "The ordinal base is "+(10-player.b.challenges[22])+"."},
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e16)
      if (player.b.challenges[this.id]==1)return new Decimal(1e17)
      return new Decimal(1e80)
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "gwarkup point gain base "+(player.b.challenges[this.id]==3?"is 20":player.b.challenges[this.id]==2?"15 -> 20":player.b.challenges[this.id]==1?"11 -> 15":"10 -> 11")}
    },
    12: {
        name: "C2",
        challengeDescription: "Factors 1-6 don't increase based on GP.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e25)
      if (player.b.challenges[this.id]==1)return new Decimal(1e250)
      return new Decimal("1e500")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "Factors 1-6 "+(player.b.challenges[this.id]==3?"^4":player.b.challenges[this.id]==2?"^3 -> ^4":player.b.challenges[this.id]==1?"^2 -> ^3":"^2")}
    },
    21: {
        name: "C3",
        challengeDescription: "Dynamic factor divides instead of multiplies. The 5 booster upgrade is always active.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e300)
      if (player.b.challenges[this.id]==1)return new Decimal("e1000")
      return new Decimal("e1e4")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "Dynamic gain and cap "+(player.b.challenges[this.id]==3?"x1000":player.b.challenges[this.id]==2?"x100 -> x1000":player.b.challenges[this.id]==1?"x10 -> x100":"x10")}
    },
    22: {
        name: "C4",
        challengeDescription: "The base is 4 and the only factors that work are 1-4.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e100)
      if (player.b.challenges[this.id]==1)return new Decimal("1e1000")
      return new Decimal("ee10")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "C1's base is "+(player.b.challenges[this.id]==3?"7 and gain 10x incrementy":player.b.challenges[this.id]==2?"8 -> 7 and gain 10x incrementy":player.b.challenges[this.id]==1?"9 -> 8":"9")}
    },
    31: {
        name: "C5",
        challengeDescription: "Factor costs ^10 and the 3 booster upgrade is disabled. The base in this challenge is the base outside of the challenge.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal("e1111")
      if (player.b.challenges[this.id]==1)return new Decimal("ee4")
      if (player.g.base.gte(7))return new Decimal("1e20940")
      return new Decimal("ee100")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "The ordinal value boosts autoclickers"}
    },
    32: {
        name: "C6",
        challengeDescription: "You can only buy 1 autoclicker and its speed is square rooted.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e100)
      if (player.b.challenges[this.id]==1)return new Decimal("1e308")
      return new Decimal("1e616")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "Factor 7 "+(player.b.challenges[this.id]==3?"^8":player.b.challenges[this.id]==2?"^4 -> ^8":player.b.challenges[this.id]==1?"^2 -> ^4":"^2")}
    },
    41: {
        name: "C7",
        challengeDescription: "There is exponentially rising decrementy that slows down your autobuyers. You can only manually increment up to an ordinal of gwa^2+1. GP is square rooted and you are stuck in C6",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e308)
      if (player.b.challenges[this.id]==1)return new Decimal("1e500")
      return new Decimal("e557")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      countsAs: [32],
      completionLimit: 3,
    rewardDescription(){return "Incrementy gain "+(player.b.challenges[this.id]==3?"x8":player.b.challenges[this.id]==2?"x4 -> x8":player.b.challenges[this.id]==1?"x2 -> x4":"x2")}
    },
    42: {
        name: "C8",
        challengeDescription: "The base is 8 and divide EVERY factor by 888, including the gwadrupler.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e88)
      if (player.b.challenges[this.id]==1)return new Decimal(1e250)
      return new Decimal("1e1200")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
    rewardDescription(){return "Multiply GP and autoclicker speed by 2^(total challenge completions) per completion"}
    },

},
  update(diff){
    if (hasUpgrade("g",25) || player.g.incrementyUnlock){
      player.b.incrementy=player.b.incrementy.add(getIncrementyGain().mul(diff))
      player.b.psi=player.b.psi.add(getPsiGain().mul(diff))//.min(48630661836227120000)
    }
    if (hasMilestone("c",2)){
      for (let i of [11,12,13]){
        if (layers.b.buyables[i].canAfford())layers.b.buyables[i].buy()
      }
    }
  },
  doReset(l){
    if (l=="c"){
      let k=[]
      if (hasMilestone("c",3))k.push("upgrades")
      if (hasMilestone("c",2))k.push("challenges")
      layerDataReset(this.layer,k)
      if (hasMilestone("c",3)&&!hasMilestone("c",4))player.b.upgrades=player.b.upgrades.filter(x=>x>50)
      if (hasMilestone("c",3))player.b.points=new Decimal(190)
    }
  },
  tabFormat: {
    "Boosters": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "clickables",
        "blank",
        ["row",[["upgrade",11],["upgrade",12],["upgrade",13]]],
        ["row",[["upgrade",21],["upgrade",22],["upgrade",23]]],
        ["row",[["upgrade",31],["upgrade",32],["upgrade",33]]],
        ["row",[["upgrade",41],["upgrade",42],["upgrade",43]]]
      ]
    },
    "Challenges": {
      unlocked(){return hasUpgrade("g",24) || player.g.challengeUnlock},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        ["display-text",function(){
          return "The ordinal base in challenges is 5 unless otherwise specified. Entering a challenge will perform a booster reset. You cannot gain boosters or base shift inside a challenge.<br>Each challenge can be completed up to 3 times, at which point a star will appear. Trying to enter a challenge a 4th time will kick you out of the challenge."
        }],"blank",
        "challenges"
      ]
    },
    "Incrementy": {
      unlocked(){return hasUpgrade("g",25) || player.g.incrementyUnlock},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        ["display-text",function(){
          return "You have "+format(player.b.incrementy)+" incrementy. (+"+format(getIncrementyGain())+"/s)"
        }],
        ["display-text",function(){
          return "Your psi ordinal is "+numToPsi(player.b.psi.floor())+" (3). (+"+format(getPsiGain())+"/s)"
        }],
        "blank",
        "buyables",
        ["row",[["upgrade",51],["upgrade",52],["upgrade",53]]],
        ["row",[["upgrade",61],["upgrade",62],["upgrade",63]]],
        ["row",[["upgrade",71],["upgrade",72],["upgrade",73]]],
      ]
    },
  }
})
addLayer("h", {
    name: "Hierarchies", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
      slow: new Decimal(0),
      fast: new Decimal(0),
      boosterPower: new Decimal(0),
      charge: new Decimal(0),
      overcharge: new Decimal(0),
    }},
    color: "#a52a2a",
    requires(){
      return new Decimal(5)}, // Can be a function that takes requirement increases into account
    resource: "Hierarchy", // Name of prestige currency
    baseResource(){return "base shifts"}, // Name of resource prestige is based on
    baseAmount() {return getBuyableAmount("g",11)}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.g.base.gte(7)},
  tooltip: "Hierarchies",
  clickables: {
    11:{
      canClick(){return true},
      onClick(){player.h.charge=getBuyableAmount("b",14);player.h.upgrades=player.h.upgrades.filter(i=>i<100);boost()},
      display(){return "Respec Charged upgrades"}
    },
  },
  upgrades: {
    11:{
      description(){return "Psi Doubler's base is 2.1"},
      cost(){
        return new Decimal(1e10)
      },
      currencyDisplayName: "FGH",
      currencyInternalName: "fast",
      currencyLocation(){return player.h},
    },
    12:{
      description(){return "Gain 2 free Psi Doublers"},
      cost(){
        return new Decimal(1e10)
      },
      currencyDisplayName: "SGH",
      currencyInternalName: "slow",
      currencyLocation(){return player.h},
    },
    21:{
      description(){return "<b>incrementy gain booster #498797411654654</b> is improved"},
      cost(){
        return new Decimal(1e20)
      },
      currencyDisplayName: "FGH",
      currencyInternalName: "fast",
      currencyLocation(){return player.h},
    },
    22:{
      description(){return "<b>Factor 8?</b> is improved"},
      cost(){
        return new Decimal(1e17)
      },
      currencyDisplayName: "SGH",
      currencyInternalName: "slow",
      currencyLocation(){return player.h},
    },
    31:{
      description(){return "Gain free incrementy doublers based on FGH and FGH multiplies factor 6"},
      cost(){
        return new Decimal(1e45)
      },
      currencyDisplayName: "FGH",
      currencyInternalName: "fast",
      currencyLocation(){return player.h},
    },
    32:{
      description(){return "Gain free dynamic doublers based on SGH and SGH multiplies factor 5"},
      cost(){
        return new Decimal(1e30)
      },
      currencyDisplayName: "SGH",
      currencyInternalName: "slow",
      currencyLocation(){return player.h},
    },
    101:{
      description(){return "Supercharge Booster Upgrade 1"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    102:{
      description(){return "Supercharge Booster Upgrade 2"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    103:{
      description(){return "Supercharge Booster Upgrade 3"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    111:{
      description(){return "Supercharge Booster Upgrade 4"},
      cost(){
        return new Decimal(3)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    112:{
      description(){return "Supercharge Booster Upgrade 5"},
      cost(){
        return new Decimal(3)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    113:{
      description(){return "Supercharge Booster Upgrade 6"},
      cost(){
        return new Decimal(3)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    121:{
      description(){return "Supercharge Booster Upgrade 7"},
      cost(){
        return new Decimal(7)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("g",4)}
    },
    122:{
      description(){return "Supercharge Booster Upgrade 8"},
      cost(){
        return new Decimal(7)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("g",4)}
    },
    123:{
      description(){return "Supercharge Booster Upgrade 9"},
      cost(){
        return new Decimal(7)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("g",4)}
    },
    131:{
      description(){return "Supercharge Booster Upgrade 10"},
      cost(){
        return new Decimal(15)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasUpgrade("c",32)}
    },
    132:{
      description(){return "Supercharge Booster Upgrade 11"},
      cost(){
        return new Decimal(15)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasUpgrade("c",32)}
    },
    133:{
      description(){return "Supercharge Booster Upgrade 12"},
      cost(){
        return new Decimal(15)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasUpgrade("c",32)}
    },
  },
  buyables:{
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(10,x).mul(10)
        },
        display() { return "Boost FGH and SGH gain based on challenge completions.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(10))+" FGH ordinal" },
        canAfford() { return player[this.layer].fast.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].fast = player[this.layer].fast.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(new Decimal(getTotalCompletions()+1).sqrt(), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(10,x).mul(10)
        },
        display() { return "Boost FGH and SGH gain based on factor boosts.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(10))+" SGH ordinal" },
        canAfford() { return player[this.layer].slow.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].slow = player[this.layer].slow.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(player.b.boosts.add(1).sqrt(), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    21: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(10,x).mul(1e6)
        },
        display() { return "Boost FGH effect based on SGH ordinal.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(10))+" FGH ordinal" },
        canAfford() { return player[this.layer].fast.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].fast = player[this.layer].fast.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(player.h.slow.add(1).log10().sqrt().add(1), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    22: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(10,x).mul(1e6)
        },
        display() { return "Boost SGH effect based on FGH ordinal.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(10))+" SGH ordinal" },
        canAfford() { return player[this.layer].slow.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].slow = player[this.layer].slow.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(player.h.fast.add(1).log10().sqrt().add(1), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    31: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(100,x).mul(1e25)
        },
        display() { return "Gain a free dynamic doubler.<br>Currently: +"+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" incrementy" },
        canAfford() { return player.b.incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player.b.incrementy = player.b.incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
    32: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return Decimal.pow(100,x).mul(1e25)
        },
        display() { return "Double dynamic cap.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
        canAfford() { return player.b.incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player.b.incrementy = player.b.incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id))},
    },
  },
  slowGain(){
    let g = player.b.psi.div(1e8)
    g=g.mul(buyableEffect("h",11))
    g=g.mul(buyableEffect("h",12))
    if (hasUpgrade("b",42))g=g.mul(Decimal.pow(3, player.b.boosts.sub(30).max(0)).pow(hasUpgrade("h",132)?2:1))
    if (hasUpgrade("b",43))g=g.mul(hasUpgrade("h",133)?1e100:1e10)
    g=g.mul(alephEffect(6))
    return g.floor()
  },
  fastGain(){
    let g = player.b.incrementy.div(1e17)
    g=g.mul(buyableEffect("h",11))
    g=g.mul(buyableEffect("h",12))
    if (hasUpgrade("b",42))g=g.mul(Decimal.pow(5, player.b.boosts.sub(30).max(0)).pow(hasUpgrade("h",132)?2:1))
    if (hasUpgrade("b",43))g=g.mul(hasUpgrade("h",133)?1e100:1e10)
    g=g.mul(alephEffect(7))

    if (hasUpgrade("c",14))g=g.pow(player.g.points.add(10).log10().log10().pow(hasUpgrade("c",104)?0.2:0.1))
    return g.floor()
  },
  slowEffect(){
    let eff = player.h.slow.add(1).log10().add(1)
    eff=eff.mul(buyableEffect("h",22))
    if (hasMilestone("g",3))eff=eff.pow(1.25)
    return eff.pow(buyableEffect("c",13).add(1))
  },
  fastEffect(){
    let eff = player.h.fast.add(1).log10().add(1)
    eff=eff.mul(buyableEffect("h",21))
    return eff.pow(buyableEffect("c",13).add(1))
  },
  update(diff){
    if (hasMilestone("g",0)){
      player.h.fast=player.h.fast.add(layers.h.fastGain().mul(diff))
      player.h.slow=player.h.slow.add(layers.h.slowGain().mul(diff))
    }
    if (hasMilestone("g",1)){
      player.h.boosterPower=player.h.boosterPower.add(layers.h.bpowerGain().mul(diff))
    }
    if (hasUpgrade("c",14)){
      player.h.overcharge=player.h.overcharge.add(layers.h.overchargeGain().mul(diff))
    }
  },
  bpowerGain(){
    let g = (layers.b.getBoosters().sub(820)).div(100)
    if (hasUpgrade("h",113)) g=g.mul(getBuyableAmount("b",14).sqr())
    g=g.mul(alephEffect(8))
    return g.max(0)
  },
  bpowerEffect(){
    let e = player.h.boosterPower.add(100).div(100).log10().div(10)
    if (hasUpgrade("c",14))e=e.mul(layers.h.overchargeEffect())
    if (hasUpgrade("c",112)){
      if (e.gt(0.46))e=e.mul(0.46).sqrt()
    }
    else if (hasUpgrade("c",22)){
      if (e.gt(0.4))e=e.mul(0.4).sqrt()
    }
    else {if (e.gt(0.36)){e=e.sqrt().mul(0.6)}}

    return e
  },
  bpowerEffect2(){
    let e = player.h.boosterPower.div(10).add(1).log10().add(1).pow(-0.1)
    if (hasUpgrade("c",14))e=e.div(layers.h.overchargeEffect())
    return e
  },
  bpowerEffect3(){
    if (!hasMilestone("g",5))return new Decimal(1)
    let e = player.h.boosterPower.add(1).log10().add(1)
    if (hasUpgrade("c",14))e=e.pow(layers.h.overchargeEffect())
    return e
  },
  overchargeGain(){
    if (!hasUpgrade("c",14))return new Decimal(0)
    let gain = getBuyableAmount("b",14).sub(33).max(0)
    return gain
  },
  overchargeEffect(){
    return player.h.overcharge.add(1).log10().add(1).cbrt().add(9).div(10)
  },
  doReset(l){
    if (l=="c"){
      let k=[]
      if (hasMilestone("c",4))k.push("upgrades")
      layerDataReset(this.layer,k)
      player.h.upgrades=player.h.upgrades.filter(x=>x<100)
    }
  },
  tabFormat: {
    "Hierarchies": {
      unlocked(){return hasMilestone("g",0) || player.g.base.gte(7)},
      content: [

        ["display-text",function(){
          return "Your FGH ordinal is "+numToOrdinal(player.h.fast, new Decimal(10))+" (10), multiplying Factor 2 (pre-exponent) by "+format(layers.h.fastEffect())
        }],
        ["display-text",function(){
          return "Your SGH ordinal is "+numToOrdinal(player.h.slow, new Decimal(10))+" (10), multiplying incrementy gain by "+format(layers.h.slowEffect())
        }],
        ["display-text", function(){
          return "Both Hierarchies are Maximized instantly. Their Successor gains are based on Incrementy Amount and Psi Ordinal respectively."
        }],
        "blank",
        ["row",[["upgrade",11],["buyable",11],["buyable",12],["upgrade",12]]],
        ["row",[["upgrade",21],["buyable",21],["buyable",22],["upgrade",22]]],
        ["row",[["upgrade",31],["buyable",31],["buyable",32],["upgrade",32]]],
      ]
    },
    "Overflow":{
      unlocked(){return hasMilestone("g",1)},
      content: [
        ["display-text",function(){
          return "You have "+formatWhole(layers.b.getBoosters().sub(820))+" excess boosters, producing "+format(layers.h.bpowerGain())+" booster power/s"
        }],
        "blank",
        ["display-text",function(){
          return "You have "+format(player.h.boosterPower)+" booster power,<br>adding  "+format(layers.h.bpowerEffect(), 4)+" to <b>Psi Doubler</b>'s base,<br>raising <b>Incrementy Doubler</b>'s cost to the ^"+format(layers.h.bpowerEffect2(), 5)+(hasMilestone("g",5)?",<br>raising <b>AutoBooster</b> to the ^"+format(layers.h.bpowerEffect3(), 4):"")
        }],
        "blank",
        ["display-text",function(){
          if (!hasUpgrade("c",14))return
          return "You have "+formatWhole(getBuyableAmount("b",14).sub(33))+" excess charge, producing "+format(layers.h.overchargeGain())+" overcharge/s"
        }],
        "blank",
        ["display-text",function(){
          if (!hasUpgrade("c",14))return
          return "You have "+format(player.h.overcharge)+" overcharge,<br>strengthening all booster power effects by "+format(layers.h.overchargeEffect(), 4)+"x"+(hasUpgrade("c",32)?",<br>raising <b>Incrementy</b>'s gain to the ^"+format(layers.h.overchargeEffect().sqrt(), 4):"")
        }],
      ]
    },
    "Charge":{
      unlocked(){return hasMilestone("g",2)},
      content: [
        ["display-text",function(){
          return "You have "+formatWhole(player.h.charge)+" charge remaining.<br>You have a total of "+formatWhole(getBuyableAmount("b",14))+" charges."
        }],
        "blank",
        "clickables",
        "blank",
        ["row",[["upgrade",101],["upgrade",102],["upgrade",103]]],
        ["row",[["upgrade",111],["upgrade",112],["upgrade",113]]],
        ["row",[["upgrade",121],["upgrade",122],["upgrade",123]]],
        ["row",[["upgrade",131],["upgrade",132],["upgrade",133]]],
      ]
    }
  }
})
addLayer("c", {
    name: "Collapse", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      alephs: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      anticharge: new Decimal(0)
    }},
    color: "#00cc44",
    requires(){
      return Decimal.pow(BHO, 2.5)}, // Can be a function that takes requirement increases into account
    resource: "cardinals", // Name of prestige currency
    baseResource(){return "psi ordinal"}, // Name of resource prestige is based on
    baseAmount() {return player.b.psi}, // Get the current amount of baseResource
  //tooltip(){return "Reach "+numToPsi(this.requires())+" psi ordinal to collapse!"},
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Collapse", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  passiveGeneration(){
    return (hasUpgrade("c",114)?0.1:hasUpgrade("c",24)?0.001:0)
  },
    layerShown(){return player.g.base.gte(9)},
  getNextAt(){return this.requires()},
  prestigeButtonText(){return "Collapse for <b>+"+formatWhole(this.getResetGain())+"</b> cardinals.<br>Requires: "+numToPsi(this.requires())+" psi ordinal"},
  getResetGain(){
    if (!player.c.unlocked)return new Decimal(3)
      let g= Decimal.pow(3,player.b.boosts.sub(90).div(10)).add(1e-14).mul(3).floor()
      if (hasUpgrade("c",23))g=g.mul(upgradeEffect("c",23))
      g = g.max(3).round()
      if (hasMilestone("gwa",0)) {
        g=g.mul(buyableEffect("gwa",11)) // gwas boost cardinal gain = (# of variations owned + 1)
        g=g.mul(Math.sqrt(player.gwa.points.add(1))).round() // unused gwa points boost cardinal gain = sqrt(gwa points + 1)
      }
      return g
  },
  canReset(){return player.b.psi.gte(this.requires())},
  branches: ["b"],
  onPrestige(){
    if (!hasMilestone("c",1) && player.b.boosts.lte(70)){player.c.milestones.push(1)}
    if (!hasMilestone("c",2) && player.b.boosts.lte(55)){player.c.milestones.push(2)}
    if (!hasMilestone("c",3) && player.b.boosts.lte(41)){player.c.milestones.push(3)}
    if (!hasMilestone("c",4) && player.b.boosts.lte(25)){player.c.milestones.push(4)}
    if (!hasMilestone("c",5) && player.b.boosts.lte(0)){player.c.milestones.push(5)}
  },

  clickables: {
    11:{
      canClick(){return player.c.points.gte(1)},
      onClick(){
        if (player.c.points.lt(1000)){
          for(let i=0;i<1000;i++){
          if (player.c.points.lte(0))return
          player.c.points=player.c.points.sub(1)
          let x=Math.floor(Math.random()*8)
          player.c.alephs[x]=player.c.alephs[x].add(1)}
        } else {
          for (let i=0;i<8;i++){player.c.alephs[i]=player.c.alephs[i].add(player.c.points.div(8).floor()); }
          player.c.points=player.c.points.sub(player.c.points.div(8).floor().mul(8))
        }
      },
      display(){return "Distribute Cardinals"}
    },
    12:{
      canClick(){return true},
      onClick(){player.c.anticharge=getBuyableAmount("c",21);player.c.upgrades=player.c.upgrades.filter(i=>i<100);doReset("c",true)},
      display(){return "Respec Anti-charge and force a collapse reset"},
      unlocked(){return getBuyableAmount("c",21).gte(1)}
    },
  },
  milestones:{
    0: {
      requirementDescription: "Collapse once",
        effectDescription: "Keep all features unlocked and the first 5 gwarkup milestones",
        done() { return player.c.unlocked },
      unlocked(){return true}
    },
    1: {
      requirementDescription: "SM70",
        effectDescription: "Keep milestone 6, and factor boosts don't reset gwarkup",
        done() { return false},
      unlocked(){return hasMilestone("c",0)}
    },
    2: {
      requirementDescription: "SM55",
        effectDescription: "Keep challenge completions and autobuy the first 3 incrementy buyables",
        done() { return false},
      unlocked(){return hasMilestone("c",1)}
    },
    3: {
      requirementDescription: "SM41",
        effectDescription: "Start with all incrementy upgrades and 190 boosters",
        done() { return false},
      unlocked(){return hasMilestone("c",2)}
    },
    4: {
      requirementDescription: "SM25",
        effectDescription: "Keep booster and hierarchy upgrades",
        done() { return false},
      unlocked(){return hasMilestone("c",3)}
    },
    5: {
      requirementDescription: "SM0",
        effectDescription: "Fill up your house with gwas",
        done() { return false},
      unlocked(){return hasMilestone("c",4)}
    },
  },

  upgrades: {
    11:{
      title: "CUP1",
      description(){if (hasUpgrade("c",101))return "Total Boosters boosts Psi ordinal gain"
        return "Total Charge boosts Psi ordinal gain"},
      cost(){
        return new Decimal(10)
      },
    },
    12:{
      title: "CUP2",
      description(){if (hasUpgrade("c",102))return "Hepteract factor 7's effect and the first 2 incrementy upgrades"
        return "Hepteract factor 7's effect"},
      cost(){
        return new Decimal(20)
      },
    },
    13:{
      title: "CUP3",
      description(){if (hasUpgrade("c",103))return "Square <b>The Least Creative Upgrade Name Ever</b>, twice"
        return "Square <b>The Least Creative Upgrade Name Ever</b>"},
      cost(){
        return new Decimal(50)
      },
    },
    14:{
      title: "CUP4",
      description(){if (hasUpgrade("c",104))return "Unlock Overcharge and GP raises FGH gain to a bigger power. Currently: "+format(player.g.points.add(10).log10().log10().pow(0.2))
        return "Unlock Overcharge and GP raises FGH gain to a power. Currently: "+format(player.g.points.add(10).log10().log10().pow(0.1))},
      cost(){
        return new Decimal(100)
      },
    },
    21:{
      title: "CUP5",
      description(){if (hasUpgrade("c",111))return "Incrementy gain ^1.03"
        return "Incrementy Gain ^1.01"},
      cost(){
        return new Decimal(10)
      },
    },
    22:{
      title: "CUP6",
      description(){if (hasUpgrade("c",112))return "Booster power's 3rd effect softcap starts +0.1 later"
        return "Booster power's 3rd effect softcap starts +0.04 later"},
      cost(){
        return new Decimal(20)
      },
    },
    23:{
      title: "CUP7",
      description(){if (hasUpgrade("c",113))return "Unspent cardinals boost cardinal gain even more."
        return "Unspent cardinals boost cardinal gain. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(50)
      },
      effect(){
        return player.c.points.add(1).log10().add(1).pow(hasUpgrade("c",113)?1.5:1)
      },
    },
    24:{
      title: "CUP8",
      description(){if (hasUpgrade("c",114))return "Gain 10% of cardinals on reset per second"
        return "Gain 0.1% of cardinals on reset per second"},
      cost(){
        return new Decimal(100)
      },
    },
    31:{
      title: "The Lightening",
      description(){
        return "Unlock Light Mode, and square <b>Dynamic Raising</b>"},
      cost(){
        return new Decimal(2000)
      },
    },
    32:{
      title: "Supercharger",
      description(){
        return "Unlock 3 new charge upgrades and a new Overcharge effect"},
      cost(){
        return new Decimal(100000)
      },
      unlocked(){return hasUpgrade("c",31)},
    },
    33:{
      title: "Light Booster",
      description(){
        return "Greatly boost incrementy and decrementy gain in Light Mode, but reset decrementy on gwarkup markup"},
      cost(){
        return new Decimal(4000000)
      },
      unlocked(){return hasUpgrade("c",32)},
    },
    34:{
      title: "gwa",
      description(){
        return "Awaken the gwa"},
      cost(){
        return new Decimal(19909696)
      },
      unlocked(){return hasUpgrade("c",33) && hasMilestone("c",5) && player.g.base.gte(10)},
    },
    101:{
      description(){return "Anti-charge cardinal upgrade 1"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    102:{
      description(){return "Anti-charge cardinal upgrade 2"},
      cost(){
        return new Decimal(2)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    103:{
      description(){return "Anti-charge cardinal upgrade 3"},
      cost(){
        return new Decimal(5)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    104:{
      description(){return "Anti-charge cardinal upgrade 4"},
      cost(){
        return new Decimal(10)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    111:{
      description(){return "Anti-charge cardinal upgrade 5"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    112:{
      description(){return "Anti-charge cardinal upgrade 6"},
      cost(){
        return new Decimal(2)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    113:{
      description(){return "Anti-charge cardinal upgrade 7"},
      cost(){
        return new Decimal(5)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    114:{
      description(){return "Anti-charge cardinal upgrade 8"},
      cost(){
        return new Decimal(10)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
  },
  buyables:{
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return new Decimal(1000).pow(Decimal.pow(3,x))
        },
        display() { return "Multiply psi ordinal gain by 1.5<br>Currently: "+format(this.effect())+"x<br>Cost: "+format(this.cost())+" Decrementy" },
      title: "Psi Doublen't",
        canAfford() { return inChallenge("c",11)&&player.g.decrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
      effect(){return Decimal.pow(1.5, getBuyableAmount(this.layer,this.id))},
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return new Decimal(1e10).pow(Decimal.pow(2,x))
        },
        display() { return "Double Dynamic Gain<br>Currently: "+format(this.effect())+"x<br>Cost: "+format(this.cost())+" Decrementy" },
      title: "Why is there another one of these?",
        canAfford() { return inChallenge("c",11)&&player.g.decrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id))},
    },
    13: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return new Decimal(1e25).pow(Decimal.pow(5,x))
        },
        display() { return "Hierarchy effect exponents +0.2<br>Currently: +"+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" Decrementy" },
      title: "This is probably going to cause inflation",
        canAfford() { return inChallenge("c",11)&&player.g.decrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
      effect(){return Decimal.mul(0.2, getBuyableAmount(this.layer,this.id))},
    },

    21: {
        cost(x=getBuyableAmount(this.layer,this.id)) {
          return new Decimal(1e10).pow(x)
        },
        display() { return "Gain 1 anti-charge. Anticharge can be used to charge cardinal upgrades.<br>Currently: +"+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" Incrementy" },
      title: "Anticharge",
        canAfford() { return inChallenge("c",11)&&player.b.incrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.c.anticharge=player.c.anticharge.add(1)
        },
      unlocked(){return true},
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
  },
  challenges:{

    11: {
        name: "Light Mode",
        challengeDescription: "All Booster challenges at once and the base is 10. Square root incrementy and psi ordinal gain, and the first 2 alephs are weaker.",
    goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
    req(){
      return new Decimal("10^^1e308")
    },
        canComplete(){return false},
      onEnter(){
        while (options.theme!="light"){
          switchTheme()
        }
      },
      onExit(){
        switchTheme()
      },
    rewardDescription(){return "There are 4 buyables you can buy inside this challenge"},
    },
  },
  update(diff){

  },

  tabFormat: {
    "Alephs": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        ["display-text",function(){return "Base Cardinal gain: 3*3^((FB-90)/10)"}],"blank",
        "clickables",
        "blank",
        ["display-text",function(){
          let s=``
          s+="ℵ<sub>1</sub>: "+formatWhole(player.c.alephs[0])+", multiplying autoclicker speed by "+format(alephEffect(1))+"<br>"
          s+="ℵ<sub>2</sub>: "+formatWhole(player.c.alephs[1])+", multiplying GP gain by "+format(alephEffect(2))+"<br>"
          s+="ℵ<sub>3</sub>: "+formatWhole(player.c.alephs[2])+", multiplying dynamic gain and cap by "+format(alephEffect(3))+"<br>"
          s+="ℵ<sub>4</sub>: "+formatWhole(player.c.alephs[3])+", multiplying incrementy gain by "+format(alephEffect(4))+"<br>"
          s+="ℵ<sub>5</sub>: "+formatWhole(player.c.alephs[4])+", multiplying psi ordinal gain by "+format(alephEffect(5))+"<br>"
          s+="ℵ<sub>6</sub>: "+formatWhole(player.c.alephs[5])+", multiplying SGH gain by "+format(alephEffect(6))+"<br>"
          s+="ℵ<sub>7</sub>: "+formatWhole(player.c.alephs[6])+", multiplying FGH gain by "+format(alephEffect(7))+"<br>"
          s+="ℵ<sub>8</sub>: "+formatWhole(player.c.alephs[7])+", multiplying booster power gain by "+format(alephEffect(8))+"<br>"
          return s
        }],
      ]
    },
    "Sluggish Milestones": {
      unlocked(){return true},
      content: [
        "milestones"
      ]
    },
    "Upgrades": {
      unlocked(){return true},
      content: [
        ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14]]],
        ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24]]],
        ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34]]],
      ]
    },
    "Light": {
      unlocked(){return hasUpgrade("c",31)},
      content: [
        "challenges",
        "blank","buyables"
      ]
    },
    "Anti-charge": {
      unlocked(){return getBuyableAmount("c",21).gte(1)},
      content: [
        ["row",[["upgrade",101],["upgrade",102],["upgrade",103],["upgrade",104]]],
        ["row",[["upgrade",111],["upgrade",112],["upgrade",113],["upgrade",114]]],
        ["row",[["upgrade",121]]],
      ]
    }
  }
})
addLayer("gwa", {
    name: "gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            unlockedGwas: [],
        }
    },
    image: "https://cdn.discordapp.com/emojis/844745243592884264.png?v=1",
    color: "#ffffff",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "gwa", // Name of prestige currency
    baseResource: "cardinals", // Name of resource prestige is based on
    baseAmount() {
        return player.c.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "Collapse anytime (will consume the <b>gwa</b> collapse layer upgrade) for ",
    branches: [],
    canReset() {
        return hasUpgrade("c", 34);
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return player.g.base.gte(10);
    },
    isActive(){ return player.g.base.gte(10); },
    getResetGain(){
      return 1;
    },
    onPrestige(){
      doReset("c");
      const gwa = player.c.upgrades.indexOf(34);
      player.c.upgrades.splice(gwa, 1);
    },
    milestones: {
        0: {
            requirementDescription: "1 gwa",
            effectDescription: "You have Gwa. In your house.",
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
          return (new Decimal(x).gte(Object.keys(layers.gwa.upgrades).length-2)) ? new Decimal("10^^1e308") : new Decimal(1);
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
            player.gwa.points = player.gwa.points.sub(1);
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
            effectDisplay() { return "<img src='https://flamemasternxf.github.io/gwa/images/gwacoin.gif'>" },
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
const BHO = 48630661836227120000
function T(x){
  return Decimal.mul(x,x.add(1).div(2))
}
function alephEffect(x){
    if (x==1)return inChallenge("c",11)?player.c.alephs[0].add(1).mul(5).pow(player.c.alephs[0].min(1e3)).max(10).log10():player.c.alephs[0].add(1).mul(5).pow(player.c.alephs[0].min(1e3))
    if (x==2)return inChallenge("c",11)?player.c.alephs[1].add(1).pow(player.c.alephs[1].add(1).pow(1.5)).max(10).log10():player.c.alephs[1].add(1).pow(player.c.alephs[1].add(1).pow(1.5))
    if (x==3)return player.c.alephs[2].add(1).pow(1.5)
    if (x==4)return player.c.alephs[3].add(1).log10().add(1).pow(4).max(2)
    if (x==5)return player.c.alephs[4].add(1).log10().add(1).sqr()
    if (x==6)return player.c.alephs[5].mul(2).add(1).sqr()
    if (x==7)return player.c.alephs[6].mul(2).add(1).sqr()
    if (x==8)return player.c.alephs[7].add(1).log2().add(1)
  }
function numToPsi(num){
  let gwa = options.gwaOrdinal
  if (num.gte(BHO) && options.bhoExponent){return (gwa?"<img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'>^":"BHO^")+format(num.log(BHO),3)}
  if (num.gt(BHO)){return (gwa?"<img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'>x":"BHOx")+format(num.div(BHO))}
  return displayPsiOrd(num.toNumber(), player.maxLength)
}
function getIncrementyGain(){
  let gain=new Decimal(1)
  gain=gain.mul(player.b.psi.max(1))
  gain=gain.mul(buyableEffect("b",11))
  if(hasUpgrade("h",121)){gain=gain.mul(getTotalCompletions())}
  else if (hasUpgrade("b",31)){
    let c=0
  for(let i in layers.b.challenges){
    if (i>14)
    c+=player.b.challenges[i]
  }
    gain=gain.mul(Math.max(c,1))
  }

  if (hasUpgrade("b",63))gain=gain.mul(upgradeEffect("b",63))
  gain=gain.mul(Decimal.pow(2,player.b.challenges[41]))
  if (player.g.base.gte(7))gain=gain.mul(layers.h.slowEffect())
  if (hasUpgrade("b",41))gain=gain.mul(player.g.base.sub(5).pow(4).pow(hasUpgrade("h",131)?2:1))
  if (player.b.challenges[22]>=3)gain=gain.mul(10)
  if(player.c.unlocked)gain=gain.mul(alephEffect(4))
  if (hasUpgrade("c",21))gain=gain.pow(hasUpgrade("c",111)?1.03:1.01)
  if (inChallenge("c",11))gain=gain.pow(hasUpgrade("c",33)?1.5:0.5)
  if (hasUpgrade("c",32))gain=gain.pow(layers.h.overchargeEffect().sqrt())
  return gain
}
function getPsiGain(){
  let gain = new Decimal(1)
  if (hasUpgrade("b",61))gain=gain.mul(upgradeEffect("b",61))
  if (hasUpgrade("b",62))gain=gain.mul(upgradeEffect("b",62))
  gain=gain.mul(buyableEffect("b",12))
  gain=gain.mul(alephEffect(5))
  if (hasUpgrade("c",11)) gain=gain.mul(hasUpgrade("c",101)?layers.b.getBoosters():getBuyableAmount("b",14).max(1))
  gain=gain.mul(buyableEffect("c",11))
  if (inChallenge("c",11))gain=gain.sqrt()
  return gain
}
function numToOP(num, base, iter=0){
  if (base.lte(iter))return 0
  num = num.floor().max(0)
  if (num.eq(0)&&iter==0)return 0
  let n = new Decimal(0)
  if (num.lt(base.sqr())&&iter==0){
    return new Decimal(0)
  } else if (num.lt(base)){
    return num
  } else {
    let exponent = num.log(base).floor()
    let s = numToOP(exponent, base, 1)
    let coef = num.div(base.pow(exponent).round()).floor()
    let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
    n=n.add(Decimal.pow(hasUpgrade("h",112)?25:[10,11,15,20][player.b.challenges[11]], s).mul(coef))
    if (rem.lt(base)){n=n.add(rem)} else {
    n=n.add(numToOP(rem, base, iter+1))}
    return n
  }
}
function getTotalCompletions(){
  let c=0
  for(let i in layers.b.challenges){
    if (i>0)
    c+=player.b.challenges[i]
  }
  return c
}
function boost(){
  player.g.upgrades=[]
    player.g.points=new Decimal(0)
    setBuyableAmount("g", 12, new Decimal(hasMilestone("g",0)?1:0))
    player.g.dynamic=new Decimal(1)
  player.points=new Decimal(0)
}

function displayPsiOrd(ord, trim) {
  if (ord>=BHO)return "BHO"
    ord = Math.floor(ord)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    const magnitude = Math.floor(Math.log(Math.floor(ord/4))/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(Math.floor(ord-magnitudeAmount), trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(Math.floor(ord-magnitudeAmount)+1, trim-1))
    if (options.gwaOrdinal)finalOutput=finalOutput.replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
  .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput}`.replaceAll("undefined",options.gwaOrdinal?"<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>":"ω")
}
const ordMarks = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>2</sup>x)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sup>Ω<sup>y</sup></sup>)",
    "BHO",
    //"&psi;(ε<sub>Ω+x</sub>)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]
