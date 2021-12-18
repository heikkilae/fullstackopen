const between = (value: number,  min: number, max: number): boolean  => {
    try {
        return value > min && value < max;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('unkown error')
        }
    }
}

const calculateBmi = (height: number, weight: number): string => {
    let bmi = weight / Math.pow((height / 100), 2)
    bmi = Math.round((bmi * 10) / 10)

    if (bmi < 16) {
        return 'Underweight (Severe thinness)'
    } else if (between(bmi, 16, 16.9)) {
        return('Underweight (Moderate thinness)')
    } else if (between(bmi, 17, 18.4)) {
        return('Underweight (Mild thinness)')
    } else if (between(bmi, 18.5, 24.9)) {
        return 'Normal (healty wieght)'
    } else if (between(bmi, 25, 29.9)) {
        return('Overweight (Pre-obese)')
    } else if (between(bmi, 30, 34.9)) {
        return('Obese (Class I)')
    } else if (between(bmi, 35, 39.9)) {
        return('Obese (Class II)')
    } else {
        return('Obese (Class III)')
    }
}

console.log(calculateBmi(180, 74))