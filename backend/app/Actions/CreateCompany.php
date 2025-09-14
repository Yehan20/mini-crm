<?php

declare(strict_types=1);

namespace App\Actions;

use App\Jobs\SendCompanyCreatedMail;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

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

        return DB::transaction(function () use ($attributes, $path, $user) {
            $company = Company::query()->create(
                array_merge($attributes, [
                    'logo' => $path,
                ])
            );

            SendCompanyCreatedMail::dispatch($company, $user); // enabled after commit in comany

            return $company;
        });
    }
}
