
import {AbstractControl, ValidatorFn} from '@angular/forms';

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        if (verifyOnlyLetters(control.value)) {
            return null;
        } else {
            return {nameNotContainsLetters: true};
        }
    }
}

function verifyOnlyLetters(value) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}