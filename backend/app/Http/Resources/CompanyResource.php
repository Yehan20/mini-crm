<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'employees' => new EmployeeResource($this->whenLoaded('employees')),
            'email' => $this->email,
            'employees_count' => $this->whenCounted('employees'),
            'website' => $this->website,
            'logo' => $this->formatLogo($this->logo),
            'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
            'updated_at' => Carbon::parse($this->updated_at)->toDateTimeString(),
        ];

    
    }

    protected function formatLogo(?string $value): ?string
    {
        if (!$value) {return null;}

        if (Str::contains($value, 'placehold.co')) {
            return $value;
        }

        return config('app.url') . '/storage/' . $value;
    }
}
