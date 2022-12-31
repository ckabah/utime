from django.test import TestCase
from rest_framework.test import APIClient
from authentication.models import User
from django.urls import reverse_lazy


class TestUserViews(TestCase):
    url = 'http://localhost:8000/auth/users/'
    token_obtain_url = reverse_lazy('token_obtain_pair')
    def setUp(self) -> None:
        self.user: User = User.objects.create_user(
            email='coul@gmail', 
            username='coul', 
            password='coulpasswor/$52',
            )

        self.superuser: User = User.objects.create_superuser(
            email='supercoul@gmail', 
            username='supercoul', 
            password='coulpasswor/$52'
        )
        self.api_client = APIClient()
        user_response = self.client.post(
            self.token_obtain_url,
            data = {'email':'coul@gmail', 'password':'coulpasswor/$52'}
        )
        self.user_token = user_response.json()['access']
        superuser_response = self.client.post(
            self.token_obtain_url,
            data = {'email':'supercoul@gmail', 'password':'coulpasswor/$52'}
        )
        self.superuser_token  = superuser_response.json()['access']

    def test_list_with_user(self):
        self.api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.user_token)
        response = self.api_client.get(self.url)
        self.assertEqual(response.status_code, 403)
    
    def test_list_with_superuser(self):
        self.api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.superuser_token)
        response = self.api_client.get(self.url)
        self.assertEqual(response.status_code, 200)
