<x-mail::message>
# Introduction

This is to inform you that your company has been created

{{ $company->name }}

<x-mail::button :url="''">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
