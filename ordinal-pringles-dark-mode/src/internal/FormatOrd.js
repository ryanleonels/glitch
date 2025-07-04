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
    "&psi;(Ω<sub>2</sub>x)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]

function makeExcessOrdMarks(){
    const length = ordMarks.length-1

    // Generates OrdMarks up to BHO*3^41
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x))")

    // Generates OrdMarks up to BHO*3^82
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^123
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>x)")

    // Generates OrdMarks up to BHO*3^164
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x))")

    // Generates OrdMarks up to BHO*3^205
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^246
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>x))")

    // Generates OrdMarks up to BHO*3^287
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^328
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x))))")

    // Generates OrdMarks up to BHO*3^369
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>x)))")

    // Generates OrdMarks up to BHO*3^410
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x))))")

    // Generates OrdMarks up to BHO*3^451
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))))")

    // Generates OrdMarks up to BHO*3^493
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>y</sup>)")
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>x)")

    // Generates OrdMarks up to BHO*3^534
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x))")

    // Generates OrdMarks up to BHO*3^575
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^616
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>))")
}

const ordMarks2 = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sub>y</sub>)",
    "&psi;(Ix)",
    "&psi;(IΩx)",
    "&psi;(IΩ<sup>y</sup>)",
    "&psi;(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))",
    "&psi;(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))",
    "&psi;(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))",
    "&psi;(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))",
    "&psi;(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(IΩ<sub>y</sub>)",
    "&psi;(I&psi;<sub>I</sub>(Ix))",
    "&psi;(I&psi;<sub>I</sub>(IΩx))",
    "&psi;(I&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
    "&psi;(I<sup>y</sup>)",
    "&psi;(I<sup>Ω</sup>x)",
    "&psi;(I<sup>Ω</sup>Ωx)",
    "&psi;(I<sup>Ω</sup>Ω<sup>y</sup>)",
    "&psi;(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>Ω<sub>y</sub>)",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>x)",
    "&psi;(I<sup>Ω+1</sup>Ωx)",
    "&psi;(I<sup>Ω+1</sup>Ω<sup>y</sup>)",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>Ω<sub>y</sub>)",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(Ix))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>x))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ωx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>))))",
    "&psi;(I<sup>Ω+y</sup>)",
    "&psi;(I<sup>Ωy</sup>)",
    "&psi;(I<sup>Ω<sup>y</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>Ω<sub>y</sub></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>I</sub>(IΩ<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>y</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>x</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ωx</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sup>y</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sub>y</sub></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>x)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ωx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω+y</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ωy</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω<sup>y</sup></sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(Ix)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩx)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>Ω<sub>y</sub></sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(Ix)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(IΩx)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix))</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx))</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I<sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)</sup></sup>)",
    "&psi;(Ω<sub>I+1</sub>x)",
]
const extraOrdMarks2 = ["","ω"]

const ordMarks21 = [
    "&psi;(&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))",
    "&psi;(&psi;<sub>Ω<sub>2</sub></sub>(Ix))",
    "&psi;(&psi;<sub>Ω<sub>2</sub></sub>(IΩx))",
    "&psi;(&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>))",
    "&psi;(&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
]

const ordMarks2I = [
    "&psi;(&psi;<sub>I</sub>(Ix))",
    "&psi;(&psi;<sub>I</sub>(IΩx))",
    "&psi;(&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ix)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩx)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(IΩ<sup>y</sup>)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>Ω<sub>2</sub></sub>(I&psi;<sub>Ω<sub>2</sub></sub>(Ω<sub>y</sub>))))",
    "&psi;(&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
]

function makeExcessOrdMarks2(){
    const length = ordMarks2.length-1

    // Generates OrdMarks up to (Ω_(I+1)).ψ(I+1)((Ω_(I+1))
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[0].slice(6))
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[1].slice(6))
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks21[i].slice(6))
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[2].slice(6))
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6))
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[i].slice(6))
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>x))")

    // Generates OrdMarks up to (Ω_(I+1))^Ω
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[0].slice(6)+")")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[1].slice(6)+")")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks21[i].slice(6)+")")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[2].slice(6)+")")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6)+")")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[i].slice(6)+")")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>y</sup>)")
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>x)")

    // Generates OrdMarks up to ((Ω_(I+1))^Ω).ψ(I+1)((Ω_(I+1))
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[0].slice(6))
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[1].slice(6))
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks21[i].slice(6))
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[2].slice(6))
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2I[i].slice(6))
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[i].slice(6))
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>x))")

    // Generates OrdMarks up to ((Ω_(I+1))^Ω).ψ(I+1)((Ω_(I+1))^Ω)
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[0].slice(6)+")")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[1].slice(6)+")")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks21[i].slice(6)+")")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[2].slice(6)+")")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6)+")")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[i].slice(6)+")")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>y</sup>))")
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>x))")

    // Generates OrdMarks up to ((Ω_(I+1))^Ω).ψ(I+1)(((Ω_(I+1))^Ω).ψ(I+1)(Ω_(I+1)))
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[0].slice(6)+")")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[1].slice(6)+")")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks21[i].slice(6)+")")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[2].slice(6)+")")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2I[i].slice(6)+")")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[i].slice(6)+")")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>x)))")

    // Generates OrdMarks up to (Ω_(I+1))^(Ω+1)
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[0].slice(6)+"))")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[1].slice(6)+"))")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks21[i].slice(6)+"))")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[2].slice(6)+"))")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6)+"))")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub>"+ordMarks2[i].slice(6)+"))")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>Ω<sub>I+1</sub></sub>(Ω<sub>I+1</sub><sup>y</sup>)))")
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω+1</sup>)")

    // end of ordMarks2 as data.ord.ordinal already exceeds Number.MAX_VALUE by this point
    //for (let i = 0; i < ordMarks2.length; i++) DOM(`versionText`).innerHTML += `<br>${ordMarks2[i]}`
}

function displayOrd(ord,over,base,trim = data.ord.trim) {
    if(!base) return D(ord).toString()
    if(data.ord.isPsi) return displayPsiOrd(ord, trim)
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfiniteOrd(ord, over, base, trim)
    ord = Number(ord)

    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base)+1e-14)
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&omega;"
    if (magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function displayInfiniteOrd(ord, over, base, trim = data.ord.trim){
    if (ord === Infinity || D(ord).eq(Infinity) || base === 1) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    ord = Decimal.floor(ord)
    over = Decimal.floor(over)
    if(trim <= 0) return `...`
    if(ord.lt(base)) return ord.plus(over)
    const magnitude = Decimal.floor(Decimal.ln(ord).div(Decimal.ln(base)).plus(D(1e-14)))
    const magnitudeAmount = D(base).pow(magnitude)
    const amount = Decimal.floor(ord.div(magnitudeAmount))
    let finalOutput = "&omega;"
    if (magnitude.gt(1)) finalOutput += "<sup>"+displayInfiniteOrd(magnitude, 0, base)+"</sup>"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0)) finalOutput += "+" + displayInfiniteOrd(ord.sub(firstAmount), over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function numberFromOrdinal(string, base) {
    const ungwa = string.replaceAll("<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>", "&omega;")

    const initial = ungwa.replaceAll("&omega;", `${base}`).replaceAll('<sup>', ').pow(')
        .replaceAll('</sup>', ').mul(').replaceAll('...', '').replaceAll('+', ').add(')
    const secondary = "D(" + initial.replaceAll('+...', '').replaceAll('*...', '')
        //.replaceAll('.mul().add(', '')

    if(secondary.charAt(secondary.length-5) === '.'){
        const noTrailing = secondary.substring(0, secondary.length-5)

        if(noTrailing.charAt(noTrailing.length-6) === '.'){ // Rare Edge Case
            const noTrailing2 = noTrailing.substring(0, noTrailing.length-6)
            return eval(noTrailing2)
        }

        return eval(noTrailing)
    }

    if(secondary.charAt(secondary.length-6) === '.'){ // Rare Edge Case
        const noTrailing = secondary.substring(0, secondary.length-6)
        return eval(noTrailing)
    }
}

function displayHierarchyOrd(ord,over,base,trim = data.ord.trim) {
    if (ord === Infinity || D(ord).eq(Infinity) || base === 1) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    if(!base) return D(ord).toString()
    ord = Decimal.floor(ord)
    over = Decimal.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord.plus(over)
    const magnitude = Decimal.floor(Decimal.ln(ord).div(Decimal.ln(base)).plus(D(1e-14)))
    const magnitudeAmount = D(base).pow(magnitude)
    const amount = Decimal.floor(ord.div(magnitudeAmount))
    let finalOutput = "&omega;"
    if (magnitude.gt(1)) finalOutput += "<sup>"+displayHierarchyOrd(magnitude, 0, base)+"</sup>"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0)) finalOutput += "+" + displayHierarchyOrd(ord.sub(firstAmount), over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
                                            .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

/*function displayPsiOrd(ord, trim) {
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    ord = Math.floor(ord)
    const main = Math.floor(ord/4)
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    const finalOutput = ordMarks[magnitude]
        .replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
        .replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    return `${finalOutput}`
}
*/

const ordMarksX = [
    "&psi;(Ω<sub>2</sub>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup></sup>)",
];

const ordMarksXStart = [
    40, // Ω₂
    163, // Ω₂²
    532, // Ω₂^ω
    533, // Ω₂^Ω
    1643, // Ω₂^(Ω+1)
    4973, // Ω₂^(Ω+2)
    14963, // Ω₂^(Ω+ω)
    14964, // Ω₂^(Ω2)
    44937, // Ω₂^(Ω2+1)
    134856, // Ω₂^(Ω2+2)
    404613, // Ω₂^(Ω2+ω)
    404614, // Ω₂^(Ωω)
    404615, // Ω₂^(Ω²)
    1213892, // Ω₂^(Ω²+1)
    3641723, // Ω₂^(Ω²+2)
    10925216, // Ω₂^(Ω²+ω)
    10925217, // Ω₂^(Ω²+Ω)
    32775699, // Ω₂^(Ω²+Ω+1)
    98327145, // Ω₂^(Ω²+Ω+2)
    294981483, // Ω₂^(Ω²+Ω+ω)
    294981484, // Ω₂^(Ω²+Ω2)
    884944501, // Ω₂^(Ω²+Ω2+1)
    2654833552, // Ω₂^(Ω²+Ω2+2)
    7964500705, // Ω₂^(Ω²+Ω2+ω)
    7964500706, // Ω₂^(Ω²+Ωω)
    7964500707, // Ω₂^(Ω²2)
    23893502172, // Ω₂^(Ω²2+1)
    71680506567, // Ω₂^(Ω²2+2)
    215041519752, // Ω₂^(Ω²2+ω)
    215041519753, // Ω₂^(Ω²2+Ω)
    645124559311, // Ω₂^(Ω²2+Ω+1)
    1935373677985, // Ω₂^(Ω²2+Ω+2)
    5806121034007, // Ω₂^(Ω²2+Ω+ω)
    5806121034008, // Ω₂^(Ω²2+Ω2)
    17418363102077, // Ω₂^(Ω²2+Ω2+1)
    52255089306284, // Ω₂^(Ω²2+Ω2+2)
    156765267918905, // Ω₂^(Ω²2+Ω2+ω)
    156765267918906, // Ω₂^(Ω²2+Ωω)
    156765267918907, // Ω₂^(Ω²ω)
    156765267918908, // Ω₂^(Ω^ω)
    156765267918909, // Ω₂^(Ω^Ω)
];

const ordMarksXLength = [
    41, // Ω₂
    123, // Ω₂²
    369, // Ω₂^ω
    370, // Ω₂^Ω
    1110, // Ω₂^(Ω+1)
    3330, // Ω₂^(Ω+2)
    9990, // Ω₂^(Ω+ω)
    9991, // Ω₂^(Ω2)
    29973, // Ω₂^(Ω2+1)
    89919, // Ω₂^(Ω2+2)
    269757, // Ω₂^(Ω2+ω)
    269758, // Ω₂^(Ωω)
    269759, // Ω₂^(Ω²)
    809277, // Ω₂^(Ω²+1)
    2427831, // Ω₂^(Ω²+2)
    7283493, // Ω₂^(Ω²+ω)
    7283494, // Ω₂^(Ω²+Ω)
    21850482, // Ω₂^(Ω²+Ω+1)
    65551446, // Ω₂^(Ω²+Ω+2)
    196654338, // Ω₂^(Ω²+Ω+ω)
    196654339, // Ω₂^(Ω²+Ω2)
    589963017, // Ω₂^(Ω²+Ω2+1)
    1769889051, // Ω₂^(Ω²+Ω2+2)
    5309667153, // Ω₂^(Ω²+Ω2+ω)
    5309667154, // Ω₂^(Ω²+Ωω)
    5309667155, // Ω₂^(Ω²2)
    15929001465, // Ω₂^(Ω²2+1)
    47787004395, // Ω₂^(Ω²2+2)
    143361013185, // Ω₂^(Ω²2+ω)
    143361013186, // Ω₂^(Ω²2+Ω)
    430083039558, // Ω₂^(Ω²2+Ω+1)
    1290249118674, // Ω₂^(Ω²2+Ω+2)
    3870747356022, // Ω₂^(Ω²2+Ω+ω)
    3870747356023, // Ω₂^(Ω²2+Ω2)
    11612242068069, // Ω₂^(Ω²2+Ω2+1)
    34836726204207, // Ω₂^(Ω²2+Ω2+2)
    104510178612621, // Ω₂^(Ω²2+Ω2+ω)
    104510178612622, // Ω₂^(Ω²2+Ωω)
    104510178612623, // Ω₂^(Ω²ω)
    104510178612624, // Ω₂^(Ω^ω)
    104510178612625, // Ω₂^(Ω^Ω)
];

function infiniteOrdMarks(magnitude, layer = 0) {
    if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return ordMarksX[ordMarksX.length - 1];
    if (D(magnitude).floor().lt(ordMarks.length - 1) && !layer) return ordMarks[D(magnitude).floor().toNumber()];
    magnitude = D(magnitude).add(0.000000000001).floor()
    //console.log(magnitude + " " + layer)
    if (!layer) {
        let i = 0
        while (i < ordMarksX.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXStart[i + 1])) i++
        let finalOutput = ordMarksX[i].replaceAll("x", infiniteOrdMarks(magnitude.sub(ordMarksXStart[i]), layer+1))
        return `${finalOutput.replaceAll('undefined', '')}`
    } else {
        if (magnitude.lt(1)) return "x"
        if (magnitude.lt(41)) return ordMarks[Decimal.floor(magnitude.add(0.000000000001)).toNumber()-1].split('(')[1].split(')')[0]
        let i = 0
        while (i < ordMarksX.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXLength[i + 1])) i++
        let finalOutput = ordMarksX[i].replaceAll("&psi;", "&psi;<sub>1</sub>").replaceAll("x", infiniteOrdMarks(magnitude.sub(ordMarksXLength[i]), layer+1))
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    return "gwa"; // you've been gwa-ed
}

function displayPsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag) || base < 1) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    if (base === 1) return displayPsi1Ord(ord);
    if (base === 2) return displayPsi2Ord(ord, trim)
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfinitePsiOrd(ord, trim, base)
    ord = Math.floor(ord)
    if(ord == BHO_VALUE) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        if(data.gword) finalOutput=finalOutput
            .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
            .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    let maxOrdMarks = (3**(ordMarks.length-1))*4
    if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
        return displayPsiOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
    }
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

function displayInfinitePsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag) || base < 1) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    if (base === 1) return displayPsi1Ord(ord);
    if (base === 2) return displayInfinitePsi2Ord(ord, trim)
    ord = D(Decimal.floor(D(ord).add(0.000000000001)))
    if(ord.eq(BHO_VALUE)) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        if(data.gword) finalOutput=finalOutput
            .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        return `${finalOutput}`
    }
    let maxOrdMarks = (D(3).pow(ordMarksXStart[ordMarksXStart.length-1])).times(4) //(D(3).pow(ordMarks.length-1)).times(4)
    if(D(ord).gt(maxOrdMarks)) {
        return displayInfinitePsiOrd(maxOrdMarks) + "x" + format(ord.div(maxOrdMarks),2)
    }
    if(ord.eq(0)) return ""
    if(trim <= 0) return "..."
    if(ord.lt(4)) return extraOrdMarks[ord]
    const magnitude = Decimal.floor(Decimal.ln(ord.div(4)).div(Decimal.ln(3)))
    const magnitudeAmount = D(4).times(Decimal.pow(3, magnitude))
    let finalOutput = infiniteOrdMarks(Decimal.min(magnitude,ordMarksXStart[ordMarksXStart.length-1])) //ordMarks[Decimal.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayInfinitePsiOrd(ord.sub(magnitudeAmount), trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayInfinitePsiOrd(ord.sub(magnitudeAmount).plus(1), trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

function displayPsi2Ord(ord, trim = data.ord.trim) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag)) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfinitePsi2Ord(ord, trim)
    ord = Math.floor(ord)
    //if(ord === Infinity) return displayPsi2Ord(Number.MAX_VALUE, trim)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 2) return extraOrdMarks2[ord]
    let finalOutput = "";
    const magnitude = Math.floor(Math.log(ord/2)/Math.log(2))
    const magnitudeAmount = 2*2**magnitude
    finalOutput = ordMarks2[Math.min(magnitude,ordMarks2.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsi2Ord(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsi2Ord(ord-magnitudeAmount+1, trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("I","<img src='https://cdn.discordapp.com/emojis/865474047630114836.webp?size=24'>")
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

function displayInfinitePsi2Ord(ord, trim = data.ord.trim) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag)) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    ord = D(Decimal.floor(D(ord).add(0.000000000001)))
    //if(ord === Infinity) return displayInfinitePsi2Ord(Number.MAX_VALUE, trim)
    let maxOrdMarks2 = D(2).pow(ordMarks2.length)
    if(D(ord).eq(maxOrdMarks2)) {
      let finalOutput = ordMarks2[ordMarks2.length-1]
      if(data.gword) finalOutput=finalOutput
        .replaceAll("I","<img src='https://cdn.discordapp.com/emojis/865474047630114836.webp?size=24'>")
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
      return `${finalOutput.replaceAll('undefined', '')}`
    }
    if(D(ord).gt(maxOrdMarks2)) {
        return displayInfinitePsi2Ord(maxOrdMarks2) + "x" + format(ord.div(maxOrdMarks2),2)
    }
    if(ord.eq(0)) return ""
    if(trim <= 0) return "..."
    if(ord.lt(2)) return extraOrdMarks2[ord]
    const magnitude = Decimal.floor(Decimal.ln(ord.div(2)).div(Decimal.ln(2)))
    const magnitudeAmount = D(2).times(Decimal.pow(2, magnitude))
    let finalOutput = ordMarks2[Decimal.min(magnitude,ordMarks2.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayInfinitePsi2Ord(ord.sub(magnitudeAmount), trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayInfinitePsi2Ord(ord.sub(magnitudeAmount).plus(1), trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("I","<img src='https://cdn.discordapp.com/emojis/865474047630114836.webp?size=24'>")
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

/*function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    if (ord >= base**3) return Infinity
    let f2 = Math.floor(ord/base**2)
    const f1 = Math.floor((ord-(f2*base**2))/base)
    const f0 = Math.floor((ord-(f2*base**2)-(f1*base)))+over
    let value = base+f0
    value = D(value).times(Decimal.pow(2,f1))
    while(f2 > 0) {
        value = Decimal.pow(2, value).times(value)
        f2--
    }
    if(isNaN(value)) value = Infinity
    return value
}*/

// Calculates f_{func}(base)
function fgh(func, base)
{
  if (base == undefined)
  {
    base = 0;
  }
  base = new Decimal(base);

  if (func == 0)
  {
    return base.add(1);
  }
  else if (func == 1)
  {
    return base.mul(2);
  }
  else if (func == 2)
  {
    return base.mul(Decimal.pow(2, base));
  }
  else if (func == 3)
  {
    if (base.gt(Number.MAX_VALUE)) {
        return new Decimal(Infinity);
    }
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lte(Number.MAX_VALUE))
      {
        base = fgh(2, base);
        reps = reps.sub(1);
      }
      else
      {
        base = base.layeradd(reps.toNumber(), 2);
        reps = new Decimal(0);
      }
    }
    return base;
  }
  else
  {
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lte(Number.MAX_VALUE))
      {
        base = fgh(func - 1, base);
        reps = reps.sub(1);
      }
      else
      {
        base = new Decimal(Infinity);
        reps = new Decimal(0);
      }
    }
    return base;
  }
}

// Calculates f_ω(base)
function fghOmega(base)
{
  base = new Decimal(base);
  if (base.lte(1000))
  {
    return fgh(base, base);
  }
  else
  {
    return new Decimal(Infinity);
  }
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    if (!base) return ord;
    if (base < 0) return calculateHardy(ord, over, -base);
    ord = new Decimal(Math.floor(ord));

    if (ord.gte(base ** base + base * base))
    {
        return new Decimal(Infinity);
    }

    if (ord.gte(base ** base))
    {
        return fghOmega(calculateHardy(ord.sub(base ** base), over, base));
    }

    if (ord.lt(base))
    {
        return ord.add(base + over);
    }

    if (ord.gte(base ** 100) || ord.gte(1e100))
    {
        return new Decimal(Infinity);
    }

    highestPower = ord.log10().div(Decimal.log10(base)).floor();
    restOrd = ord.sub(Decimal.pow(base, highestPower));

    return fgh(highestPower, calculateHardy(restOrd, over, base));
}

function ordinalDisplay(type, ord=data.ord.ordinal, over=data.ord.over, base=data.ord.base, trim=data.ord.trim, d=true) {
    return (
        d ? `${type}<sub>${displayOrd(ord, Math.floor(over), base, trim)}</sub>`
        : `${type}<sub>${displayHierarchyOrd(ord, Math.floor(over), base, trim)}</sub>`
    )
}

function psiCheck() {
    if(!data.ord.isPsi && data.ord.ordinal.gte(PSI_VALUE) && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = D(4)
    }
    if(!data.ord.isPsi && data.ord.ordinal.gte(4) && data.ord.base === 2) {
        data.ord.isPsi = true
        data.ord.ordinal = D(2)
    }
    if(!data.ord.isPsi && data.ord.ordinal.gte(1) && data.ord.base === 1) {
        data.ord.isPsi = true
        data.ord.ordinal = D(1)
    }
}

function successor(n = 1, m=false) {
    if(data.chal.active[6] && data.successorClicks >= 1000 && m) return
    if(data.ord.isPsi) return
    if(m)++data.successorClicks
    if (data.ord.ordinal.mod(data.ord.base) >= data.ord.base - 1 && data.ord.ordinal.lt(Number.MAX_SAFE_INTEGER) && isFinite(D(data.ord.over).plus(n))) data.ord.over+=D(n).toNumber()
    else data.ord.ordinal = data.ord.ordinal.plus(n)
    psiCheck()
}

function maximize() {
    if(data.ord.isPsi) return
    if(data.ord.base <= 0) return
    if (data.ord.ordinal.mod(data.ord.base) >= data.ord.base - 1 && data.ord.over >= 1 && data.ord.base > 1) {
        while(data.ord.over + data.ord.base >= data.ord.base * 2 && data.ord.ordinal.mod(data.ord.base ** 2) !== 0){
            data.ord.over -= Math.ceil((data.ord.over + data.ord.base) / 2 - 0.1)
            data.ord.ordinal = data.ord.ordinal.plus(data.ord.base)
        }
        if (data.ord.ordinal.mod(data.ord.base ** 2) !== 0 && data.ord.over > 0) data.ord.ordinal = data.ord.ordinal.plus(data.ord.over)
        data.ord.over = 0
    }
    if (data.ord.over >= 1 && data.ord.base === 1) {
        data.ord.ordinal = D(1)
        data.ord.over = 0
    }
    psiCheck()
}

function changeTrim(x){
    if (isNaN(Math.floor(x))) return createAlert('Failure', 'Invalid Input.', `Oops.`)
    data.ord.trim = Math.floor(x)
    DOM(`changeOrdLength`).children[0].innerHTML = `[${data.ord.trim}]`
}

function getHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base, isPsi = data.ord.isPsi) {
    ord = Decimal.floor(ord);
    let hardyValue = "Infinity";
    if (isPsi) return psiHardy(ord, base);
    hardyValue = format(calculateHardy(ord, over, base));
    if (hardyValue === "Infinity") {
        hardyValue = EN_format(hardy(ord, base, over));
        if (hardyValue === "Infinity") hardyValue = bigHardy(ord, base, over);
    }
    return hardyValue;
}

function updateOrdHTML(){
    DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})=${getHardy(Decimal.floor(data.ord.ordinal), data.ord.over, data.ord.base, data.ord.isPsi)}`
}

const ordMarks1 = [
    "Ω",
    "Ω+1",
    "Ω1",
    "(ΩxXΩ)x10",
    "ΩA",
    "1Ω",
    "Ωπ",
    "田",
    "Ө",
    "↺1",
    "Ʊ",
    "⊞",
    "①",
    "𝖀",
    "Ꙍ",
    "⅊",
    "ⅇ",
    "⏦",
    "Λ",
    "☉",
    "⌺",
    "♈︎",
    "♉︎",
    "♊︎",
    "♋︎",
    "♌︎",
    "♍︎",
    "♎︎",
    "♏︎",
    "♐︎",
    "♑︎",
    "♒︎",
    "♓︎",
    "‡",
    "■",
    "⟐",
    "ˊΩ",
    "Ψ",
    "И",
    "֍",
    "𝔈",
    "ↇ",
    "ↆ",
    "⦻",
    "Ć",
    "Ɨ",
    "⨛",
    "⩬",
    "❶",
    "⍓",
    "ᘒ",
    "ↈ",
    "░",
    "𐰤",
    "𐰿",
    "𐰽",
    "𐱈",
    "⋻ 1 & 2 {Finite}",
    "*Ө* - 1",
    "1 / 2 of Ordinals of Finity Entarial",
    "1 [FINITY] [+]",
    "[៳]",
    "л0",
    "𝗖",
    "ດ",
    "1 & 2 [Finite]",
    "⬲",
    ":ວ:",
    "[△] - FINITY",
    "[Multifinity] - 1 // 2^1",
    "{已} - 1",
    "◻",
    "[・] - 1 • 2",
    "[⍏]",
    "[ヘ]",
    "キ1",
    "⬲1",
    "Os(2)",
    "1 丅 2 Ordinals of Clustered Finity",
    "〖习〗",
    "xX ロ xX",
    "X○○X",
    "ብxXဘ",
    "ཡ七ჲ",
    "ユ xX ユ",
    "ユユ xX ユユ",
    "Ֆ௫",
    "[个仗] xX",
    "ҢㅐxX",
    "⊂A",
    "ནᑂ",
    "[☆]",
    "Ω☆",
    "Ω☆☆",
    "Ω☆☆☆◻",
    "(E)",
    "るる",
    "১コ",
    "▵コ",
    "ᗜʊ",
    "ᗛᗚ",
    "ᗛᗌᗏᗚ",
    "⋑⎠⋏",
    "忚Ǿ忸忷",
    "悤悆恲恹Æ悙",
    "KꞤⱵ",
    "B℺Ẑ♮",
    "Xx℺",
    "xX / xXΩΩ",
    "🔷☆1",
    "1111",
    "🔂1🔁",
    "⦽yY",
    "ท◎",
    "|2|⦽",
    "⟲⤄1[2]",
    "⟲⧬/",
    "∭∫",
    "∰∱∢∮n xX / 1",
    "∰∱∢∮11n xX / 1",
    "∰∱∢∮11n xX112",
    "∨√◻1",
    "ꓨꓶ◻∑",
    "⊖⊖",
    "∬⊡⊠",
    "⎞⍳",
    "❃❃",
    "❃☼☾☽♒︎✦",
    "⟁⸎⟜◻︎",
    "⍰⍰NANA⍰ NA",
    "🄰‼xXxX",
    "ලⵙ☉ⵙ",
    "⊡",
    "☆☆☆␥✪",
    "⧟",
    "∫🞜▨▲",
    "◯◬◘◙",
    "◴◴◬◳◳╫◍",
    "◭◬GODS◮",
    "⟠",
    "⧈",
    "▥",
    "◓",
    "🟃",
    "Infinity-Insta-Bility",
    "Endlessinafinium",
    "OL(. x 100",
    "SOL(100)",
    "MOL(100)",
    "100-OL(100)",
    "Eta-Hyper 1 Cardinal",
    "THE END",
    "THE SUPER",
    "THE OMNI",
    "Meta-Hyper One Cardinal",
    "The Transcendence",
    "THE BIG RIP",
    "THE ULTIMATE REBIRTH",
    "Ultimate Loop #1, 1",
    "PEU*(1)",
    "TUB(1)",
    "The Super-Sam number",
    "५",
    "Sunimretility",
    "Q^Qal(10^100)",
    "山",
    "The Great Fish",
    "Super Sam's Number",
    "The Ultimate Cycle",
    "True Cycle",
    "Outerconst",
    "α^Finite(1,1)",
    "The Beyondility",
    "A0",
    "♁ 0",
    "Cetusfinity",
    "Homnoion Ordinal",
    "Dect Function",
    "DECERET NOW CARDINAL",
    "The ???? Ordinal",
    "Miserable Bypassing the EXAPT",
    "Bypassed of the Ordinals",
    "The True Cardinal",
    "The Trardinal",
    "The Transception",
    "One of the Largest Fictional Numbers",
    "Travone",
    "Mathfinity",
    "???",
    "Trahrase #1",
    "The Phrase Function",
    "The Black Holility",
    "Transcendfinium",
    "THE ONWARDS",
    "┃",
    "✰^◇(1)",
    "ス0[1]",
    "The True Layer",
    "The Finium",
    "The Breaking Googoloverse",
    "The Hyperconinc Finity",
    "Contains every Finite's",
    "Everytrahing",
    "Collection of Numbers beyond Tualllthing",
    "TRUE UNDEFINITIABLE",
    "Circliumize One of Numbers",
    "Transilimizized of Numbers",
    "Metamatramt of True number",
    "Pruelmentize Finite of Number",
    "Hexukament Numbers Finity",
    "Trauilnity Breaking Finite Number",
    "OL(Finality Everything Forever Number)",
    "THE MYSTERIOUS",
    "The Black Finale",
    "The No End",
    "The True ????",
    "The Breaking Nothing",
    "The True",
    "THE TRUE UNDEFINITABLE",
    "The True Lasting",
    "⧮",
    "The Great Final",
    "The Godous Final",
    "??????? [2]",
    "The F.I.N.A.L Stack",
    "Absolutely N.A.N",
    "THE U.N.L.I.M.I.T.E.D",
    "The U.L.T.I.M.A.T.E PHRASE",
    "THE E.N.D E.N.D",
    "ABSOLUTE D.E.A.T.H",
    "T.R.U.E E.N.D",
    "A.L.L T.R.U.E E.N.D",
    "T..H..E E..N..D",
    "Altered F.I.N.A.L",
    "Refinity",
    "✠",
    "Symbol Loops #1, ?",
    "Absolute Kilominx of Numbers",
    "THE GOODBYE",
    "End",
    "T-H-E E-N-D",
    "THE BREAKING END",
    "The Capacity Ending Limit",
    "The Paradox of Numbers",
    "Masterying Symbols… ↑",
    "Omnivssunians",
    "THE TRUE BEYOND GODS OF ALL TIME",
    "??????? [3]",
    "??????? [4]",
    "?????? [?????? [2]]",
    "?????? [?????? [4]]",
    "??????? [??]",
    "The Pre-Cycliops Stage",
    "??????? [!]",
    "Inderlayered Cycles",
    "God Rebirthed-All ENDING",
    "Hyperimianisfinity",
    "THE FINAL IMPACT",
    "Absolute-Killientifninain",
    "The Sacrifice of ENDS",
    "𝔵[1, 1]",
    "𝔵[1, 2]",
    "𝔵[1, 3]",
    "𝔵[#1]",
    "𝔵1",
    "₴",
    "𝖘",
    "⍬ [1] ⍋",
    "Even More Cardistinity Omnize Omni Power",
    "The End of Every Single Integer",
    "New cycle begins!",
    "Cyclion #1",
    "Breaking symbols I",
    "Word spams III",
    "𖣐 / ᛃ",
    "NG OF EVERYWHERES!",
    "⍒",
    "⑀ – ⍒[???]",
    "I̵n̵t̸e̶r̵n̶a̶l̸ ̶E̵n̸d̵i̷n̵g̴",
    "T̸ℌ̷E̸ ̵G̸ℛ̸E̸Å̸T̶ ̷ℂ̶O̵L̸⅂̴A̵P̴S̵ℑ̸ℕ̶G̷ ̶ℙ̴O̷I̵N̴T̶",
    "𝕭",
    "ẩ",
    "Ծ",
    "թ",
    "ջ",
    "ձ",
    "Ⱀ",
    "Ⱉ",
    "F.E.A.I.C.G.B",
    "S.O.G.F.E.C.H.U.F.E.A.I.C.G.B",
    "B̸͚͍̋͠r̵̼̒͗͜e̶͉͔͠͝ā̴͍k̷̨͓̀d̸̤͕͋ợ̶͝ẘ̷̡̢͂n̴̢̩̑̕f̷̼͆i̷̞̰̚n̶̠̯͐i̷͍̓̌t̵͍̽y̶͔͌",
    "𖥜",
    "??????? [??????? [??????? [2]]]",
    "!!!!!!! ?",
    "Za̶l̸g̸o̸ ̶l̷e̸v̴e̸l̸ ̸1̵ ̵(̷1̴)̵",
    "Beyond The Extending of Numbers",
    "The Singularity of the Final Number Limit",
    "THE LIMIT OF SYMBOLS",
    "THE LIMIT OF CYCLES",
    "END LIMITS OF NOWHERE",
    "THE TRUE END OF NOWHERE",
    "UNIDEFINEDFINITY",
    "FINITIUM LIMIT",
    "BEYOND FINITIUM LIMIT / THE FINITE EXPANSION [1/4]",
    "NEVER END[1/5]",
    "Softcapped Infinity",
    "THE TRUE GREAT END OF THE BEYOND [1 / 1 / 2]",
    "Hardcapped Infinity",
    "THE ETERNITY ENDING OF ALL ENDS, ALL FINITES AND ALL EXISTENCE",
    "Black Hole Number 1",
    "The Numbers that never End",
    "True Numbers Breaking Point",
    "Numbers can never reach…",
    "EVERYTHING.",
    "EVERYTHING will never reach…",
    "SPAM LAYERS OF .",
    "400 GIGABYTES OF STORAGE USED",
    "∞ Bytes of Storage Used",
    "??!@$&(@!*&$)(@!$&()!&$(@*!&)$@!#78!!!!’S OF TRUE BEYOND FINALES",
    "SPAM FINAL ENDING SYMBOLS",
    "THE RIP END",
    "The Rysterious",
    "Hyperialize",
    "The Real Final Point",
    "Roman Numeral Onefinity",
    "Roman Numeral Absolute Infinityfinity",
    "$$$$[1]",
    "****[1]",
    "Bypassing the Ends",
    "BTBTBTE",
    "BTABCDEFGHIJKLMNOPQRSTUVWXYZE",
    "Italicized!",
    "???[END!]",
    "???[?????]",
    "FINAL EVERYTHING GOODBYE TETRA ENDING",
    "ABSOLUTE LIMITLESS END MEGA",
    "ABSOLUTE LIMITLESS BOLD END",
    "Absolute Limitless Bold Limit",
    "A.L.B.Impossible",
    "A.L.B.A.L.B.E.E.L.I.Z.E",
    "True Undefined",
    "THE TRUE END OF FICTIONAL GOOGOLOGY"
]

function displayPsi1Ord(ord) {
    let OL = 0;
    while (ord.gte(boostReq(OL)) && OL < ordMarks1.length - 1) OL++;
    return ordMarks1[OL]
}
