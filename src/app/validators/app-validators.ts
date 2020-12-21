import { FormControl, ValidationErrors } from '@angular/forms';

export class AppValidators {

    //whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        // checks if the string contains only whitespace
        if ((control.value != null) && (control.value.trim().length == 0)) {
            return { 'notOnlyWhitespace': true }
        }else{
            //valid string
            return null;
        }

        
    }
}
