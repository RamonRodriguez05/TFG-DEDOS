from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from ..models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six
from django.core.exceptions import ValidationError
from django.forms import BaseFormSet



class UserForm(UserCreationForm):
    username = forms.CharField(min_length=6, max_length=30, required=True,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    email = forms.EmailField(max_length=60, required=True,
                             help_text=_("Se le enviará un correo de confirmación a esta dirección."))
    password1 = forms.CharField(min_length=8, max_length=16, required=True, help_text=_('Mínimo 6 caracteres.'))
    password2 = forms.CharField(min_length=8, max_length=16, required=True, help_text=_('Confirme su contraseña.'))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class StudentForm(UserCreationForm):
    username = forms.CharField(min_length=4,  max_length=30, required=True,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'), widget=forms.TextInput(attrs={'class':'form-control'}))
    #email = forms.EmailField(max_length=60, required=True,
    #                         help_text=_("Se le enviará un correo de confirmación a esta dirección."))
    password1 = forms.CharField(min_length=8, max_length=16, required=True, help_text=_('Mínimo 6 caracteres.'), widget=forms.PasswordInput(attrs={'class':'form-control'}))
    password2 = forms.CharField(min_length=8, max_length=16, required=True, help_text=_('Confirme su contraseña.'), widget=forms.PasswordInput(attrs={'class':'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')

class StudentValidationFormSet(BaseFormSet):
    def clean(self):
        if any(self.errors):
            return
        for form in self.forms:
            print("VALIDA")
            if form.cleaned_data.get('password1') == "":
                raise ValidationError("Password must not be empty")


class ProfileForm(forms.Form):
    company = forms.CharField(max_length=50, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    username = forms.CharField(min_length=6, max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    email = forms.EmailField(max_length=60, required=True,
                             help_text=_("Se le enviará un correo de confirmación a esta dirección."))
    first_name = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    last_name = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    city = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    country = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    about = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))

    class Meta:
        model = User
        fields = ('company','username', 'email', 'first_name', 'last_name', 'city', 'country', 'about')


class ProfileForm(forms.Form):
    email = forms.EmailField(max_length=60, required=True,
                             help_text=_("Se le enviará un correo de confirmación a esta dirección."))
    first_name = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    last_name = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    city = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    country = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))
    about = forms.CharField(max_length=30, required=False,
                               help_text=_('Máximo 30 caracteres. Letras, números y @/./+/-/_ permitidos.'))

    class Meta:
        model = User
        fields = ('company','username', 'email', 'first_name', 'last_name', 'city', 'country', 'about')


class ResetPasswordForm(UserCreationForm):
    password1 = forms.CharField(min_length=8, max_length=16, required=True, help_text=_('Mínimo 6 caracteres.'))
    password2 = forms.CharField(min_length=8, max_length=16, required=True, help_text=_('Confirme su contraseña.'))

    class Meta:
        model = User
        fields = ('password1', 'password2')


class AddGroupForm(forms.Form):
    group_name = forms.CharField(min_length=1, required=True, help_text=_('Name of the group'))
    description = forms.CharField(min_length=1, required=True, help_text=_('Description of the group'))
    students = forms.ChoiceField(widget=forms.RadioSelect)

    class Meta:
        model = User
        fields = ('group_name', 'description', 'students')




class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
                six.text_type(user.pk) + six.text_type(timestamp) +
                six.text_type(user.is_active)
        )


account_activation_token = TokenGenerator()