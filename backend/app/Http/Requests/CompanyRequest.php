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

    protected function prepareForValidation()
    {

        // Trim the data to catch for spacing
        $url = trim($this->website);
        $email = trim($this->email);

        if (preg_match('/^http:\/\//i', $url)) {
            $url = preg_replace('/^http:\/\//i', 'https://', $url);
        }

        $url = rtrim($url, '/');

        $this->merge([
            'website' => $url ? $url : null,
            'email' => $email ? $email : null,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'min:3', 'max:100', 'unique:companies,name'],
            'email' => ['nullable',  'email', 'unique:companies,email', 'unique:users,email', 'unique:employees,email'],
            'website' => ['nullable', 'url', 'unique:companies,website'],
            'logo' => ['nullable', 'file', 'mimes:jpg,webp,png,jpeg', 'max:512', Rule::dimensions()->minWidth(100)->minHeight(100)],
        ];

        if (in_array($this->method(), ['PATCH', 'PUT'])) {

            $company = $this->route('company');
            $rules['name'] = ['required', 'string', 'min:3', 'max:100', Rule::unique('companies', 'name')->ignore($company->id)];
            $rules['email'] = ['nullable', 'email', Rule::unique('companies', 'email')->ignore($company->id), 'unique:users,email', 'unique:employees,email'];
            $rules['website'] = ['nullable', 'url', Rule::unique('companies', 'website')->ignore($company->id)];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'logo.dimensions' => 'Logo should have min width and height of 100px',
            'logo.max' => 'Logo  size must be less than  :max kb ',
        ];
    }
}
