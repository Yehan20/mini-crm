<x-mail::message>
# Company Created Successfully!

We’re excited to let you know that your company has been created in our system.

---

**Company Name:**  
{{ $company->name }}

---


Thank you for choosing **{{ config('app.name') }}**.  
We’re glad to have you onboard!

Regards,  
The {{ config('app.name') }} Team
</x-mail::message>
