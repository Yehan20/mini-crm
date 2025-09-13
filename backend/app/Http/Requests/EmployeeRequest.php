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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $rules = [
            //
            'first_name' => ['required', 'string',  'max:30'],
            'last_name' => ['required', 'string',  'max:30'],
            'company_id' => ['required', 'numeric', 'exists:companies,id'],
            'email' => ['required', 'string', 'email', 'unique:employees,email','unique:companies,email','unique:users,email'],
            'phone' => ['required', 'string', 'max:20'],
        ];

        if (in_array($this->method(), ['PATCH', 'PUT'])) {

            $employee = $this->route('employee');

            $rules['email'] = ['required', 'email', Rule::unique('employees', 'email')->ignore($employee->id),'unique:companies,email','unique:users,email'];

        }

        return $rules;
    }
}
