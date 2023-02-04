<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use App\Helper\ResponseBody;


trait ApiTrait{

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(new ResponseBody($validator->errors(), 'Failed to validate the body.', true), 422));
    }

}
