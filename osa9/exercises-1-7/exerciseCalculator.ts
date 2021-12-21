interface Stats {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string,
    target: number;
    average: number;
}

interface Rating {
    grade: number;
    explaining: string;
}

const calculateExercises = (hours: Array<number>): Stats => {
    const rating = (average: number, target: number): Rating => {
        if (average > target) return { grade: 3, explaining: 'sick awesome!' };
        if (average < target) return { grade: 1, explaining: 'you can do better' };
        if (average === target) return { grade: 2, explaining: 'not too bad but could be better' };
        return { grade: 0, explaining: '' };
    }
    
    const target = 2
    const totalHours = hours.reduce((p, c) => p + c)
    const average = totalHours / hours.length
    const ratingObj = rating(Math.ceil(average), target)
    
    const ret = {
        periodLength: hours.length,
        trainingDays: 5,
        average: average,
        target: target,
        success: average >= target,
        rating: ratingObj.grade,
        ratingDescription: ratingObj.explaining
    }

    return ret
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))