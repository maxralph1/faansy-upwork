<x-mail::message>
# Faansy Password Reset Token

You have requested to reset your password. Please click on the button to reset your password. 

<x-mail::button :url="'http://localhost:5173/reset-password/' . $email . '/' . $token " color="error">
Reset Password
</x-mail::button>

If you have not requested for a password reset, kindly ignore this notification.

Thanks,<br>
{{ config('app.name') }} Team
</x-mail::message>
