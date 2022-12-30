from django.urls import path
from api.views.task_views import(
    ListCreateTaskView, 
    RetrieveUpdateDestroyTaskView)


urlpatterns = [
    path('tasks/', ListCreateTaskView.as_view(), name='tasks'),
    path('tasks/<int:pk>', RetrieveUpdateDestroyTaskView.as_view(), name='task_retreive'),
]
