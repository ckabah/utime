from rest_framework import serializers
from api.models import Task

class TaskListSerializer(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()
    class Meta:
        model = Task
        fields = ['pk', 'title', 'start_date', 'end_date', 'status']

class TaskDetailSerializer(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()
    #user = serializers.ReadOnlyField()
    class Meta:
        model = Task
        fields = ['pk', 'title', 'description', 'start_date', 'end_date', 'status', 'user']