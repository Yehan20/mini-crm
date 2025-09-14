<x-mail::message>
#  Company Created Confirmation

A new company has been created:

---

<x-mail::panel>
**Company Name:**  
{{ $company->name }}

**Email:**  
{{ $company->email ?? 'N/A' }}

**Website:**  
{{ $company->website ?? 'N/A' }}
</x-mail::panel>

@if ($company->logo)
<x-mail::panel>
**Company Logo:**  
<img src="{{ asset('storage/' . $company->logo) }}" alt="{{ $company->name }} Logo"
     style="max-width:150px; max-height:150px; display:block; margin:auto;" />
</x-mail::panel>
@else
<x-mail::panel>
**Company Logo:**  
N/A
</x-mail::panel>
@endif

---

Thanks,  
{{ config('app.name') }}
</x-mail::message>
