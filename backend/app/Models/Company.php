<?php

namespace App\Models;

use App\Observers\CompanyObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

#[ObservedBy([CompanyObserver::class])]
class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'website',
        'logo'
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    // Custom attributes
    protected function logo(): Attribute
    {

        return Attribute::make(

            get: function (string $value) {
                if (Str::contains($value,'placehold.co')) {
                    return  $value;
                }
                return config('app.url') . '/storage/' . $value;
            }

        );
    }
}
