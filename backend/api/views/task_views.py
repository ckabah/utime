from datetime import datetime
from rest_framework.generics import(
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
    )
from api.serializers.task_serializers import(
    TaskListSerializer,
    TaskDetailSerializer
)
from ..models import Task


class ListCreateTaskView(ListCreateAPIView):
    serializer_class = TaskListSerializer
    queryset = Task.objects.all()
    def get_queryset(self):
        today = datetime.today()
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
                start_date__year = today.year,
                start_date__month = today.month,
                start_date__day = today.day +1
            )
            return tomorow_tasks
        return super().get_queryset()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskDetailSerializer
        return TaskListSerializer
    

class RetrieveUpdateDestroyTaskView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskDetailSerializer
    queryset = Task.objects.all()
    lookup_field = 'pk'