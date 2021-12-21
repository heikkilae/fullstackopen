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

interface Exercises {
    target: number;
    hours: Array<number>;
}

const parseArguments = (args: Array<string>): Exercises => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let target;

    if (!isNaN(Number(args[2]))) {
        target = Number(args[2])
    } else {
        throw new Error('Target value is not number')
    }

    const hours = args.slice(3).map(h => {
        if (isNaN(Number(h))) {
            throw new Error('One of hour values is not number')
        }
        return Number(h)
    })

    return { target, hours }
}

const calculateExercises = (hours: Array<number>, target: number): Stats => {
    const rating = (average: number, target: number): Rating => {
        if (average > target) return { grade: 3, explaining: 'sick awesome!' };
        if (average < target) return { grade: 1, explaining: 'you can do better' };
        if (average === target) return { grade: 2, explaining: 'not too bad but could be better' };
        return { grade: 0, explaining: '' };
    }
    
    const totalHours = hours.reduce((p, c) => p + c)
    const average = totalHours / hours.length
    const ratingObj = rating(Math.ceil(average), target)
    const trainingDays = hours.length - hours.filter(h => h === 0).length
    
    const ret = {
        periodLength: hours.length,
        trainingDays: trainingDays,
        average: average,
        target: target,
        success: average >= target,
        rating: ratingObj.grade,
        ratingDescription: ratingObj.explaining
    }

    return ret
}

try {
    const { target, hours }= parseArguments(process.argv);
    console.log(calculateExercises(hours, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}