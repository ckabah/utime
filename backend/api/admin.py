from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'start_date', 'end_date', 'status']

admin.site.register(Task, TaskAdmin)