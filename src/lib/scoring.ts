export function calculateRoundPoints(scores:number[], pars:number[]){

  let total = 0

  scores.forEach((score, hole)=>{

    const par = pars[hole]

    if(!score || score === 0) return

    const diff = par - score

    if(score === 1){
      total += 20
    }
    else if(diff >= 2){
      total += 14
    }
    else if(diff === 1){
      total += 5
    }
    else if(diff === 0){
      total += 3
    }
    else if(diff === -1){
      total += 1
    }

  })

  return total

}