const achievements = [
    {
        req: [
            _=> data.ord.ordinal >= 10,
            _=> data.ord.ordinal >= data.ord.base**2,
            _=> calculateHardy() >= 1.78e308,
            _=> data.ord.ordinal >= data.ord.base**data.ord.base,
        ],
        name: [
            "The First Ordinal",
            "Many More Ordinals",
            "Infinity...?",
            "The Tower of Infinities",
        ],
        popup: [
            "Reach ω",
            "Reach ω^2",
            "Reach a value of 1.79e308",
            "Reach ω^ω",
        ]
    },
    {
        req: [
            _=> data.factors[0] > 0,
            _=> data.factors[1] > 0,
            _=> data.factors[2] > 0,
            _=> data.factors[3] > 0,
            _=> data.factors[4] > 0,
            _=> data.factors[5] > 0,
            _=> data.factors[6] > 0,
        ],
        name: [
            "Speed",
            "Breaking the Speed Limit",
            "The Speed of Sound",
            "The Speed of Light",
            "Physics is a Myth",
            "Infinite Speed",
            "The Speed of Gator",
        ],
        popup: [
            "Purchase Factor 1",
            "Purchase Factor 2",
            "Purchase Factor 3",
            "Purchase Factor 4",
            "Purchase Factor 5",
            "Purchase Factor 6",
            "Purchase Factor 7",
        ]
    },
    {
        req: [
            _=> data.ord.base > 3,
            _=> data.ord.base > 5,
            _=> data.ord.base > 7,
            _=> data.ord.base > 9,
        ],
        name: [
            "Higher is Better",
            "How High Can You Go?",
            "Ascending into the Heavens",
            "Ultimate",
        ],
        popup: [
            "Reach Base 4",
            "Reach Base 6",
            "Reach Base 8",
            "Reach Base 10",
        ]
    },
    {
        req: [
            _=> data.dy.level >= 10,
            _=> data.dy.level >= 40,
        ],
        name: [
            "Overdrive",
            "Maximum Overdrive",
        ],
        popup: [
            "Reach a Dynamic Factor of 10",
            "Reach a Dynamic Factor of 40",
        ]
    },
]
function initAchs(){
    const achTab = DOM('achPage')
    let total = 0
    for (let i = 0; i < achievements.length; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox'
        row.id = `achRow${i}`
        row.cssText = 'flex-direction: row'
        achTab.append(row)
        for (let j = 0; j < achievements[i].name.length; j++) {
            let ach = document.createElement('button')
            ach.className = 'achievement'
            ach.id = `achievement${total}`
            ach.textContent =  `${achievements[i].name[j]}`
            ach.addEventListener('mouseover', ()=>DOM('achText').innerText = achievements[i].popup[j])
            row.append(ach)
            ++total
        }
    }
}
function checkAchs(){
    let total = 0
    for (let i=0; i < achievements.length; i++){
        for (let j = 0; j < achievements[i].req.length; j++) {
            let ach = DOM(`achievement${total}`)
            if(achievements[i].req[j]() && !data.achs.includes(total))data.achs.push(total)
            ach.style.backgroundColor = data.achs.includes(total)?'#0f6f00':'#151515'
            ach.style.color = data.achs.includes(total)?'#c8c500':'#9d5700'
            ++total
        }
    }
}
