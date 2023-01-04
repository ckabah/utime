from django.test import TestCase
from api.models import Task
from authentication.models import User
import random
from datetime import datetime, timedelta, timezone


class TestTaskModel(TestCase):
    def setUpTestData():
        start_date = datetime(2022, 12, 27, 13, 45, 00)

        for i in range(10):
            User.objects.create_user(
                username=f"username_{i+1}",
                email =f"username_{i+1}@gmail.com",
                password =f"nivdyueri#{i+1}",
                is_active = random.randint(0, 1)
                )

        for i in range(10):
            end_date = start_date + timedelta(hours=1, minutes=45)
            Task.objects.create(
                title=f"Task_title_{i+1}",
                description =f"Task_decription_{i+1}",
                start_date =start_date,
                end_date = end_date,
                user_id = random.randint(1, 4)
                )
            start_date = end_date
    
    def setUp(self) -> None:
        self.task = Task.objects.get(pk=1)
    
    def test_create_task(self):
        self.assertEqual(Task.objects.count(), 10)
    
    def test_title_field(self):
        verbose_name = self.task._meta.get_field('title').verbose_name
        max_length = self.task._meta.get_field('title').max_length
        self.assertEqual(verbose_name, 'Task title')
        self.assertEqual(max_length, 120)
    
    def test_description_field(self):
        verbose_name = self.task._meta.get_field('description').verbose_name
        max_length = self.task._meta.get_field('description').max_length
        self.assertEqual(verbose_name, 'Task description')
        self.assertEqual(max_length, 512)
    
    def test_date_field(self):
        start_verbose_name = self.task._meta.get_field('start_date').verbose_name
        end_verbose_name = self.task._meta.get_field('end_date').verbose_name
        self.assertEqual(start_verbose_name, 'start date')
        self.assertEqual(end_verbose_name, 'end date')
    
    def test_date(self):
        self.assertEqual(
            self.task.start_date,
            datetime(2022, 12, 27, 13, 45, 00, tzinfo=timezone.utc)
            )
    
    def test_default_status(self):
        status = self.task._meta.get_field('status').default
        self.assertEqual(status, 'TD')