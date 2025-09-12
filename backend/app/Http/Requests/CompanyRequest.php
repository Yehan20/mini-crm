<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:30', 'unique:companies,name'],
            'email' => ['required', 'string', 'email', 'unique:companies,email'],
            'website' => ['required', 'string'],
            'logo' => ['required', 'file', 'mimes:jpg,webp,png,jpeg', Rule::dimensions()->width(100)->height(100)],
        ];

        if (in_array($this->method(), ['PATCH', 'PUT'])) {

            $company = $this->route('company');
            $rules['name'] = ['required', 'string', 'min:3', 'max:30', Rule::unique('companies', 'name')->ignore($company->id)];
            $rules['email'] = ['required', 'email', Rule::unique('companies', 'email')->ignore($company->id)];
            $rules['logo'] = ['nullable', 'file', 'mimes:jpg,webp,png,jpeg', Rule::dimensions()->width(100)->height(100)];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'logo.dimensions' => 'Logo should have width and height of 100px',
        ];
    }
}
