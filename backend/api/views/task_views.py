from datetime import datetime, date, timedelta
from rest_framework.generics import(
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
    )
from api.serializers.task_serializers import(
    TaskListSerializer,
    TaskDetailSerializer
)
from rest_framework.permissions import IsAuthenticated
from ..models import Task


class ListCreateTaskView(ListCreateAPIView):
    serializer_class = TaskListSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        today = date.today()
        today = datetime(today.year, today.month, today.day)
        tomorow = today + timedelta(days=1)
        try:
            frequency = self.request.GET.get('frequency')
        except:
            frequency = None
        
        if frequency == 'today':
            today_tasks = self.queryset.filter(
                start_date__year = today.year,
                start_date__month = today.month,
                start_date__day = today.day
            )
            return today_tasks
        if frequency == 'tomorow':
            tomorow_tasks = self.queryset.filter(
                start_date__year = tomorow.year,
                start_date__month = tomorow.month,
                start_date__day = tomorow.day
            )
            return tomorow_tasks
        return super().get_queryset()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskDetailSerializer
        return TaskListSerializer
    

class RetrieveUpdateDestroyTaskView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskDetailSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    lookup_field = 'pk'