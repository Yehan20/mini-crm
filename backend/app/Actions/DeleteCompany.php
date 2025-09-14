<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteCompany
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected UpdateCompany $updateCompany) {}

    public function execute(Company $company): void
    {
        // move to a deleted folder check if the file exists becuase by seeder there is urls too

        DB::transaction(function () use ($company) {

            if ($company->logo && Storage::disk('public')->exists($company->logo)) {

                $path = 'deleted/'.$company->logo;

                Storage::disk('public')->move($company->logo, $path);
                $this->updateCompany->execute($company, [
                    'logo' => $path,
                ], file: null);
            }

            $company->delete();
        });
    }
}
