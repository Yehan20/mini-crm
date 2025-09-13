<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class WebsiteRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        if (! preg_match("/^((https?:\/\/)?([w]{3}[\.])?)?[a-zA-Z0-9\-_]{2,}[\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2,6})?$/", $value)) {
            $fail('Website format invalid.');
        }
    }
}
