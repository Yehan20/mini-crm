<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {

        // resolving  extra spaces senario

        $email = trim((string) $this->email);
        $phone = preg_replace('/\s+/', ' ', trim((string) $this->phone));

        $this->merge([
            'email' => $email ? $email : null,
            'phone' => $phone ? $phone : null,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $phoneRegix = '/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/';
        $rules = [
            //
            'first_name' => ['required', 'string',  'max:30'],
            'last_name' => ['required', 'string',  'max:30'],
            'company_id' => ['required', 'numeric', 'exists:companies,id'],
            'email' => ['nullable', 'email', 'unique:employees,email', 'unique:companies,email', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'regex:'.$phoneRegix],
        ];

        if (in_array($this->method(), ['PATCH', 'PUT'])) {

            $employee = $this->route('employee');

            $rules['email'] = ['nullable', 'email', Rule::unique('employees', 'email')->ignore($employee->id), 'unique:companies,email', 'unique:users,email'];
        }

        return $rules;
    }
}
