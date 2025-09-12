<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Company;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateCompany
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function execute(Company $company, array $attributes, ?UploadedFile $file): Company
    {

        if ($file) {
            // delete the existing file
            Storage::disk('public')->delete($company->logo);
            // store the new file
            $path = $file->store('logos', 'public');
            // add the path to the attributes array
            $attributes['logo'] = $path;
        }

        $company->update($attributes);

        return $company;
    }
}
