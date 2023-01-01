from datetime import datetime, date, timedelta
from rest_framework.response import Response
from rest_framework import status
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

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskDetailSerializer
        return TaskListSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data
        # this for multipart data
        # setattr(data, '_mutable', True)
        data['user'] = self.request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RetrieveUpdateDestroyTaskView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskDetailSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    lookup_field = 'pk'