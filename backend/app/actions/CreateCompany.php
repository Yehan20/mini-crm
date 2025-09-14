<?php

declare(strict_types=1);

namespace App\Actions;

use App\Jobs\ProcessCompany;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class CreateCompany
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function execute(array $attributes, ?UploadedFile $file, User $user): Company
    {

        //
        $path = null;
        if ($file) {
            $path = $file->store('logos', 'public');
        }

        $company = Company::query()->create(
            array_merge($attributes, [
                'logo' => $path,
            ])
        );

        ProcessCompany::dispatch($company, $user);

        return $company;
    }
}
