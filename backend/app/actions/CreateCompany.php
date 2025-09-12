<?php

declare(strict_types=1);

namespace App\actions;

use App\Jobs\ProcessCompany;
use App\Models\Company;
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

    public function execute(array $attributes, UploadedFile $file): Company
    {

        //
        $path = $file->store('logos', 'public');

        $company = Company::query()->create(
            array_merge($attributes, [
                'logo' => $path,
            ])
        );

        ProcessCompany::dispatch($company)->afterCommit();

        return $company;
    }
}
