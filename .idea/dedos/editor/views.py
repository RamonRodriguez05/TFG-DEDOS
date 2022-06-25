from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.template import loader
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib import messages
from django.conf import settings
from .forms.forms import UserForm, account_activation_token, ResetPasswordForm, ProfileForm, StudentForm, AddGroupForm
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from .models import User
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.decorators import login_required
import json


@login_required(login_url='/editor/login/')
def index(request):
    return render(request, 'editor/dash/index.html')


def user_profile(request):
    return render(request, 'editor/dash/profile.html', {"user": request.user})


def main(request):
    context = {
        "user": request.user
    }
    return render(request, 'editor/dash/index.html', context)


def view_login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.role == "admin" or user.role == "teacher":
                login(request, user)
                request.session["username"] = user.username
                return redirect('/editor/main')
            else:
                messages.error(request, 'Solo los profesores pueden acceder a este área',
                               extra_tags='alert alert-danger text-center')
                return render(request, 'editor/useraccess/login.html')
        else:
            messages.error(request, 'Usuario o contraseña incorrecta',
                           extra_tags='alert alert-danger text-center')
            return render(request, 'editor/useraccess/login.html')
    else:
        if not request.user.is_authenticated:
            template = loader.get_template('editor/useraccess/login.html')
            context = {
                "authenticate": False
            }
            return HttpResponse(template.render(context, request))
        else:
            return redirect('main')
            print("Logged in")


def view_logout(request, inactivity=""):
    if request.user.is_authenticated:
        print("GET LOGGED OUT")
        logout(request)
        if inactivity == "inactivity":
            messages.success(request,
                             'Desconectado por inactividad',
                             extra_tags='alert alert-info')
        else:
            messages.success(request,
                             'Desconectado correctamente',
                             extra_tags='alert alert-info text-center')
    return render(request, 'editor/useraccess/login.html')
    # Redirect to a success page.


def view_register(request):
    import json
    print("REGISTER")
    if request.method == "GET":
        if request.user.is_authenticated:
            return redirect("/editor/main")
        else:
            form = UserForm()
            return render(request, 'editor/useraccess/register.html', {'form': form})
    else:
        print("LECTURA DATOS")
        form = UserForm(request.POST)
        if form.is_valid():
            print("AQUI 1")
            user = form.save(commit=True)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            site_name = request.get_host()
            # falta activar user.is_active = True para que el usuario pueda utilizar la plataforma
            mail_subject = 'Activa tu cuenta de %(site)s!' % {'site': site_name},

            message = render_to_string('editor/useraccess/acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [to_email])
            msg = "Debes recibir un correo electrónico de verificación. Por favor, confirma tú cuenta de correo " \
                  "electrónico antes de completar el registro. "
            context = {
                "success": True,
                "message": msg,
                "authenticate": False,
            }
            print("SEND EMAIL")
            messages.success(request, 'A message to activate your account has been sent to your inbox.',
                             extra_tags='alert alert-info text-center')

            return render(request, 'editor/useraccess/login.html', context)
        else:
            msg = "Error en el formulario, por favor, intentelo de nuevo."
            errors = json.loads(form.errors.as_json()),
            print(errors)
            print("ERRORES")
            context = {
                "error": True,
                "message": msg,
                "form_errors": json.loads(form.errors.as_json()),
                "authenticate": False
            }
            return render(request, 'editor/useraccess/register.html', context)


def activate(request, uidb64, token):
    """ Vista que permite la activación de la cuenta de usuario """

    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        msg = "Gracias por la confirmación de tu cuenta de correo electrónico. Ahora ya puedes iniciar sesión !."
        context = {
            "success": True,
            "message": msg,
            "authenticate": False,
        }
        messages.success(request, 'Your acount has been activated. You can log in now.',
                         extra_tags='alert alert-info text-center')

        return render(request, 'editor/useraccess/login.html', context)
    else:
        msg = "El link de activación no es válido!"
        context = {
            "success": False,
            "message": msg,
            "authenticate": False,
        }
        return render(request, 'editor/useraccess/register.html', context)


def view_request_password(request):
    if request.method == "POST":
        email = request.POST['email']
        print("EMAIL:", email)
        user = User.objects.filter(email=email)
        if user.exists():
            user = user[0]
            print("FOUND USER")
            subject = "Password Reset Requested - DEDOS"
            email_template_name = 'editor/useraccess/acc_reset_password_email.html'
            c = {
                "email": user.email,
                'domain': '127.0.0.1:8000',
                'site_name': 'DEDOS',
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "user": user,
                'token': default_token_generator.make_token(user),
                'protocol': 'http',
            }
            email = render_to_string(email_template_name, c)
            send_mail(subject, email, settings.EMAIL_HOST_USER, [user.email])
            messages.success(request, 'A message with reset password instructions has been sent to your inbox.',
                             extra_tags='alert alert-info text-center')
            return render(request, 'editor/useraccess/login.html')
        else:
            print("NOT FOUND")
            return render(request, 'editor/useraccess/login.html')
        return render(request, 'editor/useraccess/login.html')
    else:
        return render(request, 'editor/useraccess/login.html')


def password_reset(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        print("CORRECT")
        context = {
            "uid": uidb64,
            "token": token
        }
        return render(request, 'editor/useraccess/reset.html', context)
    else:
        print("NOT CORRECT")
        msg = "El link de activación no es válido!"
        context = {
            "success": False,
            "message": msg,
            "authenticate": False,
        }
        return render(request, 'editor/useraccess/register.html', context)


def password_change(request, uidb64, token):
    import json
    form = ResetPasswordForm(request.POST)
    errors = json.loads(form.errors.as_json())
    print(errors)
    if form.is_valid():
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(form.cleaned_data["password1"])
            user.save()
            messages.success(request, 'Success! Password has been changed.',
                             extra_tags='alert alert-info text-center')
            return render(request, 'editor/useraccess/login.html')
        else:
            msg = "El link de activación no es válido!"
            context = {
                "success": False,
                "message": msg,
                "authenticate": False,
            }
            return render(request, 'editor/useraccess/register.html', context)
    else:
        context = {
            "uid": uidb64,
            "token": token,
            "form_errors": json.loads(form.errors.as_json())
        }
        return render(request, 'editor/useraccess/reset.html', context)


def update_profile(request):
    if request.method == "POST":
        form = ProfileForm(request.POST)
        print(request.user)
        print(form["username"])
        if form.is_valid():
            print("UPDATED PROFILE")
            user = User.objects.get(username=form["username"].value())
            print("OMPANY:", form["company"].value())
            user.company = form["company"].value()
            user.email = form["email"].value()
            user.first_name = form["first_name"].value()
            user.last_name = form["last_name"].value()
            user.city = form["city"].value()
            user.country = form["country"].value()
            user.about = form["about"].value()
            user.save()
            return render(request, 'editor/dash/profile.html', {"user": user})
        else:
            errors = json.loads(form.errors.as_json()),
            print(errors)
            print("ERRORES PROFILE")
            return render(request, 'editor/dash/profile.html', {"user": request.user})
    else:
        return render(request, 'editor/dash/profile.html', {"user": request.user})


def change_password(request):
    if request.method == "GET":
        return render(request, 'editor/dash/security.html')
    else:
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            print("VALID CHANGE")
            form.save()
            update_session_auth_hash(request, form.user)
            return render(request, 'editor/dash/security.html')
        else:
            print("INVALID CHANGE")
            errors = json.loads(form.errors.as_json()),
            print(errors)
            return render(request, 'editor/dash/security.html', {"form_errors": json.loads(form.errors.as_json())})


def add_group(request):
    if request.method == "GET":
        students = User.objects.filter(role='student', created_by=request.user.username)
        context = {'students': students}
        print(context)
        return render(request, 'editor/dash/add_group.html', context)
    else:
        form = AddGroupForm(data=request.POST)
        if form.is_valid():
            print("VALID CHANGE")
            form.save()
            update_session_auth_hash(request, form.user)
            return render(request, 'editor/dash/security.html')
        else:
            print("INVALID CHANGE")
            errors = json.loads(form.errors.as_json()),
            print(errors)
            return render(request, 'editor/dash/security.html', {"form_errors": json.loads(form.errors.as_json())})


def add_user(request):
    from django.forms import formset_factory
    from .forms.forms import StudentValidationFormSet
    student_formset = formset_factory(StudentForm, extra=1, formset=StudentValidationFormSet)
    if request.method == "GET":
        form = StudentForm()
        return render(request, 'editor/dash/add_user.html', {"formset": student_formset, "form": form})
    else:
        formset = student_formset(request.POST, form_kwargs={"empty_permitted": False})
        # form = StudentForm(data=request.POST)
        for form in formset:
            if form.is_valid():
                print("VALID USER")
                user = form.save(commit=True)
                user.is_active = True
                user.role = "student"
                user.created_by = request.user.username  # request.user
                user.save()
        return render(request, 'editor/dash/add_user.html', {"formset": formset, "form": form})


def editor(request):
    return render(request, 'editor/dash/editor.html')
