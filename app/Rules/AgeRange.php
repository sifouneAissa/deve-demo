<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AgeRange implements ValidationRule
{

    public function passes($attribute, $value)
    {
        return $this->calculateAge($value) >= 15 && $this->calculateAge($value) <= 75;
    }

    public function message()
    {
        return 'The :attribute must be between 15 and 75 years old.';
    }


    function calculateAge($birthdate) {

        $birthdate = new \DateTime($birthdate);

        $currentDate = new \DateTime();

        // Calculate the difference between dates
        $age = $currentDate->diff($birthdate);

        // Return the years from the difference
        return $age->y;
    }

    /**
     * @inheritDoc
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        if(!$this->passes($attribute,$value)){
            $fail($this->message());
        };
    }
}
