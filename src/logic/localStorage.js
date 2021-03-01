

let memoryScore = 0 

const bestScoreF = () => {
    if (!localStorage.memory) return memoryScore
    
    return localStorage.memory
} 

export { bestScoreF }