from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.ModelSerializer):
    pk = serializers.ReadOnlyField()
    class Meta:
        model = Task
        fields = ['pk', 'title', 'start_date', 'end_date', 'status', 'description']