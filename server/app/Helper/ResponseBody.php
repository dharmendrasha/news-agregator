<?php

namespace App\Helper;


class ResponseBody{

    public $isError;

    public $message;

    public $data;

    public function __construct(mixed $data, string $message, bool $isError = false){
        $this->data = $data;
        $this->message = $message;
        $this->isError = $isError;
    }
}
