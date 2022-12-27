from django.db import models
from authentication.models import User


class Task(models.Model):
    STATUS = (
        ('TD', 'To Do'),
        ('DG', 'Doing'),
        ('D', 'Done'),
    )
    title = models.CharField(max_length=120, verbose_name="Task title")
    description = models.CharField(max_length=512, verbose_name="Task description")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=2, choices=STATUS, default='TD')
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.title
    