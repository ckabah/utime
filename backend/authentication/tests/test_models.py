from django.test import TestCase
from authentication.models import User
import random


class TestAuthenticationModel(TestCase):

    def setUpTestData():
        for i in range(10):
            User.objects.create(
                username=f"username_{i+1}",
                email =f"username_{i+1}@gmail.com",
                password =f"nivdyueri#{i+1}",
                )
        
        for i in range(5):
            User.objects.create_superuser(
                username=f"superusername_{i+1}",
                email =f"superusername_{i+1}@gmail.com",
                password =f"nivdyueri#{i+1}",
                )

    def setUp(self):
        self.super_user = User.objects.filter(
            username__contains="superusername_").first()
        self.user = User.objects.get(pk=1)

    def test_create_user(self):
        self.assertEqual(15, User.objects.count())
    
    def test_username_label(self):
        verbose_name = self.user._meta.get_field('username').verbose_name
        self.assertEqual('username', verbose_name)
    
    def test_username_max_length(self):
        length = self.user._meta.get_field('username').max_length
        self.assertEqual(100, length)

    def test_username(self):
        self.assertEqual(self.user.username, 'username_1')
    
    def test_email_label(self):
        verbose_name = self.user._meta.get_field('email').verbose_name
        self.assertEqual(verbose_name, 'email')

    def test_email_max_length(self):
        length = self.user._meta.get_field('email').max_length
        self.assertEqual(255, length)

    def test_email(self):
        print(self.super_user.is_active)
        self.assertEqual(self.user.email, 'username_1@gmail.com')
    
    def test_user_isactive(self):
        self.assertFalse(self.user.is_active)
        self.assertTrue(self.super_user.is_active)
    
    def user_user_isadmin(self):
        self.assertFalse(self.user.is_admin)
        self.assertTrue(self.super_user.is_admin)
