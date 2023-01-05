from django.urls import path
from api.views.task_views import(
    ListCreateTaskView, 
    RetrieveUpdateDestroyTaskView,
    home_view
    )

urlpatterns = [
    path('', home_view, name='home' ),
    path('tasks/', ListCreateTaskView.as_view(), name='tasks'),
    path('tasks/<int:pk>/', RetrieveUpdateDestroyTaskView.as_view(), name='task_retreive'),
]
