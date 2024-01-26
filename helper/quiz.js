

const checkSubmitedAnswer = async (getAnsFromDb, submitedAnswers) => {

    let score = 0
    submitedAnswers.map(singleObject => {
        const answerMarch = getAnsFromDb.find(singleObjAns => singleObject.questionNo === singleObjAns.questionNo && singleObject.answer === singleObjAns.answer)
        if (answerMarch) score += answerMarch?.points
    })
    return score
}


module.exports = { checkSubmitedAnswer }