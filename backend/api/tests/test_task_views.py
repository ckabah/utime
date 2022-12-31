import random
from datetime import datetime, timedelta, date
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse_lazy
from authentication.models import User
from api.models import Task


class TestTaskViews(TestCase):
    url = reverse_lazy('tasks')
    token_obtain_url = reverse_lazy('token_obtain_pair')
    today = date.today()
    today = datetime(today.year, today.month, today.day)
    tomorow = today + timedelta(days=1)
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
            end_date=start_date + timedelta(hours=1, minutes=45)
            Task.objects.create(
                title=f"Task_title_{i+1}",
                description=f"Task_decription_{i+1}",
                start_date=start_date,
                end_date=end_date,
                user_id=1
                )
            start_date=end_date

    def setUp(self) -> None:
        self.task: Task = Task.objects.get(pk=1)
        self.user: User = User.objects.get(pk=1)
        self.today_task: Task=Task.objects.create(
                title=f"Today_task_title",
                description=f"Today_task_decription",
                start_date=self.today,
                end_date=self.today + timedelta(hours=2),
                user_id=2
                )

        self.tomorow_task: Task = Task.objects.create(
                title=f"Tomorow_task_title",
                description=f"Tomorow_task_decription",
                start_date=self.tomorow,
                end_date=self.tomorow+ timedelta(hours=2),
                user_id=3
                )
        response= self.client.post(
            f'{self.token_obtain_url}',
            data = {'email':self.user.email, 'password':'nivdyueri#1'})
        self.token = response.json()['access']
        self.api_client = APIClient()
        self.api_client.credentials(HTTP_AUTHORIZATION = 'Bearer ' + self.token)
        
    def format_datetime(self, value:datetime):
        """
        Return a json datetime string format of a given datetime
        """
        return value.strftime('%Y-%m-%dT%H:%M:%SZ')
    
    def generate_acceptad_data(self, obj:Task):
        """
        Return a Task accepted data for ListSerializer
        """
        accepted_data = {
            'pk':obj.pk,
            'title':obj.title,
            'start_date':self.format_datetime(obj.start_date),
            'end_date':self.format_datetime(obj.end_date),
            'status':obj.status
        }
        return accepted_data
    
    def generate_retreive_acceptad_data(self, obj:Task):
        """
        Return a Task accepted data for DetailSerializer
        """
        accepted_data = {
            'pk':obj.pk,
            'title':obj.title,
            'description':obj.description,
            'start_date':self.format_datetime(obj.start_date),
            'end_date':self.format_datetime(obj.end_date),
            'user':obj.user.pk,
            'status':obj.status
        }
        return accepted_data

    def test_task_list_get_url(self):
        response = self.api_client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 12)
        data = response.json()[0]
        task = self.task
        accepted_data = self.generate_acceptad_data(task)
        self.assertEqual(data, accepted_data)

    def test_today_list_get_url(self):
        response = self.api_client.get(
            f'{self.url}?frequency=today', 
            header={'Authentication':f'Bearer {self.token}'}
            )
        self.assertEqual(response.status_code, 200)
        accepted_data = self.generate_acceptad_data(self.today_task)
        self.assertEqual(accepted_data, response.json()[0])
    
    def test_tomorow_list_get_url(self):
        response = self.api_client.get(f'{self.url}?frequency=tomorow')
        self.assertEqual(response.status_code, 200)
        accepted_data = self.generate_acceptad_data(self.tomorow_task)
        self.assertEqual(accepted_data, response.json()[0])

    def test_task_post_url(self):
        data={
            'title': 'django rest api',
            'description':'descrition for django rest api',
            "start_date": "2022-12-30T12:00:00Z",
            "end_date": "2022-12-30T13:45:00Z",
            'status':'TD',
            'user':self.user.pk,
            }
        self.assertEqual(Task.objects.count(), 12)
        response = self.api_client.post(
            self.url, 
            data=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 13)

    def test_task_detail_get(self):
        response = self.api_client.get(f'{self.url}1')
        self.assertEqual(response.status_code, 200)
        accepted_data = self.generate_retreive_acceptad_data(self.task)
        self.assertEqual(accepted_data, response.json())
    
    def test_task_detele(self):
        self.assertEqual(Task.objects.count(), 12)
        response = self.api_client.delete(f'{self.url}1')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Task.objects.count(), 11)
    
    def test_task_update(self):
        data = {
            "pk": 1,
            "title": "FastAPI",
            "description": "Get a good knowledge of FastAPI",
            "start_date": "2022-12-16T12:04:00Z",
            "end_date": "2022-12-16T12:05:00Z",
            "status": "TD",
            "user": 1
        }
        response = self.api_client.put(f'{self.url}1', data=data)
        self.assertEqual(response.status_code, 200)
        task = Task.objects.get(pk=1)
        self.assertEqual(task.title, 'FastAPI')