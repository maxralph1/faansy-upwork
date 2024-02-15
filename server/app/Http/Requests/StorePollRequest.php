<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePollRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'questionnaire' => 'required|string',
            'close_time' => 'required|date_format',
            'poll_option_1' => 'nullable|string',
            'poll_option_2' => 'nullable|string',
            'poll_option_3' => 'nullable|string',
            'poll_option_4' => 'nullable|string',
        ];
    }
}
