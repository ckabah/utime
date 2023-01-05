from datetime import datetime, date, timedelta
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import(
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    
    
    )
from api.serializers.task_serializers import(
    TaskSerializer
)
from rest_framework.permissions import IsAuthenticated
from ..models import Task

@api_view(['GET'])
def home_view(request):
    data  = {
        'Message':'Well on Utime Api',
        'Enpoint list':{
            'api/':'This Home',
            'api/auth/users/':'Create Acoount',
            'api/token/':'Get authentication token',
            'api/token/refresh,':'Refresh Authentication token',
            'api/tasks/':'CRUD tasks - params: frequency : (api/tasks/?frequency=today or tomorow) - api/tasks/<int:pk> for retreive',
        }
        }
    return Response(data)

class ListCreateTaskView(ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = Task.objects.all().filter(user = self.request.user)
        today = date.today()
        today = datetime(today.year, today.month, today.day)
        tomorow = today + timedelta(days=1)
        try:
            frequency = self.request.GET.get('frequency')
        except:
            frequency = None
        
        if frequency == 'today':
            today_tasks = queryset.filter(
                start_date__year = today.year,
                start_date__month = today.month,
                start_date__day = today.day
            )
            return today_tasks
        if frequency == 'tomorow':
            tomorow_tasks = queryset.filter(
                start_date__year = tomorow.year,
                start_date__month = tomorow.month,
                start_date__day = tomorow.day
            )
            return tomorow_tasks
        return queryset
        
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

class RetrieveUpdateDestroyTaskView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    lookup_field = 'pk'