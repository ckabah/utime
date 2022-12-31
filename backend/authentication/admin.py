from django.contrib import admin
from authentication.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['pk', 'username', 'email', 'is_active', 'is_admin', 'password']

@admin.register(User)
class CustomUserAdmin(UserAdmin):

    # Force django admin panel to hashe user password
    def save_model(self, request, obj, form, change):
        """
        Given a model instance save it to the database.
        """
        pw: str = obj.password
        # Django default hasher algo is pbkdf2, all hashed password start with pbkdf2_sha256
        # if password already hashed, we will won't to hashe again.
        # This is an rapid solition, it work just with pbkdf2.
        if not pw.startswith("pbkdf2_sha256"):
            obj.set_password(pw)
        print(obj.password)
        obj.save()